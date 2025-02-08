const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); 
const mongoose = require('mongoose');
const morgan = require('morgan');
const roomRoutes = require('./routes/roomRoutes');
const errorHandler = require('./middlewares/errorHandler');
const deluxeRoomRoutes = require("./routes/deluxeRoomRoutes");
const superDeluxeRoomRoutes = require("./routes/superDeluxeRoomRoutes");
const familyRoomRoutes = require("./routes/familyRoomRoutes");
const amenitiesRouter = require('./routes/amenityRoutes');
const authRoutes = require('./routes/authRoutes'); 
const bookingRoutes = require("./routes/bookingRoutes");
const authMiddleware = require('./middlewares/authMiddleware'); 
const allroomRoutes = require('./routes/allroomRoutes');
const footerRoutes = require('./routes/footerRoutes');
const hotelRoutes = require('./routes/amenitiesSectionRoutes');
const aboutusRoutes = require('./routes/aboutusRoutes');
const nodemailer = require('nodemailer');
// const emailRoutes = require("./routes/emailRoutes");
const https = require('https');
const fs = require('fs');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: 'https://hotelsudarshan.com', // Update this for production
}));
connectDB();


//-------Start



// Transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Email sending endpoint
app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Setup the mail options for the receiver
  const receiverMailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.RECEIVER_EMAIL,  // Receiver email (e.g., a support email)
    subject: subject || 'No Subject',
    text: message || 'No message provided.',
  };

  // Setup the mail options for the sender (confirming the email)
  const senderMailOptions = {
    from: process.env.EMAIL,  // Your email address
    to: email,  // The sender's email
    subject: `Copy of your message: ${subject || 'No Subject'}`,
    text: `Hello ${name},\n\nThank you for reaching out. Here's a copy of your message:\n\n${message}\n\nWe will get back to you shortly.\n\nBest regards,\nHotel Sudarshan team`,
  };

  // Send email to the receiver
  transporter.sendMail(receiverMailOptions, (receiverError, receiverInfo) => {
    if (receiverError) {
      console.error('Error sending email to receiver:', receiverError);
      return res.status(500).json({ message: 'Error sending email to receiver', receiverError });
    }

    // Send email to the sender (confirmation email)
    transporter.sendMail(senderMailOptions, (senderError, senderInfo) => {
      if (senderError) {
        console.error('Error sending email to sender:', senderError);
        return res.status(500).json({ message: 'Error sending email to sender', senderError });
      }

      console.log('Emails sent successfully:', receiverInfo.response, senderInfo.response);
      res.status(200).json({ message: 'Emails sent successfully', receiverInfo, senderInfo });
    });
  });
});
//

// // After booking creation
// sendBookingConfirmationEmail(user); // Send confirmation email immediately
// sendBookingReminder(user, bookingDate);
//---auth
// Example Protected Route
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You have accessed a protected route!' });
});

// Routes
app.use('/api/rooms', roomRoutes);
app.use("/api/deluxe-rooms", deluxeRoomRoutes);
app.use("/api/super-deluxe-rooms", superDeluxeRoomRoutes);
app.use("/api/family-rooms", familyRoomRoutes);
app.use('/api/amenities', amenitiesRouter);
app.use('/api/auth', authRoutes);
app.use("/api", bookingRoutes);
app.use('/api/allrooms', allroomRoutes);
app.use('/api/footer', footerRoutes);
app.use('/api', hotelRoutes);
app.use('/api/aboutus', aboutusRoutes);
// app.use("/api/email", emailRoutes);
// Error Handler
app.use(errorHandler);
//--------End


// Basic route to check server status
app.get('/', (req, res) => {
    res.send('Hotel Booking API is running...');
  });
// Start the server// HTTPS Server Setup
const options = {
  cert: fs.readFileSync('./certificates/fullchain.pem'),
  key: fs.readFileSync('./certificates/privkey.pem'),
};

// Create an HTTPS server
https.createServer(options, app).listen(5000, () => {
  console.log(`Server running on  ${PORT}`);
});

// Create an HTTPS server to handle requests
// https.createServer(options, app).listen(5000, () => {
//   console.log('Backend running on https://hotelsudarshan.com:5000');
// });

module.exports = app;