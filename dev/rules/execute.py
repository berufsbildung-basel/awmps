from rule import Rule
from service import Service

inrange = Service().inRange()

if inrange == 1:
    print("deny")
elif inrange == 2:
    print("accept")
    Service().scheduleService()