# Expense Tracker MERN Application

A full-stack Expense Tracker app built with **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
This app allows users to register, login, add income/expenses, and view their transaction history securely.

---

## Features

- User Authentication (Register / Login)
- JWT based authentication & authorization
- Add Income & Expense Transactions
- View list of transactions
- RESTful API (Backend)
- React Router Navigation (Frontend)
- MongoDB Database Integration

---

## Tech Stack

| Frontend | Backend  | Database | Others  |
| -------- | -------- | -------- | ------- |
| React.js | Node.js  | MongoDB Atlas | JWT Authentication |
| React Router DOM | Express.js | Mongoose | Axios |
| Axios | CORS | Dotenv | Nodemon |

---

⚙ Setup Instructions

1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```
2️⃣ Setup Server (Backend)
```bash
cd server
npm install
```
➔ Create a .env file inside server folder:
.env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

➔ Start Backend Server:
```bash
npm run dev
Server will run at: http://localhost:5000
```

3️⃣ Setup Client (Frontend)
```bash
cd client
npm install
```
➔ Create a .env file inside client folder:
.env

REACT_APP_API_URL=http://localhost:5000/api

➔ Start Frontend React App:
```bash
npm start
Frontend will run at: http://localhost:3000
```

 API Endpoints Summary
Authentication Routes
Method	Route	Description
POST	/api/auth/Register	Register new user
POST	/api/auth/Login	Login existing user

Transaction Routes (Protected)
Method	Route	Description
GET	/api/transactions	Get all transactions
POST	/api/transactions	Add a new transaction

Authorization required via Bearer Token (JWT).

 Testing
You can use Postman to test backend routes.

Once backend is fully running, test frontend on browser (http://localhost:3000).

