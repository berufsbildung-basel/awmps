import { getUser, createUser, updateUser, deleteUser, getPot, createPot, updatePot, deletePot, getPlant, createPlant, updatePlant,
   deletePlant, getSensors, createSensor, updateSensor, deleteSensor, getPotType, createPotType, updatePotType, deletePotType, getCommand, createCommand, updateCommand,
    deleteCommand, getRule, createRule, updateRule, deleteRule } from "../model/model.js";

import * as Model from "../model/model.js"

const getUsers = async (req, res) => {
  try {
    const users = await getUser();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postUser = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const putUser = async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPots = async (req, res) => {
  try {
    const pots = await getPot();
    res.json(pots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postPot = async (req, res) => {
  try {
    const newPot = await createPot(req.body);
    res.status(201).json(newPot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const putPot = async (req, res) => {
  try {
    const updatedPot = await updatePot(req.params.id, req.body);
    res.json(updatedPot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePotById = async (req, res) => {
  try {
    await deletePot(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Plants
const getPlants = async (req, res) => {
  try {
    const plants = await getPlant();
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postPlant = async (req, res) => {
  try {
    const newPlant = await createPlant(req.body);
    res.status(201).json(newPlant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const putPlant = async (req, res) => {
  try {
    const updatedPlant = await updatePlant(req.params.id, req.body);
    res.json(updatedPlant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePlantById = async (req, res) => {
  try {
    await deletePlant(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSensors = async (req, res) => {
  try {
    const sensors = await getSensors();
    res.json(sensors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postSensor = async (req, res) => {
  try {
    const newSensor = await createSensor(req.body);
    res.status(201).json(newSensor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const putSensor = async (req, res) => {
  try {
    const updatedSensor = await updateSensor(req.params.id, req.body);
    res.json(updatedSensor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSensorById = async (req, res) => {
  try {
    await deleteSensor(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PotType
const getPotTypes = async (req, res) => {
  try {
    const potTypes = await getPotType();
    res.json(potTypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postPotType = async (req, res) => {
  try {
    const newPotType = await createPotType(req.body);
    res.status(201).json(newPotType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const putPotType = async (req, res) => {
  try {
    const updatedPotType = await updatePotType(req.params.id, req.body);
    res.json(updatedPotType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePotTypeById = async (req, res) => {
  try {
    await deletePotType(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Commands
const getCommands = async (req, res) => {
  try {
    const commands = await getCommand();
    res.json(commands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postCommand = async (req, res) => {
  try {
    const newCommand = await createCommand(req.body);
    res.status(201).json(newCommand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const putCommand = async (req, res) => {
  try {
    const updatedCommand = await updateCommand(req.params.id, req.body);
    res.json(updatedCommand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCommandById = async (req, res) => {
  try {
    await deleteCommand(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rules
const getRules = async (req, res) => {
  try {
    const rules = await getRule();
    res.json(rules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postRule = async (req, res) => {
  try {
    const newRule = await createRule(req.body);
    res.status(201).json(newRule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const putRule = async (req, res) => {
  try {
    const updatedRule = await updateRule(req.params.id, req.body);
    res.json(updatedRule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRuleById = async (req, res) => {
  try {
    await deleteRule(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUsers, postUser, putUser, deleteUserById, getPots, postPot, putPot, deletePotById, getPlants, postPlant, putPlant, deletePlantById, getSensors,
  postSensor, putSensor, deleteSensorById, getPotTypes, postPotType, putPotType, deletePotTypeById, getCommands, postCommand, putCommand, deleteCommandById, getRules,
  postRule, putRule, deleteRuleById };
