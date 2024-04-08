const pool = require("./db");

class Plant {
  static async getPlants() {
    const query = "SELECT * FROM Plant;";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async createPlant(plantData) {
    const { pot_id, name, description, position } = plantData;
    const query = "INSERT INTO Plants (pot_id, name, description, position) VALUES ($1, $2, $3, $4) RETURNING *";
    const { rows } = await pool.query(query, [pot_id, name, description, position]);
    return rows[0];
  }

  static async updatePlant(id, plantData) {
    const { pot_id, name, description, position } = plantData;
    const query = "UPDATE Plants SET pot_id = $1, name = $2, description = $3, position = $4 WHERE id = $5 RETURNING *";
    const { rows } = await pool.query(query, [pot_id, name, description, position, id]);
    return rows[0];
  }

  static async deletePlant(id) {
    const query = "DELETE FROM Plants WHERE id = $1";
    await pool.query(query, [id]);
    return { message: "Plant has been deleted" };
  }
}

module.exports = Plant;
