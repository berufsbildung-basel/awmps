import rule, time, apscheduler, logging, service
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
        ruleID = self.rulesID()
        #sample data below
        currentRainProbability = 300
        currentHumidity = 25
        currentLux = 190

        def disapprove(ruleID, reason):
            print(f"Rule with id {ruleID} not approved because {reason} is not in range")

        if not (self.minRainProbability <= currentRainProbability <= self.maxRainProbability):
            disapprove(ruleID, "rain probability")
        elif not (self.minHumidity <= currentHumidity <= self.maxHumidity):
            disapprove(ruleID, "humidity")
        elif not (self.minLux <= currentLux <= self.maxLux):
            disapprove(ruleID, "lux")
        else:
            print("within range")

    def setSchedule(self):
        schedule = self.schedule
        scheduler = BackgroundScheduler()

        trigger = CronTrigger.from_crontab(schedule)

        scheduler.add_job(serviceInstance.execute, trigger)

        try:
            scheduler.start()
            while True:
                time.sleep(1)
        except (KeyboardInterrupt, SystemExit):
            scheduler.shutdown()

    logging.basicConfig()
    logging.getLogger('apscheduler').setLevel(logging.DEBUG)

    
serviceInstance = service.Service()
extractRule = serviceInstance.extractRuleService()

ruleInstance = Rule(*extractRule)
ruleInstance.setSchedule()