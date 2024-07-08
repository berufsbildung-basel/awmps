DROP TABLE IF EXISTS Commands CASCADE;
DROP TABLE IF EXISTS Sensors CASCADE;
DROP TABLE IF EXISTS Plant CASCADE;
DROP TABLE IF EXISTS Pot CASCADE;
DROP TABLE IF EXISTS Pot_Type CASCADE;
DROP TABLE IF EXISTS Users CASCADE;

CREATE TABLE IF NOT EXISTS Users (
  username VARCHAR PRIMARY KEY,
  password VARCHAR,
  email VARCHAR UNIQUE,
  first_name VARCHAR(25),
  last_name VARCHAR(25),
  admin BOOLEAN,
  disabled BOOLEAN,
  last_signed DATE,
  notification BOOLEAN,
  user_notification_setting TEXT
);

CREATE TABLE IF NOT EXISTS Pot_Type (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  capacity INT
);

CREATE TABLE IF NOT EXISTS Pot (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  pot_type_id INT REFERENCES Pot_Type(id)
);

CREATE TABLE IF NOT EXISTS Plant (
  id SERIAL PRIMARY KEY,
  pot_id INT REFERENCES Pot(id),
  name VARCHAR,
  description TEXT,
  position INT
);

CREATE TABLE IF NOT EXISTS Sensors (
  id SERIAL PRIMARY KEY,
  pot_id INT REFERENCES Pot(id),
  sensor_tag VARCHAR UNIQUE,
  sensor_type VARCHAR
);

CREATE TABLE IF NOT EXISTS Commands (
  id SERIAL PRIMARY KEY,
  type VARCHAR,
  state VARCHAR,
  created_at DATE,
  started_at DATE,
  finished_at DATE,
  created_by VARCHAR REFERENCES Users (username),
  pot_id INT REFERENCES Pot(id)
);

CREATE TABLE IF NOT EXISTS Rules (
  id SERIAL PRIMARY KEY,
  type VARCHAR,
  criteria VARCHAR,
  pot_id INT REFERENCES Pot(id)
);
