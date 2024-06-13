class Sensor:
    def __init__(self, light, airTemperature, airHumidity, soilMoisture, soilTemperature, waterFlow, valve):
        self.light = light
        self.airTemperature = airTemperature
        self.airHumidity = airHumidity
        self.soilMoisture = soilMoisture
        self.soilTemperature = soilTemperature
        self.waterFlow = waterFlow
        self.valve = valve