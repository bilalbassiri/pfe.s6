require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/categoryRouter'));

app.listen(process.env.PORT || 5000)