const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { 
    type: String, 
    required: true, 
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number with country code (optional).'] 
  },  
  email: { 
    type: String, 
    required: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.'] 
  },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  checkInTime: { 
    type: String, 
    required: true, 
    match: [/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, 'Please enter a valid time in HH:MM format.']
  },
  checkOutTime: { 
    type: String, 
    required: true, 
    match: [/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, 'Please enter a valid time in HH:MM format.']
  },
  roomPreference: { type: String },
  numberOfAdults: { type: Number, required: true },
  roomId: { type: String, required: true },
  price: { type: Number, required: true },
  title: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
  available: { 
    type: String, 
    required: true
   
    
  },
  payment: { 
    type: String, 
    required: true, 
    enum: ['paid', 'unpaid'], // Assuming you want payment status to be either paid or unpaid.
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
