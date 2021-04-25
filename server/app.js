require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cookieParser = require('cookie-parser');

connectDB()
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/user', require('./routes/userRouter'));



app.listen(process.env.PORT || 5000)