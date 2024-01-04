require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const envVariables = process.env;
const { PORT, DB_URL } = envVariables;

beforeEach(async () => {
    const db = await mongoose.connect(DB_URL);
    db.on('error', (error) => console.error(error));
});


afterEach(async () => {
    await mongoose.connection.close();
});
