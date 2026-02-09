# Medicare Online Pharmacy 💊

A full-stack e-commerce pharmacy application that allows users to browse medicines, manage a shopping cart, and place orders. This project demonstrates a complete authentication flow, RESTful API development, and responsive frontend design.

## 🚀 Features

* **User Authentication:** Secure signup and login using JWT (JSON Web Tokens) and bcrypt for password hashing.
* **Product Catalog:** Browse pharmaceutical products with categorization.
* **Shopping Cart:** Add/remove items and calculate totals dynamically.
* **Order Management:** Place orders and view order history (Backend implementation).
* **Responsive Design:** Fully responsive UI built with CSS3 and Vanilla JavaScript.
* **Security:** Environment variable management for sensitive credentials.

## 🛠️ Tech Stack

### Backend
* **Node.js & Express.js:** Server-side framework and API handling.
* **MongoDB & Mongoose:** NoSQL database and object modeling.
* **JWT (JSON Web Tokens):** Secure stateless authentication.
* **bcryptjs:** Password encryption.
* **dotenv:** Environment variable management.

### Frontend
* **HTML5 & CSS3:** Semantic markup and custom styling.
* **Vanilla JavaScript (ES6+):** DOM manipulation and API integration (Fetch API).
* **Font Awesome:** Iconography.

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/medicare-pharmacy.git
cd medicare-pharmacy
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration (Crucial!) 🔒
This project uses environment variables to secure sensitive data (MongoDB URI, JWT Secret).

Create a new file named `.env` in the root directory.

Copy the contents of `.env.example` (or use the template below) into your new `.env` file.

Replace the placeholder values with your actual credentials.

Example `.env` file:
```env
PORT=3000
NODE_ENV=development
# Your MongoDB Connection String (from MongoDB Atlas)
MONGODB_URI=mongodb+srv://<your_username>:<your_password>@cluster0.mongodb.net/medicare_db
# Your secret key for signing JWTs (can be any long random string)
JWT_SECRET=your_super_secret_key_123
JWT_EXPIRE=30d
```

### 4. Run the Application
```bash
npm start
```

The server will start on http://localhost:3000.

## 📂 Project Structure
```
project/
├── backend/
│   ├── controllers/     # Route logic (Auth, Products, Orders)
│   ├── database/models/ # Mongoose schemas
│   ├── middleware/      # Authentication middleware
│   ├── routes/          # API routes
│   ├── scripts/         # Database scripts
│   └── server.js        # Entry point
├── frontend/
│   ├── pictures/        # Product images
│   ├── api.js           # API integration layer
│   ├── script.js        # Main frontend logic
│   ├── styles.css       # Stylesheets
│   ├── *.html           # HTML pages
│   └── order-summary.js # Order management
├── .env                 # Environment variables (Never commit this!)
├── .env.example         # Environment template
├── .gitignore           # Git ignore rules
└── package.json         # Project dependencies
```

## 👨‍💻 Author
**Arpan Das**