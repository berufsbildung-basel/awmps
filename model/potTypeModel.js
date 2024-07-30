const pool = require("./db");

class PotType {
  static async getPotTypes() {
    const query = "SELECT * FROM pot_type;";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async createPotType(potTypeData) {
    const { name, capacity, sensor_type } = potTypeData;
    const query = "INSERT INTO pot_types (name, capacity, sensor_type) VALUES ($1, $2, $3) RETURNING *";
    const { rows } = await pool.query(query, [name, capacity, sensor_type]);
    return rows[0];
  }

  static async updatePotType(id, potTypeData) {
    const { name, capacity, sensor_type } = potTypeData;
    const query = "UPDATE pot_types SET name = $1, capacity = $2, sensor_type = $3 WHERE id = $4 RETURNING *";
    const { rows } = await pool.query(query, [name, capacity, sensor_type, id]);
    return rows[0];
  }

  static async deletePotType(id) {
    const query = "DELETE FROM pot_types WHERE id = $1";
    await pool.query(query, [id]);
    return { message: "Pot Type has been deleted" };
  }
}

module.exports = PotType;
