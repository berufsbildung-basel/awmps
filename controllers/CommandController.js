const { getCommands, createCommand, updateCommand, deleteCommand } = require ("../model/commandModel.js");

class CommandController {
  async getCommands(req, res) {
    try {
      const commands = await getCommands();
      res.json(commands);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async postCommand(req, res) {
    try {
      const newCommand = await createCommand(req.body);
      res.status(201).json(newCommand);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async putCommand(req, res) {
    try {
      const updatedCommand = await updateCommand(req.params.id, req.body);
      res.json(updatedCommand);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteCommandById(req, res) {
    try {
      await deleteCommand(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = {CommandController}