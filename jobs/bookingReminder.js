const Agenda = require('agenda');
const nodemailer = require('nodemailer');
const { agenda } = require('../config/agenda');

// Create a transporter for Nodemailer (same as above)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Define the booking reminder job
agenda.define('send booking reminder', async (job, done) => {
  const { email, username, bookingDate } = job.attrs.data;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Booking Reminder',
    text: `Dear ${username}, your booking is scheduled for ${bookingDate}. We look forward to your stay.`,
    html: `<p>Dear ${username}, your booking is scheduled for <strong>${bookingDate}</strong>. We look forward to your stay.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking reminder sent to:', email);
    done();
  } catch (error) {
    console.error('Error sending booking reminder:', error);
    done(error);
  }
});

// Export agenda for use in other parts of the application
module.exports = agenda;
