const router = require('express').Router();
const controller = require('../controllers/locationController');

// Create a new location
router.post('/', controller.create);

// Get all locations
router.get('/', controller.list);

// Update location by ID
router.put('/:id', controller.update);

// Delete location by ID
router.delete('/:id', controller.delete);

module.exports = router;