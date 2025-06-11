const router = require('express').Router();
const controller = require('../controllers/categoryController');

// Create a new category
router.post('/', controller.create);

// Get all categories
router.get('/', controller.list);

// Update category by ID
router.put('/:id', controller.update);

// Delete category by ID
router.delete('/:id', controller.delete);

module.exports = router;