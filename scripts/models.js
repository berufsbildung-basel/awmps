const Sequelize = require('sequelize');

const sequelize = new Sequelize('first', 'sinokholkhojaev', 'LOGIN', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

const PotType = sequelize.define('PotType', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
  }
}, {
  timestamps: false,
});

