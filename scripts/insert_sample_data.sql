INSERT INTO Users (username, password, email, first_name, last_name, admin, disabled, last_signed, notification, user_notification_setting) VALUES
('user1', 'hashedpass1', 'user1@example.com', 'First1', 'Last1', true, false, '2024-01-01', true, 'daily'),
('user2', 'hashedpass2', 'user2@example.com', 'First2', 'Last2', false, false, '2024-01-02', true, 'weekly');

INSERT INTO Pot_Type (name, capacity) VALUES
('Small Pot', 10),
('Medium Pot', 20),
('Large Pot', 30);

INSERT INTO Pot (name, pot_type_id) VALUES
('Aloe Vera Pot', 1),
('Snake Plant Pot', 2),
('Spider Plant Pot', 3);

INSERT INTO Plant (pot_id, name, description, position) VALUES
(1, 'Aloe Vera', 'Useful for skin care and decoration', 1),
(2, 'Snake Plant', 'Improves air quality', 2),
(3, 'Spider Plant', 'Easy to grow and maintain', 3);

INSERT INTO Sensors (pot_id, sensor_tag, sensor_type) VALUES
(1, 'sensor-A1', 'Moisture'),
(2, 'sensor-B1', 'Temperature'),
(3, 'sensor-C1', 'Light');

INSERT INTO Commands (type, state, created_at, started_at, finished_at, created_by, pot_id) VALUES
('Water', 'Done', '2024-01-01', '2024-01-01', '2024-01-01', 'user1', 1),
('Fertilize', 'Pending', '2024-01-02', NULL, NULL, 'user2', 2);

INSERT INTO Rules (type, criteria, pot_id) VALUES
('Watering Rule', 'If soil moisture < 30%', 1),
('Lighting Rule', 'If light > 10000 lux', 2);
