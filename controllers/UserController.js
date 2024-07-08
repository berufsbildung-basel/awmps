const { getUsers, createUser, updateUser, deleteUser } = require ("../model/userModel.js");
const bcrypt = require("bcrypt")
class UserController {
  async getUsers(req, res) {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async postUser(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(re.body.password, 10)
      const newUser = {username: req.body.username, password: req.body.hashedPassword, email: req.body.password, first_name: req.body.first_name, last_nmae: req.body.last_name};      
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async putUser(req, res) {
    try {
      const updatedUser = await updateUser(req.params.id, req.body);
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteUserById(req, res) {
    try {
      await deleteUser(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = {UserController}