
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register User (Create User)

exports.register = async (req, res, next) => {
  try {
    const { fullName, email, mobileNumber, password, confirmPassword } = req.body;

    // Check if all required fields are provided
    if (!fullName || !email || !mobileNumber || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to the database
    const user = new User({
      username: fullName,  
      email,
      mobileNumber,
      password: hashedPassword,
      confirmPassword,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    next(error);
  }
};


  
  // Login User & Generate JWT Token
// Login User & Generate JWT Token
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = {
      id: user._id,
      username: user.username,

    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with token and user details
    res.status(200).json({
      message: 'User logged in successfully',
      token,
      user: {
        email: user.email,
        fullName: user.username, 
      },
    });
  } catch (error) {
    next(error);
  }
};
