// const express = require('express');
// const router = express.Router();
// const aboutusController = require('../controllers/aboutus');

// router.post('/', aboutusController.createAboutus);
// router.get('/', aboutusController.getAboutus);
// router.put('/:id', aboutusController.updateAboutus);
// router.delete('/:id', aboutusController.deleteAboutus);

// module.exports = router;
const express = require('express');
const router = express.Router();
const aboutusController = require('../controllers/aboutus');

// Define routes
router.post('/', aboutusController.createAboutus);   // Create new About Us section
router.get('/', aboutusController.getAboutus);       // Get the About Us section
router.put('/', aboutusController.updateAboutus);    // Update the About Us section
router.delete('/', aboutusController.deleteAboutus); // Delete the About Us section

module.exports = router;
