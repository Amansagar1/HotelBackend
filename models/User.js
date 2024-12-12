
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: [true, 'Username is required'], // Ensure 'username' is required
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//   },
//   role: {
//     type: String,
//     default: 'user', // Example role
//   },
// });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Full Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile Number is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'Password is required'],
  },
  // role: {
  //   type: String,
  //   default: 'user', // Default role is 'user'
  // },
}, );

module.exports = mongoose.model('User', userSchema);
