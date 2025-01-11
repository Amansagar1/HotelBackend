const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true },
  size: { type: String, required: true },
  occupancy: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, type: String, required: true }, 
  beds: { type: Number, type: String, required: true }, 
  rating: { type: Number, min: 0, max: 5, required: true }, 
  image: { type: String, required: true },
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
