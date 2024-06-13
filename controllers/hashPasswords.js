const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'sinokholkhojaev',
  host: 'localhost',
  database: 'first',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

async function hashPasswords() {
  try {
    // Fetch all users from the database
    const getUsersQuery = 'SELECT username, password FROM Users';
    const { rows } = await pool.query(getUsersQuery);

    // Iterate through each user
    for (const user of rows) {
      const { username, password } = user;

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

      // Update the user's password in the database
      const updatePasswordQuery = 'UPDATE Users SET password = $1 WHERE username = $2';
      await pool.query(updatePasswordQuery, [hashedPassword, username]);
    }

    console.log('Passwords hashed and updated successfully.');
  } catch (error) {
    console.error('Error hashing passwords:', error);
  } finally {
    // Close the pool to release any resources
    await pool.end();
  }
}

// Call the function to hash passwords
hashPasswords();
