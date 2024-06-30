// authorisation.js

const jwt = require('jsonwebtoken');


const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const MAX_LOGIN_ATTEMPTS = 3;
const BLOCK_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isBusiness: user.isBusiness,
      isAdmin: user.isAdmin,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
};

const verifToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const isAdminOrCreator = (requestingUser, userId, res) => {
  if (requestingUser.id !== userId && !requestingUser.isAdmin) {
    return res.status(403).json({ success: false, message: "Access denied. You can only update your own data." });
  }
  return null;
};

const handleFailedLogin = async (user) => {
  console.log(user.loginAttempts);
  user.loginAttempts += 1;

  if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
    user.isBlocked = true;
    user.blockExpires = Date.now() + BLOCK_TIME;
  }
  await user.save();
};

const checkIfBlocked = (user) => {
  if (user.isBlocked) {
    const now = Date.now();
    if (now < user.blockExpires) {
      const remainingTime = (user.blockExpires - now) / (60 * 1000); // convert to minutes

      return { isBlocked: true, remainingTime };
    } else {
      user.isBlocked = false;
      user.loginAttempts = 0;
      user.blockExpires = null;
      user.save();
    }
  }

  return { isBlocked: false, remainingTime: 0 };
};

const resetUserBlock = async (user) => {
  if (true == user.isBlocked || user.loginAttempts != 0) {
    user.loginAttempts = 0;
    user.isBlocked = false;
    user.blockExpires = null;
    await user.save();
  }
};


module.exports = {
  generateToken,
  verifToken,
  isAdminOrCreator,
  handleFailedLogin,
  checkIfBlocked,
  resetUserBlock,
};
