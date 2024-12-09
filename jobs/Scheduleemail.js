const agenda = require('../jobs/emailJob'); // Import the email job

// Schedule an email after a booking is made (example)
const sendBookingConfirmationEmail = (user) => {
  agenda.schedule('in 1 minute', 'send email', {
    email: user.email,
    subject: 'Booking Confirmation',
    text: `Dear ${user.username}, your booking has been confirmed.`,
    html: `<p>Dear ${user.username}, your booking has been confirmed.</p>`,
  });
};
