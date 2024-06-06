import os, requests, json
from dotenv import load_dotenv

load_dotenv()
RULES_ENDPOINT = os.getenv('rules_url')

#TODO add error handling for e.g. for network errors + validation
class Rule:
    @staticmethod
    def getRulesList():
        rules_list = []
        try:
            response = requests.get(RULES_ENDPOINT)
            response.raise_for_status()
            data = response.json()
            for item in data:
                rules_list.append(item)
        except requests.RequestException as e:
            print(f"Network error: {e}")
        except ValueError as e:
            print(f"JSON decode error: {e}")
        return rules_list
    
    def storeRulesInList(self):
        rules_list = self.getRulesList()
        for rule in rules_list[:]: 
            if rule['rules_id'] != 1:
                print(f"No rule with id {rule['rules_id']} found")
                
            elif rule['rules_id'] == 1:
                rules_list.remove(rule)
                print(rules_list)
                return rule


# can only return 1 rule
rule_instance = Rule()
rule_instance.storeRulesInList()