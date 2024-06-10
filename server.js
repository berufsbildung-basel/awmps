const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//TODO: create a userID import

// import middleware
const sessionMiddleware = require("./middlewares/session.js")
// import from controllers
const { CommandController } = require('./controllers/CommandController');
const { ZoneController } = require('./controllers/ZoneController');
const { PotController } = require('./controllers/PotController');
const { PotTypeController } = require('./controllers/PotTypeController');
const { RuleController } = require('./controllers/RuleController');
const { SensorController } = require('./controllers/SensorController');
const { UserController } = require('./controllers/UserController');
const { login } = require("./controllers/login.js")

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/login", (req, res) => login(req,res));

// middleware
app.use(sessionMiddleware);

const commandController = new CommandController();
app.get("/commands", (req, res) => commandController.getCommands(req, res));
app.post("/commands", (req, res) => commandController.postCommand(req, res));
app.put("/commands/:id", (req, res) => commandController.putCommand(req, res));
app.delete("/commands/:id", (req, res) => commandController.deleteCommandById(req, res));

const zoneController = new ZoneController();
app.get("/zones", (req, res) => zoneController.getZones(req, res));
app.post("/zones", (req, res) => zoneController.postZone(req, res));
app.put("/zones/:id", (req, res) => zoneController.putZone(req, res));
app.delete("/zones/:id", (req, res) => zoneController.deleteZoneById(req, res));

const potController = new PotController();
app.get("/pots", (req, res) => potController.getPots(req, res));
app.post("/pots", (req, res) => potController.postPot(req, res));
app.put("/pots/:id", (req, res) => potController.putPot(req, res));
app.delete("/pots/:id", (req, res) => potController.deletePotById(req, res));

const potTypeController = new PotTypeController();
app.get("/potTypes", (req, res) => potTypeController.getPotTypes(req, res));
app.post("/potTypes", (req, res) => potTypeController.postPotType(req, res));
app.put("/potTypes/:id", (req, res) => potTypeController.putPotType(req, res));
app.delete("/potTypes/:id", (req, res) => potTypeController.deletePotTypeById(req, res));

const ruleController = new RuleController();
app.get("/rules", (req, res) => ruleController.getRules(req, res));
app.post("/rules", (req, res) => ruleController.postRule(req, res));
app.put("/rules/:id", (req, res) => ruleController.putRule(req, res));
app.delete("/rules/:id", (req, res) => ruleController.deleteRuleById(req, res));

const sensorController = new SensorController();
app.get("/sensors", (req, res) => sensorController.getSensors(req, res));
app.post("/sensors", (req, res) => sensorController.postSensor(req, res));
app.put("/sensors/:id", (req, res) => sensorController.putSensor(req, res));
app.delete("/sensors/:id", (req, res) => sensorController.deleteSensorById(req, res));

const userController = new UserController();
app.get("/users", (req, res) => userController.getUsers(req, res));
app.post("/users", (req, res) => userController.postUser(req, res));
app.put("/users/:id", (req, res) => userController.putUser(req, res));
app.delete("/users/:id", (req, res) => userController.deleteUserById(req, res));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
