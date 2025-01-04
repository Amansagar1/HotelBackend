// controllers/emailController.js
const transporter = require('../config/nodemailerConfig');

const sendBookingEmails = async (userEmail, bookingDetails) => {
  const { firstName, lastName, checkIn, checkOut, price, title } = bookingDetails;

  // Prepare the message for the user
  const userMessage = `
    <h1>Booking Confirmation</h1>
    <p>Dear ${firstName} ${lastName},</p>
    <p>Your booking for <strong>${title}</strong> has been confirmed.</p>
    <p><strong>Check-in:</strong> ${checkIn}</p>
    <p><strong>Check-out:</strong> ${checkOut}</p>
    <p><strong>Price:</strong> ₹${price}</p>
  `;

  // Prepare the message for the admin
  const adminMessage = `
    <h1>New Booking</h1>
    <p>A new booking has been made for <strong>${title}</strong> by ${firstName} ${lastName}.</p>
    <p><strong>Check-in:</strong> ${checkIn}</p>
    <p><strong>Check-out:</strong> ${checkOut}</p>
    <p><strong>Price:</strong> ₹${price}</p>
    <p><strong>User Email:</strong> ${userEmail}</p>
  `;

  try {
    // Send email to the user
    const userInfo = await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: userEmail,
      subject: 'Booking Confirmation',
      html: userMessage,
    });
    console.log('Email sent to user:', userInfo.messageId);

    // Send email to the admin
    const adminInfo = await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,  // Admin's email
      subject: 'New Booking',
      html: adminMessage,
    });
    console.log('Email sent to admin:', adminInfo.messageId);

  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
};

module.exports = {
  sendBookingEmails,
};
