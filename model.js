const pool = require("./db")

const getUser = async () => {
  try {
    const res = await pool.query("SELECT * FROM Users;")
    return res.rows
  } catch (err) {
    throw err;
  }
}

const createUser = async (userData) => {
  const { username, email, password, first_name, last_name } = userData
  try {
    const res = await pool.query('INSERT INTO users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, email, password, first_name, last_name])
    return res.rows[0]
  } catch (err) {
    throw err
  }
}

const updateUser = async (id, userData) => {
  const { username, email, passsword, first_name, last_name } = userData
  try {
    const res = await pool.query('UPDATE users Set username = $1, email = $2, password = $3, first_name = $4, last_name = $5 WHERE id = $6 RETURNING *', [username, email, password, first_name, last_name, id])
  } catch (err) {
    throw err
}
};

const deleteUser = async (id) => {
  try {
    await pool.query ("DELTE FORM users WHERE id = $1", [id])
    return {message: "User has been deleted"}
  } catch (err) {
    throw err
  }
}

const getPot = async () => {
  try {
    const res = await pool.query("SELECT * FROM Pots;")
    return res.rows
  } catch (err) {
    throw err
  }
}

const createPot = async (potData) => {
  const { name, pot_type_id } = userData
  try {
    const res = await pool.query("INSER INTO pots (name, pot_type_id ) VALUES ($1, $2) RETURNINg *", [name, pot_type_id])
  } catch (err) {
    throw err
  }
}

const updatePot = async (id, userData) => {
  const { name, pot_type_id } = userData
  try {
      const res = await pool.query ("UPDATE Pots Set name = $1, pot_type_id = $2 where id = $3 RETURNING *", [name, pot_type_id, id])
  } catch (err) {
    throw err
  }
}

const deletePot = async (id) => {
  try {
    await pool.query ("DELETE FROM Pots WHERE id = $1", [id])
    return {message: "Pot has been deleted"}
  } catch (err) {
    throw err
  }
}

const getPlant = async () => {
  try {
    const res = await pool.query("SELECT * FROM Plants;")
    return res.rows
  } catch (err) {
    throw err
  }
}

const createPlant = async (plantData) => {
  const { pot_id, name, description, position} = plantData
  try {
    const res = await pool.query("INSERT INTO Plants (pot_id, name, description, position) VALUES ($1, $2, $3, $4) RETURNING *" [pot_id, name, description, position])
  } catch (err) {
    throw err
  }
}

const updatePlant = async (id, plantData) => {
  const { pot_id, name, description, position} = plantData
  try {
    const res = await pool.query ("UPDATE Plants Set pot_id = $1, name = $2, description = $3, position = $4 RETURNING *", [pot_id, name, description, position, id])
  } catch (err) {
    throw err
  }
}

const deletePlant = async (id) => {
  try {
    await pool.query ("DELETE FROM Plants WHERE id = $1", [id])
    return {message: "Plant has been deleted"}
  } catch (err) {
    throw err
  }
}

const getPotType = async () => {
  try{
    const res = await pool.query("SELECT * FROM pot_types")
    return res.rows
  } catch (err) {
    throw err
  }
}

const createPotType = async (pottypeData) => {
  const { name, capacity, sensor_type} = pottypeData
  try {
    const res = await pool.query("ISNERT INTO Pot_Type (name, capacity, sensor_type) VALUES ($1, $2, $3) RETURNING *", [name, capacity, sensor_type])
  } catch (err) {
    throw err
  }
}
const updatePotType = async (id, pottypeData) => {
  const { name, capacity, sensor_type} = pottypeData
  try {
    const res = await pool.query ("UPDATE Pot_Type Set name = $1, capacity = $2, sensor_type = $3 RETURNING *", [name, capacity, sensor_type, id])
  } catch (err) {
    throw err
  }
}

const deletePotType = async (id) => {
  try {
    await pool.query ("DELETE FROM PotType WHERE id = $1", [id])
    return {message: "PotType has been deleted"}
  } catch (err) {
    throw err
  }
} 

const getSensors = async () => {
  try{
    const res = await pool.query("select * from sensors")
    return res.rows
  } catch (err) {
    throw err
  }
} 

const createSensor = async (sensorData) => {
  const { pot_id, name, sensor_type_id } = sensorData
  try {
    const res = await pool.query ("INSERT INTO Sensors (pot_id, name, sensor_type_id) VALUES ($1, $2, $3) RETURNING *", [pot_id, name, sensor_type_id])
  } catch (err) {
    throw err
  }
}

const updateSensor = async (id, sensorData) => {
  const { pot_id, name, sensor_type_id } = sensorData
  try {
    const res = await pool.query ("UPDATE Sensors Set pot_id Set pot_id = $1, name = $2, sensor_type_id = $3 RETURNING *", [pot_id, name, sensor_type_id, id])
  } catch (err) {
    throw err
  }
}

const deleteSensor = async (id) => {
  try {
    await pool.query ("DELETE FROM Sensors WEHRE id = $1", [id])
  } catch (err) {
    throw err
  }
}

/* const getSensorType = async () => {
  try{
    const res = await pool.query("SELECT * FORM Sensor_Type")
    return res.rows
  } catch (err){
    throw err
  }
}
*/

const createSensorType = async ()
const getCommand = async () => {
  try{
    const res = await pool.query("SELECT * FROM Commands")
    return res.rows
  } catch (err) {
    throw err
  }
}

const createCommand = async (commandData) => {
  const { water_pot_schedule, duration_time_of_watering, pot_id} = commandData
  try{
    const res = await pool.query("INSERT INTO Commands (water_pot_schedule, duration_time_of_watering, pot_id) VALUES ($1, $2, $3) RETURNING *", [water_pot_schedule, duration_time_of_watering, pot_id])
  } catch (err) {
    throw err
  }
}

const updateCommand = async(id, commandData) => {
  const { water_pot_schedule, duration_time_of_watering, pot_id} = commandData
  try{
    const res = await pool.query("UPDATE Sensors Set water_pot_schedule = $1, duration_time_of_watering = $2, pot_id = $3 RETURNING *", [water_pot_schedule, duration_time_of_watering, pot_id, id])
  } catch (err) {
    throw err
  }
}

const deleteCommand = async(id) => {
  try {
    await pool.query ("DELETE FROM Commands WHERE id = $1", [id])
  } catch (err) {
    throw err
  }
}

const getRule = async () => {
  try{
    const res = await pool.query("SELECT * FROM Rules")
    return res.rows
  } catch (err) {
    throw err
  }
}

const createRule = async (ruleData) => {
  const { pot_watering_schedul, max_humidity, rain_probability, valves_active, pot_id} = ruleData
  try{
    const res = await pool.query("INSERT INTO Rules (pot_watering_schedul, max_humidity, rain_probability, valves_active, pot_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [pot_watering_schedul, max_humidity, rain_probability, valves_active, pot_id])
  } catch (err) {
    throw err
  }
}

const updateRule = async(id, ruleData) => {
  const { pot_watering_schedul, max_humidity, rain_probability, valves_active, pot_id} = ruleData
  try{
    const res = await pool.query("UPDATE Rules Set pot_watering_schedul = $1, max_humidity = $2, rain_probability = $3, valves_active = $4, pot_id = $5 RETURNING *", [pot_watering_schedul, max_humidity, rain_probability, valves_active, pot_id])
  } catch (err) {
    throw err
  }
}

const deleteRule = async(id) => {
  try {
    await pool.query ("DELETE FROM Rules WHERE id = $1", [id])
  } catch (err) {
    throw err
  }
}
module.exports = {
  getUser, createUser, updateUser, deleteUser, getPot, createPot, updatePot, deletePot, getPlant, createPlant, updatePlant, deletePlant, getSensors, createSensor, updateSensor, deleteSensor, getPotType, createPotType, updatePotType, deletePotType, getCommand, createCommand, updateCommand, deleteCommand, getRule, createRule, updateRule, deleteRule,
}