const { Category } = require('../models');

module.exports = {
// Create
async create(req, res) {
try {
const { name } = req.body;
if (!name) return res.status(400).json({ error: 'Category name is required' });
  const exists = await Category.findOne({ where: { name } });
  if (exists) return res.status(400).json({ error: 'Category already exists' });

  const category = await Category.create({ name });
  res.status(201).json(category);
} catch (err) {
  res.status(500).json({ error: err.message });
}
},

// List
async list(req, res) {
try {
const categories = await Category.findAll();
res.json(categories);
} catch (err) {
res.status(500).json({ error: err.message });
}
},

// Update
async update(req, res) {
try {
const { id } = req.params;
const category = await Category.findByPk(id);
if (!category) return res.status(404).json({ error: 'Category not found' });
  const { name } = req.body;
  category.name = name || category.name;
  await category.save();

  res.json({ message: 'Category updated successfully', category });
} catch (err) {
  res.status(500).json({ error: err.message });
}
},

// Delete
async delete(req, res) {
try {
const { id } = req.params;
const category = await Category.findByPk(id);
if (!category) return res.status(404).json({ error: 'Category not found' });
  await category.destroy();
  res.json({ message: 'Category deleted successfully' });
} catch (err) {
  res.status(500).json({ error: err.message });
}
}
};