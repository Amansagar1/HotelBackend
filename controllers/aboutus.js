const Aboutus = require('../models/Aboutus');

// Create new About Us data
exports.createAboutus = async (req, res, next) => {
    try {
        const aboutus = new Aboutus(req.body);
        await aboutus.save();
        res.status(201).json({ message: 'About Us section created', aboutus });
    } catch (error) {
        next(error);
    }
};

// Read About Us data
exports.getAboutus = async (req, res, next) => {
    try {
        const aboutus = await Aboutus.find();
        res.status(200).json({ aboutus });
    } catch (error) {
        next(error);
    }
};

// Update About Us data
exports.updateAboutus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedAboutus = await Aboutus.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: 'About Us section updated', updatedAboutus });
    } catch (error) {
        next(error);
    }
};

// Delete About Us data
exports.deleteAboutus = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Aboutus.findByIdAndDelete(id);
        res.status(200).json({ message: 'About Us section deleted' });
    } catch (error) {
        next(error);
    }
};
