const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  checkInTime: { type: String, required: true },
  checkOutTime: { type: String, required: true },
  roomPreference: { type: String },
  numberOfAdults: { type: Number, required: true },
  roomId: { type: String, required: true },
  price: { type: Number, required: true },
  title: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
  available : { type: String, required: true},
});

module.exports = mongoose.model("Booking", bookingSchema);
