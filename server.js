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

// const emailRoutes = require("./routes/emailRoutes");
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.json());
connectDB();


//-------Start





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
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
