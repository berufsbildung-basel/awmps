import os, requests, time, logging
from rule import Rule
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from dotenv import load_dotenv

load_dotenv()
RULES_ENDPOINT = os.getenv('rules_url')

class Service():
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

            if rule['rules_id'] != 1:
                print(f"No rule with id {rule['rules_id']} found")

            elif rule['rules_id'] == 1:
                rulesList.remove(rule)
                singleRule.update(rule)
                singleRuleValues = singleRule.values()
                return list(singleRuleValues)

    def execute(self):
        return print("\napprove\n")

    #sets a schedule (aka cronjob) and logs everything
    def scheduleService(self):
        schedule = Rule(*Service().extractRuleService()).schedule
        scheduler = BackgroundScheduler()

        trigger = CronTrigger.from_crontab(schedule)

        scheduler.add_job(self.execute, trigger)

        logging.basicConfig()
        logging.getLogger('apscheduler').setLevel(logging.DEBUG)
        
        try:
            scheduler.start()
            while True:
                time.sleep(1)
        except (KeyboardInterrupt, SystemExit):
            scheduler.shutdown()