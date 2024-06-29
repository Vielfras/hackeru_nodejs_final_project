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

module.exports = {
  generateToken,
  verifToken,
};
