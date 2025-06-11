const router = require('express').Router();
const controller = require('../controllers/vendorController');

// Create a new vendor
router.post('/', controller.create);

// Get all vendors
router.get('/', controller.list);

// Update vendor by ID
router.put('/:id', controller.update);

// Delete vendor by ID
router.delete('/:id', controller.delete);

module.exports = router;