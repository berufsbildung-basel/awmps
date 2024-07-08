const Sequelize = require('sequelize');

// It's better to use environment variables for credentials
const sequelize = new Sequelize('first', 'sinokholkhojaev', 'LOGIN', {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
});

const AppUser = sequelize.define('AppUser', {
  username: { type: Sequelize.STRING, unique: true, primaryKey: true },
  password: Sequelize.STRING,
  email: { type: Sequelize.STRING, unique: true },
  firstName: Sequelize.STRING, // Use camelCase for consistency
  lastName: Sequelize.STRING,
  admin: Sequelize.BOOLEAN,
  disabled: Sequelize.BOOLEAN,
  lastSigned: Sequelize.DATE, // Use camelCase
  notification: Sequelize.BOOLEAN,
  userNotificationSetting: Sequelize.STRING, // Use camelCase
}, {
  timestamps: false,
  freezeTableName: true, // Prevent Sequelize from pluralizing table names
});

// Define 'PotType'
const PotType = sequelize.define('PotType', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    capacity: Sequelize.INTEGER,
}, {
    timestamps: false,
    freezeTableName: true,
});

// Define the 'Pot' model
const Pot = sequelize.define('Pot', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
}, {
    timestamps: false,
    freezeTableName: true,
});

const Plant = sequelize.define('Plant', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    position: Sequelize.INTEGER,
}, {
    timestamps: false,
    freezeTableName: true,
});

const Sensor = sequelize.define('Sensor', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    sensorId: Sequelize.STRING, // Use camelCase
    sensorType: Sequelize.STRING,
}, {
    timestamps: false,
    freezeTableName: true,
});

const Command = sequelize.define('Command', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    type: Sequelize.STRING,
    state: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    startedAt: Sequelize.DATE,
    finishedAt: Sequelize.DATE,
}, {
    timestamps: false,
    freezeTableName: true,
});

const Rule = sequelize.define('Rule', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    type: Sequelize.STRING,
    criteria: Sequelize.STRING,
}, {
    timestamps: false,
    freezeTableName: true,
}); 

// Assign foreign keys
Pot.belongsTo(PotType, { foreignKey: 'potTypeId' });
PotType.hasMany(Pot, { foreignKey: 'potTypeId' });

Plant.belongsTo(Pot, { foreignKey: 'potId' });
Pot.hasMany(Plant, { foreignKey: 'potId' });

Sensor.belongsTo(Pot, { foreignKey: 'potId' });
Pot.hasMany(Sensor, { foreignKey: 'potId' });

Command.belongsTo(AppUser, { foreignKey: 'createdBy' });
AppUser.hasMany(Command, { foreignKey: 'createdBy' });

Command.belongsTo(Pot, { foreignKey: 'potId' });
Pot.hasMany(Command, { foreignKey: 'potId' });

Rule.belongsTo(Pot, { foreignKey: 'potId' });
Pot.hasMany(Rule, { foreignKey: 'potId' });

sequelize.sync({ force: true }).then(() => {
    console.log('Tables created!');
});

async function addSampleData() {
  
  const transaction = await sequelize.transaction();
  try {
  
      const potType1 = await PotType.create({
          name: 'Small Pot',
          capacity: 5
      }, { transaction });

      const potType2 = await PotType.create({
          name: 'Large Pot',
          capacity: 15
      }, { transaction });

      
      const pot1 = await Pot.create({
          name: 'Cactus Home',
          Pot_type_id: potType1.id
      }, { transaction });

      const pot2 = await Pot.create({
          name: 'Orchid Pot',
          Pot_type_id: potType2.id
      }, { transaction });

      
      const user1 = await AppUser.create({
          username: 'johndoe',
          password: 'password123',
          email: 'john.doe@example.com',
          first_name: 'John',
          last_name: 'Doe',
          admin: false,
          disabled: false,
          last_signed: new Date(),
          notification: true,
          user_notification_setting: 'email'
      }, { transaction });

      
      await Plant.create({
          name: 'Cactus',
          description: 'A small cactus plant',
          position: 1,
          pot_id: pot1.id
      }, { transaction });

      await Plant.create({
          name: 'Orchid',
          description: 'A beautiful orchid',
          position: 2,
          pot_id: pot2.id
      }, { transaction });

      
      await Sensor.create({
          sensor_id: 'temp-sensor-1',
          sensor_type: 'Temperature',
          Pot_id: pot1.id
      }, { transaction });

      await Sensor.create({
          sensor_id: 'moist-sensor-1',
          sensor_type: 'Moisture',
          Pot_id: pot2.id
      }, { transaction });

      
      await Command.create({
          type: 'Watering',
          state: 'Completed',
          created_at: new Date(),
          started_at: new Date(),
          finished_at: new Date(),
          created_by: user1.username,
          pot_id: pot1.id
      }, { transaction });

      
      await Rule.create({
          type: 'Watering Schedule',
          criteria: 'Every 3 days',
          Pot_id: pot1.id
      }, { transaction });

      // commit transaction if everything is OK
      await transaction.commit();
      console.log('Sample data has been added successfully!');
  } catch (error) {
      // rollback transaction if there are any errors
      await transaction.rollback();
      console.error('Error adding sample data:', error);
  }
}

async function checkTableExistence(tableName) {
    try {
        const result = await sequelize.query(`SELECT EXISTS (
            SELECT FROM 
                pg_tables
            WHERE 
                schemaname = 'public' AND 
                tablename  = '${tableName}'
        );`);
        return result[0][0].exists;
    } catch (error) {
        console.error(`Error checking existence of table ${tableName}:`, error);
        throw error;
    }
}

// call the function to snyc models and then add sample data
syncModels().then(addSampleData).catch(error => {
  console.error('An error occurred:', error);
});


// Function to synchronize models with deadlock handling
async function syncModels(retries = 5, delay = 5000) {
    for (let i = 0; i < retries; i++) {
      try {
        await sequelize.sync({ force: true });
        console.log('Models have been synchronized successfully.');
        break; // Break the loop if the synchronization is successful
      } catch (error) {
        if (error.original && error.original.code === '40P01') {
          // Deadlock detected
          console.error(`Deadlock detected. Retrying ${i + 1} of ${retries}...`);
          // Wait for the specified delay before retrying
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          // Some other error occurred, log it and break the loop
          console.error('There was a problem syncing the models:', error);
          break;
        }
      }
    }
  }
  
  
  // Function to synchronize models
async function syncModels() {
    try {
        // Check for each table before trying to recreate them
        const tables = ['AppUser', 'PotType', 'Pot', 'Plant', 'Sensor', 'Command', 'Rule'];
        for (const table of tables) {
            const exists = await checkTableExistence(table);
            if (exists) {
                console.log(`Table ${table} already exists, skipping creation.`);
            } else {
                await sequelize.sync({ force: true });
                console.log(`Table ${table} created.`);
            }
        }
    } catch (error) {
        console.error('Error syncing models:', error);
        throw error;
    }
}

// Call the syncModels function and handle any errors
syncModels().then(() => {
    console.log('All models were synchronized successfully.');
}).catch(error => {
    console.error('An error occurred during model synchronization:', error);
});

// Exporting all models
module.exports = {
    sequelize, // Export the sequelize instance
    PotType,   // Export the PotType model
    Pot,
    Plant,
    Sensor,
    Command,
    Rule
  };

module.exports = PotType;