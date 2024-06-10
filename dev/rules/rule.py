import rule, time, apscheduler, logging
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

class Rule:
    def __init__(self, createdAt,rulesID, potID, zoneID, duration, action, schedule, enabled, minRainProbability, maxRainProbability, minHumidity, maxHumidity, minLux, maxLux):
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

    def inRange(self):
        ruleID = self.rulesID
        #sample data below
        currentRainProbability = 300
        currentHumidity = 25
        currentLux = 190

        def disapprove(ruleID, key):
            print(f"Rule with id {ruleID} not approved because {key} is not in range")
            return 1

        def approve(ruleID):
            print(f"Rule with id {ruleID} approved and is in range")
            return 2

        if not (self.minRainProbability <= currentRainProbability <= self.maxRainProbability):
            return disapprove(ruleID, "rain probability")
        elif not (self.minHumidity <= currentHumidity <= self.maxHumidity):
            return disapprove(ruleID, "humidity")
        elif not (self.minLux <= currentLux <= self.maxLux):
            return disapprove(ruleID, "lux")
        else:
            return approve(ruleID)