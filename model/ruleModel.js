const pool = require("./db");

class Rule {
  static async getRules() {
    const query = "SELECT * FROM Rules;";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async createRule(ruleData) {
    const { pot_watering_schedule, max_humidity, rain_probability, valves_active, pot_id } = ruleData;
    const query = "INSERT INTO Rules (pot_watering_schedule, max_humidity, rain_probability, valves_active, pot_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const { rows } = await pool.query(query, [pot_watering_schedule, max_humidity, rain_probability, valves_active, pot_id]);
    return rows[0];
  }

  static async updateRule(id, ruleData) {
    const { pot_watering_schedule, max_humidity, rain_probability, valves_active, pot_id } = ruleData;
    const query = "UPDATE Rules SET pot_watering_schedule = $1, max_humidity = $2, rain_probability = $3, valves_active = $4, pot_id = $5 WHERE id = $6 RETURNING *";
    const { rows } = await pool.query(query, [pot_watering_schedule, max_humidity, rain_probability, valves_active, pot_id, id]);
    return rows[0];
  }

  static async deleteRule(id) {
    const query = "DELETE FROM Rules WHERE id = $1";
    await pool.query(query, [id]);
    return { message: "Rule has been deleted" };
  }
}

module.exports = Rule;