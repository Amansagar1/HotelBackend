const mongoose = require('mongoose');

// Sub-schemas for nested sections
const roomTypeSchema = new mongoose.Schema({
  name: String,
  price: String,
  occupancy: String,
  size: String,
  description: String
});

const amenitySchema = new mongoose.Schema({
  name: String,
  description: String,
  icon: String
});

const diningOptionSchema = new mongoose.Schema({
  title: String,
  description: String,
  timing: String,
  location: String
});

// Main Schema
const hotelSchema = new mongoose.Schema({
  heroSection: {
    backgroundImage: String,
    title: String,
    breadcrumbs: [
      { label: String, url: String }
    ]
  },
  roomTypes: [roomTypeSchema],
  amenitiesSection: {
    title: String,
    amenities: [amenitySchema]
  },
  diningOptionsSection: {
    title: String,
    diningOptions: [diningOptionSchema]
  }
});

module.exports = mongoose.model('Hotel', hotelSchema);
