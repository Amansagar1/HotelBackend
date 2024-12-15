
const express = require('express');
const { register, login,getAllUsers } = require('../controllers/authController');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
// Routes
router.post('/register', register); 
router.post('/login', login);       
router.get('/users', authenticate,getAllUsers);
module.exports = router;
