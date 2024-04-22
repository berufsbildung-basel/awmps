import os, requests, serial, time, subprocess, json
from influxdb_client_3 import InfluxDBClient3, Point
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv('token') # type: ignore
ORG = os.getenv('org') # type: ignore
HOST = os.getenv('host') # type: ignore
DATABASE = os.getenv('database') # type: ignore
MEASUREMENT = "integration_test_measurement"
CLIENT = InfluxDBClient3(host = HOST, token = TOKEN, org = ORG, database = DATABASE, verify_ssl = False)

API_URL = "http://localhost:9000/fake.json"

PORT = '/dev/ttys008'
SER = serial.Serial(PORT, 19200)


### get json and store in list and return it
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
        with serial.Serial(PORT, 19200) as ser:
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
                Point(MEASUREMENT)
                .tag("sensor_id", data_point[key]["sensor_id"])
                .tag("pot_id", data_point[key]["pot_id"])
                .tag("sensor_type", data_point[key]["sensor_type"])
                .field("value", data_point[key]["value"])
            )

            CLIENT.write(point)


# while loop reading the sensor data until it reaches "\n", otherwise handles json error
# 2 while loops required because we send the sensor list with values by doing this: list = "\n" + list + "\n", this way we handle the first "\n" as an error and the second is required for the read_until()
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