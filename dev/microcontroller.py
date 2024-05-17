import os, requests, serial, json
from influxdb_client_3 import InfluxDBClient3, Point
from dotenv import load_dotenv

load_dotenv()

INFLUX_TOKEN = os.getenv('token')
INFLUX_ORG = os.getenv('org')
INFLUX_HOST = os.getenv('host')
INFLUX_DATABASE = os.getenv('database')
INFLUX_MEASUREMENT = os.getenv('measurement')
INFLUX_CLIENT = InfluxDBClient3(os.getenv('client'))

API_URL = os.getenv('api_url')

PORT = '/dev/ttys007'
BAUDRATE = 19200
SER = serial.Serial(PORT, BAUDRATE)


# get json and store in list and return it
def get_sensor_list():
    sensor_list = []
    response = requests.get(API_URL)
    data = response.json()

    if response.status_code != 200:
        return sensor_list
    
    for item in data:
        sensor_list.append(item)

    return json.dumps(sensor_list)


# write sensor list to pico
def send_sensor_list(sensor_list):
    try:
        SER.write(f"{sensor_list}".encode('utf-8'))
    
    finally:
        with serial.Serial(PORT, BAUDRATE) as ser:
            x = ser.read()


# read the sensor list values one by one and writes them to the tsdb by making data points
def tsdb(sensor_list):
    for sensor in sensor_list:
        sensor_id = sensor.get("sensor_id")
        pot_id = sensor.get("pot_id")
        sensor_type = sensor.get("sensor_type")
        value = sensor.get("value")


        data_point = {
        "point": {
            "sensor_id" : sensor_id,
            "pot_id" : pot_id,
            "sensor_type" : sensor_type,
            "value" : value,
        }
        }

        print(data_point)
        for key in data_point:
            point = (
                Point(INFLUX_MEASUREMENT)
                .tag("sensor_id", data_point[key]["sensor_id"])
                .tag("pot_id", data_point[key]["pot_id"])
                .tag("sensor_type", data_point[key]["sensor_type"])
                .field("value", data_point[key]["value"])
            )

            INFLUX_CLIENT.write(point)


# while loop reading the sensor data until it reaches 2nd "\n", otherwise handles json error (see list in send_back() in pico.py)
def receive_sensor_list():
    while True:
        try:
            while True:
                sensor_list_with_values = SER.read_until().decode("utf-8")
                sensor_list = json.loads(sensor_list_with_values)
                tsdb(sensor_list)

        except ValueError:
            print("DecodeValueError")


def main():
    sensor_list = get_sensor_list()
    send_sensor_list(sensor_list)
    receive_sensor_list()


if __name__ == "__main__":
    main()