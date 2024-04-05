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

PORT = '/dev/ttys004'
SER = serial.Serial(PORT, 9600)


### get json and store in list and return it
def get_sensor_information():
    sensor_list = []
    response = requests.get(API_URL)
    data = response.json()


    if response.status_code != 200:
        return sensor_list
    
    for item in data:
        sensor_list.append(item)

    return json.dumps(sensor_list)


### write sensor list to pico
def send_sensor_info_list(sensor_list):
    try:
        SER.write(f"{sensor_list}".encode('utf-8'))
    
    finally:
        with serial.Serial(PORT, 9600) as ser:
            x = ser.read()


# read data that is sent from pico and writes to tsdb
def receive_data_and_write_to_tsdb():
    received_data = SER.read_all().decode("utf-8").strip()

    received_value = json.loads(received_data)

    if received_value == None:
        print("No value received from MC, somethings wrong")
    else:
        print(received_data)
        # for sensor in received_value:
        #     sensor_id = sensor.get("sensor_id")
        #     pot_id = sensor.get("pot_id")
        #     sensor_type = sensor.get("sensor_type")
        #     value = sensor.get("value")

        #     data_point = {
        #     "point": {
        #         "sensor_id" : sensor_id,
        #         "pot_id" : pot_id,
        #         "sensor_type" : sensor_type,
        #         "value" : value,
        #     }
        #     }

        #     for key in data_point:
        #         point = (
        #             Point(MEASUREMENT)
        #             .tag("sensor_id", data_point[key]["sensor_id"])
        #             .tag("pot_id", data_point[key]["pot_id"])
        #             .tag("sensor_type", data_point[key]["sensor_type"])
        #             .field("value", data_point[key]["value"])
        #         )

        #         CLIENT.write(point)
    
def main():
    sensor_list = get_sensor_information()
    send_sensor_info_list(sensor_list)
    time.sleep(10)
    receive_data_and_write_to_tsdb()

if __name__ == "__main__":
    main()