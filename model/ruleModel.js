const pool = require("./db");

class Rule {
  static async getRules() {
    const query = "SELECT * FROM Rules;";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async createRule(ruleData) {
    const { duration, action, schedule, enabled, rain_probability_min, rain_porobability_max, humidity_min, humidity_max, lux_min, lux_max, Pot_id, Zone_id } = ruleData;
    const query = "INSERT INTO Rules (duration, action, schedule, enabled, rain_probability_min, rain_porobability_max, humidity_min, humidity_max, lux_min, lux_max, Pot_id, Zone_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *";
    const { rows } = await pool.query(query, [duration, action, schedule, enabled, rain_probability_min, rain_porobability_max, humidity_min, humidity_max, lux_min, lux_max, Pot_id, Zone_id]);
    return rows[0];
  }

  static async updateRule(id, ruleData) {
    const { duration, action, schedule, enabled, rain_probability_min, rain_porobability_max, humidity_min, humidity_max, lux_min, lux_max, Pot_id, Zone_id } = ruleData;
    const query = "UPDATE Rules SET duration = $1, action = $2, schedule = $3, enabled = $4, rain_probability_min = $5, rain_porobability_max = $6, humidity_min = $7, humidity_max = $8, lux_min = $9, lux_max = $10, Pot_id = $11, Zone_id = $12 WHERE id = $13 RETURNING *";
    const { rows } = await pool.query(query, [duration, action, schedule, enabled, rain_probability_min, rain_porobability_max, humidity_min, humidity_max, lux_min, lux_max, Pot_id, Zone_id, id]);
    return rows[0];
  }

  static async deleteRule(id) {
    const query = "DELETE FROM Rules WHERE id = $1";
    await pool.query(query, [id]);
    return { message: "Rule has been deleted" };
  }
}

module.exports = Rule;
