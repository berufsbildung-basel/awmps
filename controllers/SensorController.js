const { getSensors, createSensor, updateSensor, deleteSensor } = require("../model/sensorModel.js");

class SensorController {
  async getSensors(req, res) {
    try {
      const sensors = await getSensors();
      res.json(sensors);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async postSensor(req, res) {
    try {
      const newSensor = await createSensor(req.body);
      res.status(201).json(newSensor);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async putSensor(req, res) {
    try {
      const updatedSensor = await updateSensor(req.params.id, req.body);
      res.json(updatedSensor);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteSensorById(req, res) {
    try {
      await deleteSensor(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = {SensorController}