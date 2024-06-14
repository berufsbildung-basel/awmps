const { getPots, createPot, updatePot, deletePot } = require ("../model/potModel.js");

class PotController {
  async getPots(req, res) {
    try {
      console.log("working");
      const pots = await getPots();
      res.json(pots);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async postPot(req, res) {
    try {
      const newPot = await createPot(req.body);
      res.status(201).json(newPot);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async putPot(req, res) {
    try {
      const updatedPot = await updatePot(req.params.id, req.body);
      res.json(updatedPot);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deletePotById(req, res) {
    try {
      await deletePot(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = {PotController}