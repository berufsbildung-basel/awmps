import os, requests, json
from dotenv import load_dotenv

load_dotenv()
RULES_ENDPOINT = os.getenv('rules_url')

class Rule:
    @staticmethod
    def getRulesList():
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
    def extractRule(self):
        rulesList = self.getRulesList()
        singleRule = {}
        for rule in rulesList[:]: 

            if rule['rules_id'] != 1:
                print(f"No rule with id {rule['rules_id']} found")

            elif rule['rules_id'] == 1:
                rulesList.remove(rule)
                singleRule.update(rule)
                singleRule2 = singleRule.values()
                return list(singleRule2)

    def createFrom(self, singleRule):
        print(singleRule)

    # def createFrom2(self):
    #     singleRule = self.extractRule()
    #     print(singleRule)

if __name__ == "__main__":
    ruleInstance = Rule()
    ruleInstance.extractRule()
    # ruleInstance.createFrom(ruleInstance.extractRule())
    # ruleInstance.createFrom2()