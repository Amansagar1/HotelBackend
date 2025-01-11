const mongoose = require("mongoose");

const deluxeRoomSchema = new mongoose.Schema({
  name: { type: String, default: "Deluxe Room" },
  size: { type: String, default: "150 sq ft" },
  maxOccupancy: { type: Number, default: 2 },
  amenities: [String],
  price: { type: Number, required: true },
  available:[String],
   image: { type: String, required: true } ,
  roomnumber:{
    type: Number,
    required: true,
  },
  rating:{
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 5,
  },
  features: [String],
  bedsAndBlankets: [String],
  safetyAndSecurity: [String],
  mediaAndEntertainment: [String],
  bathroom: [String],
  otherFacilities: [String],
});

module.exports = mongoose.model("DeluxeRoom", deluxeRoomSchema);
