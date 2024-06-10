const { getRules, createRule, updateRule, deleteRule } = require("../model/ruleModel.js");

class RuleController {
  async getRules(req, res) {
    try {
      const rules = await getRules();
      res.json(rules);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async postRule(req, res) {
    try {
      const newRule = await createRule(req.body);
      res.status(201).json(newRule);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async putRule(req, res) {
    try {
      const updatedRule = await updateRule(req.params.id, req.body);
      res.json(updatedRule);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteRuleById(req, res) {
    try {
      await deleteRule(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = {RuleController}