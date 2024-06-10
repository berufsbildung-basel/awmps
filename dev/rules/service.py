import accessors, rule

class Service():
    def execute(self):
        return print("\napprove\n")
        
    def schedulingService():
        print("schedule")

    def sensorService():
        print("sensors")


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
