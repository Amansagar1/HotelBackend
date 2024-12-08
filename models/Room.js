const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true }, // e.g., "Deluxe Room"
  size: { type: String, required: true }, // e.g., "150 sq ft"
  occupancy: { type: Number, required: true }, // Maximum number of guests
  amenities: { 
    roomFeatures: [String],
    bedsAndBlankets: [String],
    safetyAndSecurity: [String],
    mediaAndEntertainment: [String],
    bathroom: [String],
    otherFacilities: [String],
  },
});

module.exports = mongoose.model('Room', RoomSchema);
