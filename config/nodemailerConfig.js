// config/nodemailerConfig.js
const nodemailer = require('nodemailer');

// Create a reusable transporter using Gmail service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,  // Admin email from environment variables
    pass: process.env.ADMIN_PASSWORD,  // Admin email password or App password
  },
  tls: {
    rejectUnauthorized: false,  // Necessary for some environments
  },
});

module.exports = transporter;
