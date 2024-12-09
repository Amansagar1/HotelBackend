const Agenda = require('agenda');
const nodemailer = require('nodemailer');
const { agenda } = require('../config/agenda'); // Make sure you have Agenda set up in your project

// Create a transporter for Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can replace it with your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

// Define the email sending job
agenda.define('send email', async (job, done) => {
  const { email, subject, text, html } = job.attrs.data;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: email, // List of recipients
    subject: subject, // Subject line
    text: text, // Plain text body
    html: html, // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent to:', email);
    done();
  } catch (error) {
    console.error('Error sending email:', error);
    done(error);
  }
});

// Export agenda for use in other parts of the application
module.exports = agenda;
