import rule


class Accessors:
    def __init__(self, createdAt,rulesID, potID, zoneID, duration, action, schedule, enabled, minRainProbability, 
    maxRainProbability, minHumidity, maxHumidity, minLux, maxLux):
        self.createdAt = createdAt
        self.rulesID = rulesID
        self.potID = potID
        self.zoneID = zoneID
        self.duration = duration
        self.action = action
        self.schedule = schedule
        self.enabled = enabled
        self.minRainProbability = minRainProbability
        self.maxRainProbability = maxRainProbability
        self.minHumidity = minHumidity
        self.maxHumidity = maxHumidity
        self.minLux = minLux
        self.maxLux = maxLux

    def isEnabled(self):
        return self.enabled

    def getRulesID(self):
        return self.rulesID

    def getPotID(self):
        return self.potID

    def getZoneID(self):
        return self.zoneID

    def getDuration(self):
        return self.duration

    def getAction(self):
        return self.action

    def getSchedule(self):
        return self.schedule

    def isEnabled(self):
        return self.enabled

    def getMinRainProbability(self):
        return self.minRainProbability

    def getMaxRainProbability(self):
        return self.maxRainProbability

    def getMinHumidity(self):
        return self.minHumidity

    def getMaxHumidity(self):
        return self.maxHumidity

    def getMinLux(self):
        return self.minLux

    def getMaxLux(self):
        return self.maxLux

    def waterChecker(self):
        ruleID = self.getRulesID()
        #sample data below
        currentRainProbability = 300
        currentHumidity = 25
        currentLux = 190

        def disapprove(ruleID, reason):
            print(f"Rule with id {ruleID} not approved because {reason} is not in range")

        if not (self.getMinRainProbability() <= currentRainProbability <= self.getMaxRainProbability()):
            disapprove(ruleID, "rain probability")
        elif not (self.getMinHumidity() <= currentHumidity <= self.getMaxHumidity()):
            disapprove(ruleID, "humidity")
        elif not (self.getMinLux() <= currentLux <= self.getMaxLux()):
            disapprove(ruleID, "lux")
        else:
            print("within range")

createform = rule.Rule().extractRule()
accessorInstance = Accessors(*createform)
accessorInstance.waterChecker()