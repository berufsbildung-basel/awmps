const pool = require("./db");

class Sensor {
  static async getSensors() {
    const query = "SELECT * FROM Sensors;";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async createSensor(sensorData) {
    const { pot_id, name, sensor_type_id } = sensorData;
    const query = "INSERT INTO Sensors (pot_id, name, sensor_type_id) VALUES ($1, $2, $3) RETURNING *";
    const { rows } = await pool.query(query, [pot_id, name, sensor_type_id]);
    return rows[0];
  }

  static async updateSensor(id, sensorData) {
    const { pot_id, name, sensor_type_id } = sensorData;
    const query = "UPDATE Sensors SET pot_id = $1, name = $2, sensor_type_id = $3 WHERE id = $4 RETURNING *";
    const { rows } = await pool.query(query, [pot_id, name, sensor_type_id, id]);
    return rows[0];
  }

  static async deleteSensor(id) {
    const query = "DELETE FROM Sensors WHERE id = $1";
    await pool.query(query, [id]);
    return { message: "Sensor has been deleted" };
  }
}

module.exports = Sensor;
