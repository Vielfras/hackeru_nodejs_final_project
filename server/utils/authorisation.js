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

module.exports = {
  generateToken,
};
