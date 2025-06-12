# Asset Management System (AMS)

A complete backend solution for managing organizational assets. Built using Node.js and MySQL, it allows admin/staff to create, view, update, and delete assets. Features include media uploads, vendor/category/location management, and detailed asset tracking with financial and purchase metadata.

## Objective

To provide a backend system that allows Admin or Staff users to:

* Add new assets with comprehensive metadata.
* List all assets with optional filters.
* Update asset details, including file/media uploads.
* Delete assets cleanly from the system.

The system ensures accurate tracking, maintenance, and auditing of organizational assets.

## Tech Stack

* Backend: Node.js (Express.js)
* Database: MySQL
* ORM: Sequelize
* File Uploads: Multer
* Testing: Postman (Collection provided)
* Other Utilities: dotenv, cors, express-validator

## Project Structure

```
├── config/                # DB & environment configuration
├── controllers/           # Business logic for all modules
├── models/                # Sequelize models (Assets, Categories, Vendors, etc.)
├── routes/                # API route definitions
├── utils/                 # File upload (Multer) setup
├── migrations/seeders/   # (optional) Sequelize DB setup
├── postman/               # Postman collection for API testing
├── sql/                   # MySQL schema (asset_management_schema.sql)
├── .env                   # Environment variables
├── app.js                 # App initialization
├── package.json
└── README.md
```

## Setup Instructions

1. Clone the project
2. Run `npm install`
3. Create a `.env` file based on `.env.example`
4. Run the app with `npm start`

## ✅ Future Enhancements

* Authentication/Authorization (JWT-based Admin & Staff roles)
* Asset history tracking
* Frontend interface (React or Angular)
* Export asset reports as CSV/PDF
* Tagging and QR code support

