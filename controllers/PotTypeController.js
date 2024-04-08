const { getPotTypes, createPotType, updatePotType, deletePotType } = require ("../model/potTypeModel.js");

class PotTypeController {
  async getPotTypes(req, res) {
    try {
      const potTypes = await getPotTypes();
      res.json(potTypes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async postPotType(req, res) {
    try {
      const newPotType = await createPotType(req.body);
      res.status(201).json(newPotType);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async putPotType(req, res) {
    try {
      const updatedPotType = await updatePotType(req.params.id, req.body);
      res.json(updatedPotType);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deletePotTypeById(req, res) {
    try {
      await deletePotType(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = {PotTypeController}