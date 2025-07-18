const sequelize = require('../config/db');
const Asset = require('./asset')(sequelize);
const Category = require('./category')(sequelize);
const Location = require('./location')(sequelize);
const Vendor = require('./vendor')(sequelize);
const AssetImage = require('./assetImage')(sequelize);
const AssetFile = require('./assetFile')(sequelize);

// Define Relationships
Category.hasMany(Asset, { foreignKey: 'category_id' });
Asset.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Location.hasMany(Asset, { foreignKey: 'location_id' });
Asset.belongsTo(Location, { foreignKey: 'location_id', as: 'location' });

Vendor.hasMany(Asset, { foreignKey: 'vendor_id' });
Asset.belongsTo(Vendor, { foreignKey: 'vendor_id', as: 'vendor' });

Asset.hasMany(AssetImage, { foreignKey: 'asset_id', onDelete: 'CASCADE' });
Asset.hasMany(AssetFile, { foreignKey: 'asset_id', onDelete: 'CASCADE' });

Asset.hasMany(Asset, { foreignKey: 'linked_asset_id', as: 'children' });

module.exports = {
  sequelize,
  Asset,
  Category,
  Location,
  Vendor,
  AssetImage,
  AssetFile,
};

