// const jwt = require('jsonwebtoken');

// exports.generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// exports.generateRefreshToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
// };
const jwt = require('jsonwebtoken');

// Generate access token (1 hour expiration)
exports.generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    role: user.role || 'user', // Adjust based on your model's data
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Generate refresh token (7 days expiration)
exports.generateRefreshToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
  };

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};
