// authorisation.js

const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

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

module.exports = {
  generateToken,
  verifToken,
  isAdminOrCreator,
};
