const mongoose = require('mongoose');

const amenitySchema = new mongoose.Schema({
  roomType: { type: String, required: true },
  size: { type: String, required: true },
  maxOccupancy: { type: Number, required: true },
  amenities: {
    "Room Features": [String],
    "Beds and Blanket": [String],
    "Safety and Security": [String],
    "Media and Entertainment": [String],
    "Bathroom": [String],
    "Other Facilities": [String]
  }
});

module.exports = mongoose.model('Amenity', amenitySchema);
