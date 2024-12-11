const Booking = require("../models/Booking");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const bookingData = req.body;

    // Validate required fields
    const requiredFields = [
      "firstName", "lastName", "address", "city", "pincode",
      "phone", "email", "checkIn", "checkOut", "checkInTime", "checkOutTime",
      "numberOfAdults", "roomId", "price", "title"
    ];

    const missingFields = requiredFields.filter((field) => !bookingData[field]);
    if (missingFields.length) {
      return res.status(400).json({ success: false, message: `Missing fields: ${missingFields.join(", ")}` });
    }

    // Save booking in the database
    const newBooking = new Booking(bookingData);
    await newBooking.save();

    res.status(201).json({ success: true, message: "Booking successful!", booking: newBooking });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ success: false, message: "An error occurred while processing the booking." });
  }
};

// Fetch all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ success: false, message: "An error occurred while fetching bookings." });
  }
};

// Fetch a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found." });
    }
    res.status(200).json({ success: true, booking });
  } catch (err) {
    console.error("Error fetching booking:", err);
    res.status(500).json({ success: false, message: "An error occurred while fetching the booking." });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found." });
    }
    res.status(200).json({ success: true, message: "Booking deleted successfully." });
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).json({ success: false, message: "An error occurred while deleting the booking." });
  }
};
