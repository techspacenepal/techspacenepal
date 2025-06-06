// index.js
import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './db/connection.js';

dotenv.config();

const app = express();


dbConnect();

app.get('/', (req, res) => {
  res.send('Hello Express + MongoDB!');
});


app.get('/api/test', (req, res) => {
  res.json({ message: 'API working!' });
});



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on ${port}`);
});
