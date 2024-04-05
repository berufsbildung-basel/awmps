# import time, json, serial, random, threading

# PORT = '/dev/ttys003'
# SER = serial.Serial(PORT, 9600)

# def read_sensor_list():
#     time.sleep(5)
#     sensor_list = SER.read_all()
#     print(sensor_list)
#     jsond = json.loads(sensor_list)
#     return jsond



# def main():
#     read_sensor_list()

# if __name__ == "__main__":
#     main()


def fun():
    abc = {'a': 1, 'b': 2, 'c': 3}, {'d': 4, 'e': 5, 'f': 6}
    return abc


for ab in fun():
    ko = ab.get('a')
    print(ko)
