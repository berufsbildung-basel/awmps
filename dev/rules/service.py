import accessors, rule

class Service():
    def waterService(self):
        ruleID = accessor.getRulesID()
        #sample data below
        currentRainProbability = 300
        currentHumidity = 25
        currentLux = 190

        def disapprove(ruleID, reason):
            print(f"Rule with id {ruleID} not approved because {reason} is not in range")

        if not (accessor.getMinRainProbability() <= currentRainProbability <= accessor.getMaxRainProbability()):
            disapprove(ruleID, "rain probability")
        elif not (accessor.getMinHumidity() <= currentHumidity <= accessor.getMaxHumidity()):
            disapprove(ruleID, "humidity")
        elif not (accessor.getMinLux() <= currentLux <= accessor.getMaxLux()):
            disapprove(ruleID, "lux")
        else:
            print("within range")

    def schedulingService():
        print("schedule")

    def sensorService():
        print("sensors")


createform = rule.Rule().extractRule()
accessor = accessors.Accessors(*createform)

serviceInstance = Service()
serviceInstance.waterService()



# class Rule:
#   def getSchedule():
#   def execute():

# Create a rule object  via static method  on the Rule class, does validation
# rule = Rule.createFrom(ruleJSON);

# if rule.isEnabled()
#   addJob(rule);


# some other file...
# addJob(rule):
#   mySchedulingApi.scheduleTask(rule.getSchedule().toCtron())
    # scheduler calls rule.execute();

# rule.execute::
# - check conditiations against rule? ranges of temp/humidity, etc.
# - if in range, waterService.water(rule.getDuration())
# current_zone_temperature = sensorService.getTemperature(rule.getZoneID())
# current_zone_rh = sensorService.getHunidity(rule.getZoneID())
# current_oat = sensorService.getOutsideAirTemperature()
# current_orh = sensorService.getOutsideRelativeHumidity()
# if (....)
#   waterService.water(rule.getDuration())
