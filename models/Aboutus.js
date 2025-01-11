// const mongoose = require("mongoose");

// // Room details schema for storing information about different room types
// const roomDetailsSchema = new mongoose.Schema({
//   type: { type: String, required: true }, // e.g., "Deluxe Room"
//   maxGuests: { type: Number, required: true }, // e.g., 2
//   size: { type: String, required: true }, // e.g., "150 sq ft"
//   price: { type: Number, required: true }, // e.g., 3800
//   gst: { type: Number, required: true }, // e.g., 18
//   description: { type: String, required: true } // Room description
// });

// // Team member schema to store details about the hotel staff
// const teamMemberSchema = new mongoose.Schema({
//   name: { type: String, required: true }, // Team member's name
//   role: { type: String, required: true }, // e.g., "Manager"
//   image: { type: String, required: true } // Image URL
// });

// // Client feedback schema to store reviews and ratings from guests
// const clientFeedbackSchema = new mongoose.Schema({
//   name: { type: String, required: true }, // Client's name
//   location: { type: String, required: true }, // e.g., "New York"
//   feedback: { type: String, required: true }, // Feedback text
//   rating: { type: Number, required: true, min: 1, max: 5 } // Rating out of 5
// });

// // Main about us schema which includes hotel details, room details, team members, and client feedback
// const aboutUsSchema = new mongoose.Schema({
//   bannerImage: { type: String, required: true }, // Banner image URL
//   hotelIntroduction: {
//     title: { type: String, required: true }, // Hotel title
//     description: { type: String, required: true }, // Hotel description
//     luxuryRooms: { type: Number, required: true }, // e.g., 17
//     customerRating: { type: Number, required: true, min: 0, max: 5 } // e.g., 4.9
//   },
//   roomDetails: { type: [roomDetailsSchema], required: true }, // Array of room details
//   teamMembers: { type: [teamMemberSchema], required: true }, // Array of team members
//   clientFeedback: { type: [clientFeedbackSchema], required: true } // Array of client feedback
// });

// // Export the AboutUs model based on the schema
// module.exports = mongoose.model("AboutUs", aboutUsSchema);
const mongoose = require('mongoose');

// Room details schema for storing information about different room types
const roomDetailsSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., "Deluxe Room"
  maxGuests: { type: Number, required: true }, // e.g., 2
  size: { type: String, required: true }, // e.g., "150 sq ft"
  price: { type: Number, required: true }, // e.g., 3800
  gst: { type: Number, required: true }, // e.g., 18
  description: { type: String, required: true } // Room description
});

// Team member schema to store details about the hotel staff
const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Team member's name
  role: { type: String, required: true }, // e.g., "Manager"
  image: { type: String, required: true } // Image URL
});

// Client feedback schema to store reviews and ratings from guests
const clientFeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Client's name
  location: { type: String, required: true }, // e.g., "New York"
  feedback: { type: String, required: true }, // Feedback text
  rating: { type: Number, required: true, min: 1, max: 5 } // Rating out of 5
});

// Main about us schema which includes hotel details, room details, team members, and client feedback
const aboutUsSchema = new mongoose.Schema({
  bannerImage: { type: String, required: true }, // Banner image URL
  hotelIntroduction: {
    title: { type: String, required: true }, // Hotel title
    description: { type: String, required: true }, // Hotel description
    luxuryRooms: { type: Number, required: true }, // e.g., 17
    customerRating: { type: Number, required: true, min: 0, max: 5 } // e.g., 4.9
  },
  roomDetails: { type: [roomDetailsSchema], required: true }, // Array of room details
  teamMembers: { type: [teamMemberSchema], required: true }, // Array of team members
  clientFeedback: { type: [clientFeedbackSchema], required: true } // Array of client feedback
});

// Export the AboutUs model based on the schema
module.exports = mongoose.model("AboutUs", aboutUsSchema);
