const { Vendor } = require('../models');

module.exports = {
async create(req, res) {
try {
const { name } = req.body;
if (!name) return res.status(400).json({ error: 'Vendor name is required' });
  const exists = await Vendor.findOne({ where: { name } });
  if (exists) return res.status(400).json({ error: 'Vendor already exists' });

  const vendor = await Vendor.create({ name });
  res.status(201).json(vendor);
} catch (err) {
  res.status(500).json({ error: err.message });
}
},

async list(req, res) {
try {
const vendors = await Vendor.findAll();
res.json(vendors);
} catch (err) {
res.status(500).json({ error: err.message });
}
},

async update(req, res) {
try {
const { id } = req.params;
const vendor = await Vendor.findByPk(id);
if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
  const { name } = req.body;
  vendor.name = name || vendor.name;
  await vendor.save();

  res.json({ message: 'Vendor updated successfully', vendor });
} catch (err) {
  res.status(500).json({ error: err.message });
}
},

async delete(req, res) {
try {
const { id } = req.params;
const vendor = await Vendor.findByPk(id);
if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
  await vendor.destroy();
  res.json({ message: 'Vendor deleted successfully' });
} catch (err) {
  res.status(500).json({ error: err.message });
}
}
};