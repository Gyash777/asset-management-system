const { Asset, Category, Location, Vendor, AssetImage, AssetFile, sequelize } = require('../models');
const { Op } = require('sequelize');

// Validate no future dates
function isFuture(d) { return d ? new Date(d) > new Date() : false; }

module.exports = {
  // Create Asset
  async create(req, res) {
    const t = await sequelize.transaction();
    const { body } = req;
    try {
      // validate logi

      const asset = await Asset.create({ /* fields... */ }, { transaction: t });
      // media uploads
      await Promise.all(
        (req.files['images'] || []).map(i =>
          AssetImage.create({ asset_id: asset.asset_id, filename: i.filename, filepath: i.path }, { transaction: t })
        )
      );
      await Promise.all(
        (req.files['files'] || []).map(f =>
          AssetFile.create({ asset_id: asset.asset_id, filename: f.filename, filepath: f.path, category: body.fileCategory || '' }, { transaction: t })
        )
      );
      await t.commit();
      res.status(201).json({ message: 'Asset Created Successfully', asset_id: asset.asset_id });
    } catch (err) {
      await t.rollback();
      res.status(400).json({ error: err.message });
    }
  },

  // List Assets
  async list(req, res) {
    const where = {};
    if (req.query.category_id) where.category_id = req.query.category_id;
    if (req.query.status) where.status = req.query.status;
    const assets = await Asset.findAll({
      where,
      include: [{ model: Category }, { model: Location }],
      attributes: ['asset_id','name','code','status','condition'],
      raw: true
    });
    res.json(assets);
  },

  // Update Asset
  async update(req, res) {
    const id = req.params.id;
    const t = await sequelize.transaction();
    try {
      const asset = await Asset.findByPk(id);
      if (!asset) throw new Error('Asset not found');

      Object.assign(asset, req.body);
      await asset.save({ transaction: t });

      // media update logic

      await t.commit();
      res.json({ message: 'Asset Updated Successfully' });
    } catch (err) {
      await t.rollback();
      res.status(400).json({ error: err.message });
    }
  },

  // Delete Asset
  async delete(req, res) {
    const id = req.params.id;
    const asset = await Asset.findByPk(id);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    await asset.destroy();
    res.json({ message: 'Asset Deleted Successfully' });
  }
};
