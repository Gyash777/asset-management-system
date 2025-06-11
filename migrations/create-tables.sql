CREATE TABLE IF NOT EXISTS Categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Vendors (
  vendor_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Locations (
  location_id INT AUTO_INCREMENT PRIMARY KEY,
  parent_id INT NULL,
  name VARCHAR(100) NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES Locations(location_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Assets (
  asset_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  code VARCHAR(20) NOT NULL UNIQUE,
  category_id INT NOT NULL,
  location_id INT NOT NULL,
  status ENUM('In Use','In Stock','Out for Repair') NOT NULL,
  `condition` ENUM('New','Good','Damaged','Poor') NOT NULL,
  brand VARCHAR(50),
  model VARCHAR(50),
  linked_asset_id INT NULL,
  description TEXT,
  cwip_invoice_id VARCHAR(50),
  vendor_id INT,
  po_number VARCHAR(20),
  invoice_date DATE,
  purchase_date DATE,
  purchase_price DECIMAL(15,2),
  self_owned_partner ENUM('Self-Owned','Partner') NOT NULL,
  capitalization_price DECIMAL(15,2),
  capitalization_date DATE NOT NULL,
  depreciation_pct DECIMAL(5,2),
  accumulated_depr DECIMAL(15,2),
  scrap_value DECIMAL(15,2) DEFAULT 0,
  income_tax_depr_pct DECIMAL(5,2),
  end_of_life DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES Categories(category_id),
  FOREIGN KEY (location_id) REFERENCES Locations(location_id),
  FOREIGN KEY (linked_asset_id) REFERENCES Assets(asset_id),
  FOREIGN KEY (vendor_id) REFERENCES Vendors(vendor_id)
);

CREATE TABLE IF NOT EXISTS AssetImages (
  image_id INT AUTO_INCREMENT PRIMARY KEY,
  asset_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filepath VARCHAR(500) NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (asset_id) REFERENCES Assets(asset_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS AssetFiles (
  file_id INT AUTO_INCREMENT PRIMARY KEY,
  asset_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filepath VARCHAR(500) NOT NULL,
  category VARCHAR(50),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (asset_id) REFERENCES Assets(asset_id) ON DELETE CASCADE
);
