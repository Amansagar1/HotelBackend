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
    required: function () {
      return !this.googleId; // Password is required only if googleId is not present
    },
  },
  confirmPassword: {
    type: String,
    required: function () {
      return !this.googleId; // Confirm Password is required only if googleId is not present
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows null values but ensures uniqueness for non-null values
  },
});

module.exports = mongoose.model('User', userSchema);
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: [true, 'Full Name is required'],
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//   },
//   mobileNumber: {
//     type: String,
//     required: [true, 'Mobile Number is required'],
//   },
//   password: {
//     type: String,
//     required: function() { return !this.googleId; }, // Password is required only if googleId is not present
//   },
//   confirmPassword: {
//     type: String,
//     required: function() { return !this.googleId; }, // Confirm Password is required only if googleId is not present
//   },
//   googleId: { type: String,
//      unique: true, 
//      sparse: true },
// });

// module.exports = mongoose.model('User', userSchema);