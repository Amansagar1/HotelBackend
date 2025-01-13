const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
} = require("../controllers/bookingController");

const router = express.Router();

// Create a new booking
router.post("/bookings", createBooking);

// Get all bookings
router.get("/bookings", getAllBookings);

// Get booking by ID
router.get("/bookings/:id", getBookingById);

// Delete a booking
router.delete("/bookings/:id", deleteBooking);


module.exports = router;
