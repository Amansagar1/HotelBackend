// controllers/footerController.js
const Footer = require('../models/Footer');
const createError = require('http-errors');

// Create Footer
exports.createFooter = async (req, res, next) => {
  try {
    const footerData = req.body;
    const footer = new Footer(footerData);
    await footer.save();
    res.status(201).json({ success: true, footer });
  } catch (err) {
    next(err);
  }
};

// Get Footer
exports.getFooter = async (req, res, next) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) throw createError(404, 'Footer not found');
    res.status(200).json({ success: true, footer });
  } catch (err) {
    next(err);
  }
};

// Update Footer
exports.updateFooter = async (req, res, next) => {
  try {
    const footerData = req.body;
    const updatedFooter = await Footer.findOneAndUpdate({}, footerData, {
      new: true,
      upsert: true,
    });
    res.status(200).json({ success: true, footer: updatedFooter });
  } catch (err) {
    next(err);
  }
};

// Delete Footer
exports.deleteFooter = async (req, res, next) => {
  try {
    const result = await Footer.deleteOne();
    if (result.deletedCount === 0) throw createError(404, 'Footer not found');
    res.status(200).json({ success: true, message: 'Footer deleted successfully' });
  } catch (err) {
    next(err);
  }
};
