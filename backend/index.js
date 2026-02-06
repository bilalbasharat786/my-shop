// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware (Ye frontend se data aane ki ijazat deta hai)
app.use(express.json());
app.use(cors());

// MongoDB Connection
// 'myshop' database ka naam hai, ye khud ban jayega
mongoose.connect('mongodb://127.0.0.1:27017/myshop') 
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Ek simple route check karne ke liye
app.get('/', (req, res) => {
  res.send('Backend Server bilkul theek chal raha hai!');
});

// Server Start karna
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});