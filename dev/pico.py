import time, json, serial, random

PORT = '/dev/ttys004'
BAUDRATE = 19200
SER = serial.Serial(PORT, BAUDRATE)


# sends the list with the sensors and its values back to the microcontroller
def send_back(list):
    list = "\n" + list + "\n"
    SER.write(list.encode('utf-8'))


# processes(reads) the values from the sensors every 10s and appends the values to the dictionary of each of the sensors and appends the dictionaries to a list which is used by the send_back function
def loop(sensor_list):
    while True:
        send_list_back = []
        for sensor in sensor_list:
            sensor_type = sensor.get('sensor_type')

            if sensor_type == 'light':
                value = int((random.uniform(0, 10)))
            elif sensor_type == 'air_humidity':
                value = int((random.uniform(10, 20)))
            elif sensor_type == 'air_temperature':
                value = int((random.uniform(20, 30)))
            elif sensor_type == 'moisture':
                value = int((random.uniform(30, 40)))
            elif sensor_type == 'soil_temperature':
                value = int((random.uniform(40, 50)))
            elif sensor_type == 'water_flow':
                value = int((random.uniform(50, 60)))
            elif sensor_type == 'valve':
                value = int((random.uniform(0, 2)))
            else:
                value = None

            sensor["value"] = value
            send_list_back.append(sensor)

        send_json_list_back = json.dumps(send_list_back)
        
        print(send_json_list_back + "\n") ### remove later
        send_back(send_json_list_back)

        time.sleep(10)


# receives the sensor list - parses the json string to an object - calls the loop function - handles error if nothing comes from the serial
def read_sensor_list():
    time.sleep(3)
    try:
        sensor_list_str = SER.read_all().decode('utf-8').strip()
        sensor_list = json.loads(sensor_list_str)
        loop(sensor_list)

    except ValueError:
        print("DecodeValueError")


def main():
        read_sensor_list()

if __name__ == "__main__":
    main()