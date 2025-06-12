const {
  Asset,
  Category,
  Location,
  Vendor,
  AssetImage,
  AssetFile,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

module.exports = {
  //  Create Asset
  async create(req, res) {
    const t = await sequelize.transaction();
    const { body } = req;
    try {
      // console.log("BODY:", req.body);
      // console.log("FILES:", req.files);

      const asset = await Asset.create(
        {
          name: body.name,
          code: body.code,
          category_id: body.category_id,
          location_id: body.location_id,
          status: body.status,
          condition: body.condition,
          brand: body.brand,
          model: body.model,
          linked_asset_id: body.linked_asset_id || null,
          description: body.description,
          cwip_invoice_id: body.cwip_invoice_id,
          vendor_id: body.vendor_id,
          po_number: body.po_number,
          invoice_date: body.invoice_date,
          purchase_date: body.purchase_date,
          purchase_price: body.purchase_price,
          self_owned_partner: body.self_owned_partner,
          capitalization_price: body.capitalization_price,
          capitalization_date: body.capitalization_date,
          depreciation_pct: body.depreciation_pct,
          accumulated_depr: body.accumulated_depr,
          scrap_value: body.scrap_value || 0,
          income_tax_depr_pct: body.income_tax_depr_pct,
          end_of_life: body.end_of_life,
        },
        { transaction: t }
      );

      //  Save uploaded images
      await Promise.all(
        (req.files["images"] || []).map((i) =>
          AssetImage.create(
            {
              asset_id: asset.asset_id,
              filename: i.filename,
              filepath: i.path,
            },
            { transaction: t }
          )
        )
      );

      //  Save uploaded files
      await Promise.all(
        (req.files["files"] || []).map((f) =>
          AssetFile.create(
            {
              asset_id: asset.asset_id,
              filename: f.filename,
              filepath: f.path,
              category: body.fileCategory || "",
            },
            { transaction: t }
          )
        )
      );

      await t.commit();
      res
        .status(201)
        .json({
          message: "Asset Created Successfully",
          asset_id: asset.asset_id,
        });
    } catch (err) {
      await t.rollback();
      console.error("Create error:", err);
      res.status(400).json({ error: err.message });
    }
  },

  //  List Assets
  async list(req, res) {
    const where = {};
    if (req.query.category_id) where.category_id = req.query.category_id;
    if (req.query.status) where.status = req.query.status;

    try {
      const assets = await Asset.findAll({
        where,
        include: [
          { model: Category, as: "category" },
          { model: Location, as: "location" },
        ],
        attributes: ["asset_id", "name", "code", "status", "condition"],
      });
      res.json(assets);
    } catch (err) {
      console.error("List error:", err);
      res.status(500).json({ error: "Failed to fetch assets" });
    }
  },

  //  Update Asset
  async update(req, res) {
    const id = req.params.id;
    const t = await sequelize.transaction();
    try {
      const asset = await Asset.findByPk(id);
      if (!asset) throw new Error("Asset not found");

      Object.assign(asset, req.body);
      await asset.save({ transaction: t });

      await t.commit();
      res.json({ message: "Asset Updated Successfully" });
    } catch (err) {
      await t.rollback();
      console.error("Update error:", err);
      res.status(400).json({ error: err.message });
    }
  },

  //  Delete Asset
  async delete(req, res) {
    const id = req.params.id;
    try {
      const asset = await Asset.findByPk(id);
      if (!asset) return res.status(404).json({ error: "Asset not found" });

      await asset.destroy();
      res.json({ message: "Asset Deleted Successfully" });
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ error: "Failed to delete asset" });
    }
  },
};
