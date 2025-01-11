// const Aboutus = require('../models/Aboutus');

// // Create new About Us data
// exports.createAboutus = async (req, res, next) => {
//     try {
//         const aboutus = new Aboutus(req.body);
//         await aboutus.save();
//         res.status(201).json({ message: 'About Us section created', aboutus });
//     } catch (error) {
//         next(error);
//     }
// };

// // Read About Us data
// exports.getAboutus = async (req, res, next) => {
//     try {
//         const aboutus = await Aboutus.find();
//         res.status(200).json({ aboutus });
//     } catch (error) {
//         next(error);
//     }
// };

// // Update About Us data
// exports.updateAboutus = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const updatedAboutus = await Aboutus.findByIdAndUpdate(id, req.body, { new: true });
//         res.status(200).json({ message: 'About Us section updated', updatedAboutus });
//     } catch (error) {
//         next(error);
//     }
// };

// // Delete About Us data
// exports.deleteAboutus = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         await Aboutus.findByIdAndDelete(id);
//         res.status(200).json({ message: 'About Us section deleted' });
//     } catch (error) {
//         next(error);
//     }
// };
const Aboutus = require('../models/Aboutus');

// Create new About Us data (MongoDB will automatically generate _id for the parent document)
exports.createAboutus = async (req, res, next) => {
    try {
        const aboutus = new Aboutus(req.body);  // MongoDB generates _id automatically
        await aboutus.save();
        res.status(201).json({ message: 'About Us section created', aboutus });
    } catch (error) {
        next(error);
    }
};

// Read About Us data (fetch the whole document by its generated _id)
exports.getAboutus = async (req, res, next) => {
    try {
        const aboutus = await Aboutus.findOne();  // Fetch the only document in the collection
        if (!aboutus) {
            return res.status(404).json({ message: 'About Us section not found' });
        }
        res.status(200).json({ aboutus });
    } catch (error) {
        next(error);
    }
};

// Update About Us data (update the entire document)
exports.updateAboutus = async (req, res, next) => {
    try {
        // Find the About Us document and update it with the new data
        const updatedAboutus = await Aboutus.findOneAndUpdate({}, req.body, { new: true }); // Empty {} targets the only document
        if (!updatedAboutus) {
            return res.status(404).json({ message: 'About Us section not found' });
        }
        res.status(200).json({ message: 'About Us section updated', updatedAboutus });
    } catch (error) {
        next(error);
    }
};

// Delete About Us data (delete the entire document)
exports.deleteAboutus = async (req, res, next) => {
    try {
        const deletedAboutus = await Aboutus.findOneAndDelete();  // Delete the only document in the collection
        if (!deletedAboutus) {
            return res.status(404).json({ message: 'About Us section not found' });
        }
        res.status(200).json({ message: 'About Us section deleted' });
    } catch (error) {
        next(error);
    }
};
