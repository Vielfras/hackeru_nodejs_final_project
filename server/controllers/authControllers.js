// authControllers.js

// 3rd Party
const bcrypt = require("bcryptjs");

// 1st Party
const schemas = require("../schemas/usersSchema");
const User = require("../models/User");
const Err = require("../utils/errorHandling");
const Auth = require("../utils/authorisation");


const ROLES = {
  ADMIN: 'admin',
  BUSINESS: 'business',
  USER: 'user'
};


const register = async (req, res) => {
  const { error, value } = schemas.createNewUser.validate(req.body);
  if (error) {
    return res.status(400).json(Err.multipleErrToString(error));
  }

  try {
    const existingUser = await User.find({ email: value.email });
    if (existingUser.length > 0) {
      return res.status(409).json({ success: false, message: `Email ${value.email} is already in use! Consider logging in.`, });
    }

    const newUser = new User(value);
    const hashedPassword = await bcrypt.hash(value.password, 10);
    newUser.password = hashedPassword;
    newUser.isAdmin = false;

    const saved = await newUser.save();

    const token = Auth.generateToken(saved);

    return res.status(201).json({ success: true, created: newUser, token: token });
  } catch (err) {
    return res.status(500).json({ success: false, message: `Error registering user: ${err.message}`, });
  }
};

const login = async (req, res) => {
  const { error, value } = schemas.login.validate(req.body);
  if (error) {
    return res.status(400).json(Err.multipleErrToString(error));
  }

  try {
    const user = await User.findOne({ email: value.email });
    if (!user) {
      return res.status(403).json({ success: false, message: "A user with this email doesn't exist." });
    }

    const { isBlocked, remainingTime } = Auth.checkIfBlocked(user, res);
    if (isBlocked) {
      return res.status(423).json({ success: false, message: `Account is temporarily locked due to too many failed login attempts. Please try again in ${Math.ceil(remainingTime)} minutes.` });
    }

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      await Auth.handleFailedLogin(user);
      return res.status(403).json({ success: false, message: "Invalid credentials." });
    }

    await Auth.resetUserBlock(user);

    const token = Auth.generateToken(user);

    return res.status(200).json({ success: true, token: token });
  } catch (err) {
    return res.status(500).json({ success: false, message: `Error logging in: ${err.message}` });
  }
};

const mustLogin = (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) {
    return res.status(403).json(Err.notLoggedIn());
  }

  try {
    const payload = Auth.verifToken(token);
    req.user = payload;

    return next();
  } catch (err) {
    return res.status(403).json(Err.notLoggedIn());
  }
}

const allowedRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!Array.isArray(allowedRoles)) {
      throw new Error('Error: allowedRoles must be an array.');
    }
    // check if allowedRoles has at-least one element
    if (allowedRoles.length === 0) {
      throw new Error('Error: allowedRoles must contain at-least one element.');
    }

    if (!req.user) {
      return res.status(403).json(Err.notLoggedIn());
    }

    const { isBusiness, isAdmin } = req.user;

    let hasRole = false;
    if (allowedRoles.includes(ROLES.BUSINESS) && isBusiness) {
      hasRole = true;
    }
    if (allowedRoles.includes(ROLES.ADMIN) && isAdmin) {
      hasRole = true;
    }

    if (!hasRole) {
      const allowedRolesString = allowedRoles.join('/')
      return res.status(401).json({ success: false, message: `Unauthorized: only ${allowedRolesString} users can access this resource` })
    }

    return next();
  }
}


module.exports = {
  register,
  login,
  mustLogin,
  allowedRoles,
  ROLES,
};
