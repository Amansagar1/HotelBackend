
const express = require('express');
const { register, login, getAllUsers, googleCallback } = require('../controllers/authController');
const passport = require('passport');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
// Routes
router.post('/auth/register', register); 
router.post('/auth/login', login);       
router.get('/users', authenticate,getAllUsers);





module.exports = router;
// // Google OAuth Routes
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/auth/google/callback', passport.authenticate('google', { session: false }), googleCallback);