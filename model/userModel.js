const pool = require("./db");

class User {
  static async getUsers() {
    const query = "SELECT * FROM Users;";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async createUser(userData) {
    const { username, email, password, first_name, last_name } = userData;
    const query = "INSERT INTO users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const { rows } = await pool.query(query, [username, email, password, first_name, last_name]);
    return rows[0];
  }

  static async updateUser(id, userData) {
    const { username, email, password, first_name, last_name } = userData
    const query = "UPDATE users Set username = $1, email = $2, password = $3, first_name = $4, last_name = $5 WHERE id = $6 RETURNIGN *"
    const { rows } = await pool.query(query, [username, email, passsword, first_name, last_name, id])
    return rows;
  }


  static async deleteUser(id) {
    const query = "DELETE FROM users WHERE id = $1";
    await pool.query(query, [id]);
    return { message: "User has been deleted" };
  }
}
module.exports = User;

