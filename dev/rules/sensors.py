class Sensor:
    def __init__(self, light, airTemperature, airHumidity, soilMoisture, soilTemperature, waterFlow, valve):
        self.light = light
        self.airHumidity = airHumidity
        self.airTemperature = airTemperature
        self.soilMoisture = soilMoisture
        self.soilTemperature = soilTemperature
        self.waterFlow = waterFlow
        self.valve = valve