from rule import Rule
from service import Service

# Service().scheduleService()
# ruleInstance =  Rule(*Service().extractRuleService())
# inrange = ruleInstance.inRange()

inrange = Service().inRange()

if inrange == 1:
    print("deny")
elif inrange == 2:
    print("accept")

