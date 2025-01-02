const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
  hotelInfo: {
    name: { type: String, required: true },
    description: { type: String, required: true },
    socialLinks: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  supportInfo: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  quickLinks: [
    {
      name: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  paymentMethods: [
    {
      name: { type: String, required: true },
      logoUrl: { type: String, required: true },
    },
  ],
  copyright: {
    privacyPolicyUrl: { type: String, required: true, default: '/privacy-policy' },
    termsUrl: { type: String, required: true, default: '/terms-conditions' },
  },
}, { timestamps: true });  // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Footer', footerSchema);
