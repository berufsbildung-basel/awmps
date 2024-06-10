require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const bcrypt = require('bcrypt');
const client = new Client({
  user: 'sinokholkhojaev',
  host: 'localhost',
  database: 'first',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

client.connect(err => {
    if (err) throw err;
    console.log('connected to db');
});


app.get('/pot_types', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM pot_type');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

app.get('/sensors', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM sensors');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

app.get('/pots', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM pot');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
