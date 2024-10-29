const { getPlants, createPlant, updatePlant, deletePlant } = require ("../model/ZoneModel.js");

class ZoneController {
  async getPlants(req, res) {
    try {
      const plants = await getPlants();
      res.json(plants);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async postPlant(req, res) {
    try {
      const newPlant = await createPlant(req.body);
      res.status(201).json(newPlant);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async putPlant(req, res) {
    try {
      const updatedPlant = await updatePlant(req.params.id, req.body);
      res.json(updatedPlant);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deletePlantById(req, res) {
    try {
      await deletePlant(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = { ZoneController }