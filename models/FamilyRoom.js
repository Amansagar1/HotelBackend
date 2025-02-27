const mongoose = require("mongoose");

const familyRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Family Room",
  },
  image: { type: String, required: true } ,
  price: { type: Number, required: true },
  description: { type: String },
  rating:{
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 5,
  },
  size: {
    type: String,
    required: true,
  },
  available:{
    type: [String],
    required: true,
  },
  roomnumber:{
    type: Number,
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

module.exports = mongoose.model("FamilyRoom", familyRoomSchema);
