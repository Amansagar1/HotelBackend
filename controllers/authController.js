// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');

// // Register User
// exports.register = async (req, res, next) => {
//   try {
//     const { fullName, email, mobileNumber, password, confirmPassword } = req.body;

//     // Validation
//     if (!fullName || !email || !mobileNumber || !password || !confirmPassword) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       username: fullName,
//       email,
//       mobileNumber,
//       password: hashedPassword,
//       confirmPassword,
//     });

//     await user.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     next(error);
//   }
// };

// // Login User
// exports.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const payload = {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({
//       message: 'User logged in successfully',
//       token,
//       user: {
//         email: user.email,
//         fullName: user.username,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Google OAuth Callback
// exports.googleCallback = async (req, res, next) => {
//   try {
//     const user = req.user;

//     const payload = {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({
//       message: 'User logged in successfully with Google',
//       token,
//       user: {
//         email: user.email,
//         fullName: user.username,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get All Users
// exports.getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.find();

//     if (!users || users.length === 0) {
//       return res.status(404).json({ message: 'No users found' });
//     }

//     res.status(200).json({
//       message: 'Users retrieved successfully',
//       users: users.map((user) => ({
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         mobileNumber: user.mobileNumber,
//       })),
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User
exports.register = async (req, res) => {
  try {
    const { username, email, mobileNumber, password, confirmPassword } = req.body;

    // Validation
    if (!username || !email || !mobileNumber || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      mobileNumber,
      password: hashedPassword,
      confirmPassword: hashedPassword, // Store hashed password in confirmPassword as well
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token and user details
    res.status(200).json({
      message: 'User logged in successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        mobileNumber: user.mobileNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Google OAuth Callback
// Google OAuth Callback
exports.googleCallback = async (req, res) => {
  try {
    const { googleId, email, username } = req.user; // Passport injects the user here after successful authentication

    // Check if the user already exists in the database
    let user = await User.findOne({ googleId });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = new User({
        googleId,
        email,
        username,
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the response with the JWT token and user details
    res.status(200).json({
      message: 'User logged in successfully with Google',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        mobileNumber: user.mobileNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
