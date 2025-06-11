require('dotenv').config();
const express = require('express');
const path = require('path');
const { sequelize } = require('./models');

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/assets', require('./routes/assetRoutes'));
app.use('/categories', require('./routes/categoryRoutes'));
app.use('/locations', require('./routes/locationRoutes'));
app.use('/vendors', require('./routes/vendorRoutes'));

sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch((err) => console.error('DB connect error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
