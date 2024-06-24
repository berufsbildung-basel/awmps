import time
from sensors import Sensor

class Action:
    def water(self, duration):
        # valve = Sensor().valve

        # valve = "opened"
        # print(valve)
        print("opened")
        time.sleep(duration)
        # valve = "closed"
        # print(valve)
        print("closed")