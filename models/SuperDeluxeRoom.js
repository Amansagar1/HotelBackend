const mongoose = require("mongoose");

const superDeluxeRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Super Deluxe Room",
  },
  size: {
    type: String,
    required: true,
  },
  maxOccupancy: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  bedsAndBlankets: {
    type: [String],
    required: true,
  },
  safetyAndSecurity: {
    type: [String],
    required: true,
  },
  mediaAndEntertainment: {
    type: [String],
    required: true,
  },
  bathroom: {
    type: [String],
    required: true,
  },
  otherFacilities: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SuperDeluxeRoom", superDeluxeRoomSchema);