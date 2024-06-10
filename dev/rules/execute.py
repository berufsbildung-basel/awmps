from rule import Rule
from service import Service

ruleInstance = Rule(*Service().extractRuleService())
Service().scheduleService()