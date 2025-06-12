const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  return sequelize.define('Asset', {
    asset_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    code: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    location_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('In Use','In Stock','Out for Repair'), allowNull: false },
    condition: { type: DataTypes.ENUM('New','Good','Damaged','Poor'), allowNull: false },
    brand: { type: DataTypes.STRING(50) },
    model: { type: DataTypes.STRING(50) },
    linked_asset_id: { type: DataTypes.INTEGER },
    description: { type: DataTypes.TEXT },
    cwip_invoice_id: { type: DataTypes.STRING(50) },
    vendor_id: { type: DataTypes.INTEGER },
    po_number: { type: DataTypes.STRING(20) },
    invoice_date: { type: DataTypes.DATE },
    purchase_date: { type: DataTypes.DATE },
    purchase_price: { type: DataTypes.DECIMAL(15,2) },
    self_owned_partner: { type: DataTypes.ENUM('Self-Owned','Partner'), allowNull: false },
    capitalization_price: { type: DataTypes.DECIMAL(15,2) },
    capitalization_date: { type: DataTypes.DATE, allowNull: false },
    depreciation_pct: { type: DataTypes.DECIMAL(5,2) },
    accumulated_depr: { type: DataTypes.DECIMAL(15,2) },
    scrap_value: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 },
    income_tax_depr_pct: { type: DataTypes.DECIMAL(5,2) },
    end_of_life: { type: DataTypes.DATE }
  }, {
    tableName: 'Assets',
    timestamps: false,
    hooks: {
      beforeValidate: (asset) => {
        if (!asset.code) asset.code = `AST-${uuidv4().split('-')[0]}`;
      }
    }
  });
};
