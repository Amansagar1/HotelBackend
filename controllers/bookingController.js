// const Booking = require("../models/Booking");
// const moment = require('moment');

// const convertToDate = (dateString) => {
//   // Utility function to convert "DD/MM/YY" format to Date object
//   const [day, month, year] = dateString.split('/').map(Number);
//   const fullYear = 2000 + year; // Adjust to a 4-digit year (e.g., "24" to "2024")
//   return new Date(fullYear, month - 1, day); // JavaScript months are zero-based (0-11)
// };


// // Create a new booking
// exports.createBooking = async (req, res) => {
//   try {
//     const bookingData = req.body;

//     // Validate required fields
//     const requiredFields = [
//       "firstName", "lastName", "address", "city", "pincode",
//       "phone", "email", "checkIn", "checkOut", "checkInTime", "checkOutTime",
//       "numberOfAdults", "roomId", "price", "title"
//     ];

//     // Convert the date fields from "DD/MM/YY" to Date objects
//     const checkInDate = convertToDate(bookingData.checkIn);
//     const checkOutDate = convertToDate(bookingData.checkOut);

//     // Validate missing fields
//     const missingFields = requiredFields.filter((field) => !bookingData[field]);
//     if (missingFields.length) {
//       return res.status(400).json({
//         success: false,
//         message: `Missing fields: ${missingFields.join(", ")}`
//       });
//     }

//     // Check if date fields are valid
//     if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid date format for check-in or check-out."
//       });
//     }

//     // Set the converted dates into the booking data
//     bookingData.checkIn = checkInDate;
//     bookingData.checkOut = checkOutDate;

//     // Save the booking to the database
//     const newBooking = new Booking(bookingData);
//     await newBooking.save();

//     res.status(201).json({
//       success: true,
//       message: "Booking successful!",
//       booking: newBooking
//     });
//   } catch (err) {
//     console.error("Error creating booking:", err);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while processing the booking."
//     });
//   }
// };

// // Fetch all bookings
// exports.getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find();
//     res.status(200).json({ success: true, bookings });
//   } catch (err) {
//     console.error("Error fetching bookings:", err);
//     res.status(500).json({ success: false, message: "An error occurred while fetching bookings." });
//   }
// };

// // Fetch a single booking by ID
// exports.getBookingById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const booking = await Booking.findById(id);
//     if (!booking) {
//       return res.status(404).json({ success: false, message: "Booking not found." });
//     }
//     res.status(200).json({ success: true, booking });
//   } catch (err) {
//     console.error("Error fetching booking:", err);
//     res.status(500).json({ success: false, message: "An error occurred while fetching the booking." });
//   }
// };

// // Delete a booking
// exports.deleteBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const booking = await Booking.findByIdAndDelete(id);
//     if (!booking) {
//       return res.status(404).json({ success: false, message: "Booking not found." });
//     }
//     res.status(200).json({ success: true, message: "Booking deleted successfully." });
//   } catch (err) {
//     console.error("Error deleting booking:", err);
//     res.status(500).json({ success: false, message: "An error occurred while deleting the booking." });
//   }
// };
const Booking = require("../models/Booking");
const moment = require('moment');

// Utility function to convert "DD/MM/YY" format to Date object
const convertToDate = (dateString) => {
  const [day, month, year] = dateString.split('/').map(Number);
  const fullYear = 2000 + year; // Adjust to a 4-digit year (e.g., "24" to "2024")
  return new Date(fullYear, month - 1, day); // JavaScript months are zero-based (0-11)
};

// Function to format date to "DD/MM/YY"
const formatDate = (date) => {
  return moment(date).format('DD/MM/YY');
};

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

    // Convert the date fields from "DD/MM/YY" to Date objects
    const checkInDate = convertToDate(bookingData.checkIn);
    const checkOutDate = convertToDate(bookingData.checkOut);

    // Validate missing fields
    const missingFields = requiredFields.filter((field) => !bookingData[field]);
    if (missingFields.length) {
      return res.status(400).json({
        success: false,
        message: `Missing fields: ${missingFields.join(", ")}`
      });
    }

    // Check if date fields are valid
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format for check-in or check-out."
      });
    }

    // Set the converted dates into the booking data
    bookingData.checkIn = checkInDate;
    bookingData.checkOut = checkOutDate;

    // Save the booking to the database
    const newBooking = new Booking(bookingData);
    await newBooking.save();

    // Format the dates into "DD/MM/YY" before sending the response
    const formattedCheckIn = formatDate(newBooking.checkIn);
    const formattedCheckOut = formatDate(newBooking.checkOut);

    res.status(201).json({
      success: true,
      message: "Booking successful!",
      booking: {
        ...newBooking.toObject(), // Convert Mongoose document to plain JavaScript object
        checkIn: formattedCheckIn,
        checkOut: formattedCheckOut
      }
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the booking."
    });
  }
};

// Fetch all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    
    // Format the dates into "DD/MM/YY" for each booking
    const formattedBookings = bookings.map(booking => ({
      ...booking.toObject(),
      checkIn: formatDate(booking.checkIn),
      checkOut: formatDate(booking.checkOut)
    }));

    res.status(200).json({ success: true, bookings: formattedBookings });
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
    
    // Format the dates into "DD/MM/YY"
    const formattedBooking = {
      ...booking.toObject(),
      checkIn: formatDate(booking.checkIn),
      checkOut: formatDate(booking.checkOut)
    };

    res.status(200).json({ success: true, booking: formattedBooking });
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
