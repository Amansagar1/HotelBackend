const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
} = require("../controllers/bookingController");

const router = express.Router();

const { sendBookingEmails } = require('../controllers/emailController');


// Create a new booking
router.post("/bookings", createBooking);

// Get all bookings
router.get("/bookings", getAllBookings);

// Get booking by ID
router.get("/bookings/:id", getBookingById);

// Delete a booking
router.delete("/bookings/:id", deleteBooking);

router.post('/send-booking-emails', async (req, res) => {
  const { userEmail, bookingDetails } = req.body;

  try {
    await sendBookingEmails(userEmail, bookingDetails);
    res.status(200).json({ message: 'Booking confirmation emails sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send booking emails', error: error.message });
  }
});

module.exports = router;
