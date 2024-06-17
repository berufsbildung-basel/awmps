const pool = require("./db");

class Zone {
  static async getZone() {
    const query = "SELECT * FROM Zone;";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async createZone(zoneData) {
    const { pot_id, name, description, position } = zoneData;
    const query = "INSERT INTO Zone (pot_id, name, description, position) VALUES ($1, $2, $3, $4) RETURNING *";
    const { rows } = await pool.query(query, [pot_id, name, description, position]);
    return rows[0];
  }

  static async updateZone(id, zoneData) {
    const { pot_id, name, description, position } = zoneData;
    const query = "UPDATE Zone SET pot_id = $1, name = $2, description = $3, position = $4 WHERE id = $5 RETURNING *";
    const { rows } = await pool.query(query, [pot_id, name, description, position, id]);
    return rows[0];
  }

  static async deleteZone(id) {
    const query = "DELETE FROM Zone WHERE id = $1";
    await pool.query(query, [id]);
    return { message: "Zone has been deleted" };
  }
}

module.exports = Zone;
