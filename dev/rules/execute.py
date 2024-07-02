from rule import Rule
from service import Service

inrange = Service().inRange()

if inrange == 1:
    pass
elif inrange == 2:
    # Service().scheduleService()
    Service().queryService()