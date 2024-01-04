require('dotenv').config();
const express = require('express');
const { rateLimit } = require('express-rate-limit');
const app = express();
const mongoose = require('mongoose');
const envVariables = process.env;
const { PORT, DB_URL } = envVariables;

mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

// Rate limit, set to 300 requests per 5 minutes
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, 
	limit: 300,
	standardHeaders: true,
	legacyHeaders: false,
    message: "Too many requests, please try again later",
})

app.use(express.json())
app.use(limiter);

app.listen(
    3000,
    () => console.log(`Server: http://localhost:${PORT}`)
)

// ROUTER
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);

const searchRouter = require('./routes/search');
app.use('/api/search', searchRouter);