const pool = require("./db");

class Pot {
  static async getPots() {
    const query = "SELECT * FROM Pot;";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async createPot(potData) {
    const { name, pot_type_id } = potData;
    const query = "INSERT INTO pot (name, pot_type_id) VALUES ($1, $2) RETURNING *";
    const { rows } = await pool.query(query, [name, pot_type_id]);
    return rows[0];
  }

  static async updatePot(id, potData) {
    const { name, pot_type_id } = potData;
    const query = "UPDATE Pot SET name = $1, pot_type_id = $2 WHERE id = $3 RETURNING *";
    const { rows } = await pool.query(query, [name, pot_type_id, id]);
    return rows[0];
  }

  static async deletePot(id) {
    const query = "DELETE FROM Pot WHERE id = $1";
    await pool.query(query, [id]);
    return { message: "Pot has been deleted" };
  }
}

module.exports = Pot;
