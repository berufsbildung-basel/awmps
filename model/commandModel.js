const pool = require("./db");

class Command {
  static async getCommands() {
    const query = "SELECT * FROM Commands;";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async createCommand(commandData) {
    const { water_pot_schedule, duration_time_of_watering, pot_id } = commandData;
    const query = "INSERT INTO Commands (water_pot_schedule, duration_time_of_watering, pot_id) VALUES ($1, $2, $3) RETURNING *";
    const { rows } = await pool.query(query, [water_pot_schedule, duration_time_of_watering, pot_id]);
    return rows[0];
  }

  static async updateCommand(id, commandData) {
    const { water_pot_schedule, duration_time_of_watering, pot_id } = commandData;
    const query = "UPDATE Commands SET water_pot_schedule = $1, duration_time_of_watering = $2, pot_id = $3 WHERE id = $4 RETURNING *";
    const { rows } = await pool.query(query, [water_pot_schedule, duration_time_of_watering, pot_id, id]);
    return rows[0];
  }

  static async deleteCommand(id) {
    const query = "DELETE FROM Commands WHERE id = $1";
    await pool.query(query, [id]);
    return { message: "Command has been deleted" };
  }
}

module.exports = Command;
