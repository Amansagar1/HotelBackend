const express = require('express');
const passport = require('../config/passport'); // Import passport configuration
const { generateToken } = require('../utils/jwtUtils'); // Your JWT generation function
const router = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

// POST /login route
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = generateToken(req.user);
  res.json({
    message: 'Login successful',
    token: token,
  });
});

router.get('/profile', jwtAuthMiddleware, (req, res) => {
    res.json({
      message: 'Protected profile data',
      user: req.user,
    });
  });

module.exports = router;
