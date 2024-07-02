import os, requests, time, logging, serial
from rule import Rule
from actions import Action
from query import Query
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from dotenv import load_dotenv

load_dotenv()

PORT = os.getenv('portMicrocontroller')
BAUDRATE = os.getenv('baudrate')
SER = serial.Serial(PORT, BAUDRATE)

RULES_ENDPOINT = os.getenv('rulesURL')


class Service():
# Gets the list of rules from the endpoint and stores it in a list
    @staticmethod
    def getRulesListService():
        rulesList = []
        try:
            response = requests.get(RULES_ENDPOINT)
            response.raise_for_status()
            data = response.json()
            for item in data:
                rulesList.append(item)
        except requests.RequestException as e:
            print(f"Network error: {e}")
        except ValueError as e:
            print(f"JSON decode error: {e}")
        return rulesList
    
    
# Extract a single rule from the list of rules and store it in a dictionary
    def extractRuleService(self):
        rulesList = self.getRulesListService()
        singleRule = {}
        
        for rule in rulesList[:]:
            print(rulesList)
            rulesList.remove(rulesList[-1])
            singleRule.update(rule)
            singleRuleValues = singleRule.values()
            
            return list(singleRuleValues)


# Gets the duration from the rule
    def getDuration(self):
        ruleInstance = Rule(*Service().extractRuleService())
        duration = ruleInstance.duration
        return duration


# Calls the action to be executed (e.g. watering)
    def executeAction(self):
        duration = Service().getDuration()
        action = Action().water(duration)
        return action


# Sets a schedule (aka cronjob) and logs everything
    def scheduleService(self):
        ruleSchedule = Rule(*Service().extractRuleService()).schedule

        scheduler = BackgroundScheduler()
        trigger = CronTrigger.from_crontab(ruleSchedule)
        scheduler.add_job(self.executeAction, trigger)

        try:
            logging.basicConfig()
            logging.getLogger('apscheduler').setLevel(logging.DEBUG)
            scheduler.start()
            while True:
                time.sleep(1)
        except (KeyboardInterrupt, SystemExit):
            scheduler.shutdown()


# Checks if the current data is within the min and max ranges
    def inRange(self):
        ruleInstance = Rule(*Service().extractRuleService())
        ruleID = ruleInstance.rulesID
        #sample data below
        currentRainProbability = 20
        currentHumidity = 25
        currentLux = 190

        def disapprove(ruleID, key): #temporary
            print(f"\nRule with id {ruleID} not approved because {key} is not in range\n")
            return 1

        def approve(ruleID): #temporary
            print(f"\nRule with id {ruleID} approved and is in range \n")
            return 2

        if not (ruleInstance.minRainProbability <= currentRainProbability <= ruleInstance.maxRainProbability):
            return disapprove(ruleID, "rain probability")
        elif not (ruleInstance.minHumidity <= currentHumidity <= ruleInstance.maxHumidity):
            return disapprove(ruleID, "humidity")
        elif not (ruleInstance.minLux <= currentLux <= ruleInstance.maxLux):
            return disapprove(ruleID, "lux")
        else:
            return approve(ruleID)


    def queryService(self):
        while True:
            queryInstance = Query().query()
            print(queryInstance)
            time.sleep(10)