# Medicare Online Pharmacy 💊

A full-stack e-commerce pharmacy application that allows users to browse medicines, manage a shopping cart, and place orders. This project demonstrates a complete authentication flow, RESTful API development, and responsive frontend design.

## 🚀 Features

* **User Authentication:** Secure signup and login using JWT and bcrypt for password hashing.
* **Product Catalog:** Browse pharmaceutical products with categorization.
* **Shopping Cart:** Add/remove items and calculate totals dynamically.
* **Order Management:** Place orders and view order history .
* **Responsive Design:** Fully responsive UI built with CSS3 and Vanilla JavaScript.

## 🛠️ Tech Stack

### Backend
* **Node.js & Express.js**
* **MongoDB**
* **JWT (JSON Web Tokens)**
* **bcrypt.js** 

### Frontend
* **HTML & CSS** 
* **JS**

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
project
├── backend
│   ├── controllers    
│   ├── database/models
│   ├── middleware     
│   ├── routes          
│   ├── scripts        
│   └── server.js       
└── frontend
    ├── pictures        
    ├── api.js           
    ├── script.js        
    ├── styles.css       
    ├── html           
    └── order-summary.js 
