const { Pool } = require('pg');

const pool = new Pool({
  user: 'sinokholkhojaev',
  host: 'localhost',
  database: 'first',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

module.exports = pool;
