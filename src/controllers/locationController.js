const { Location } = require('../models');

module.exports = {
async create(req, res) {
try {
const { name, parent_id } = req.body;
if (!name) return res.status(400).json({ error: 'Location name is required' });
  const location = await Location.create({ name, parent_id });
  res.status(201).json(location);
} catch (err) {
  res.status(500).json({ error: err.message });
}
},

async list(req, res) {
try {
const locations = await Location.findAll();
res.json(locations);
} catch (err) {
res.status(500).json({ error: err.message });
}
},

async update(req, res) {
try {
const { id } = req.params;
const location = await Location.findByPk(id);
if (!location) return res.status(404).json({ error: 'Location not found' });
  const { name, parent_id } = req.body;
  location.name = name || location.name;
  location.parent_id = parent_id ?? location.parent_id;

  await location.save();
  res.json({ message: 'Location updated successfully', location });
} catch (err) {
  res.status(500).json({ error: err.message });
}
},

async delete(req, res) {
try {
const { id } = req.params;
const location = await Location.findByPk(id);
if (!location) return res.status(404).json({ error: 'Location not found' });
  await location.destroy();
  res.json({ message: 'Location deleted successfully' });
} catch (err) {
  res.status(500).json({ error: err.message });
}
}
};