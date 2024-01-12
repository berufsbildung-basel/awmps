import requests, time, serial, os
from influxdb_client_3 import InfluxDBClient3, Point
from dotenv import load_dotenv

ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)

token = os.getenv("token")
org = os.getenv("org")
host = os.getenv("host")
database = os.getenv("database")

client = InfluxDBClient3(host=host, token=token, org=org, database=database, verify_ssl=False)

def get_sensor_list():
    url = "http://localhost:9000/fake.json"
    response = requests.get(url)

    http_req_sensor_tag = "AHT03"
    tag_found = False

    if response.status_code == 200:
        data = response.json()    #parses the json data

        for entry in data:
            sensor_id = entry.get("sensor_id")
            pot_id = entry.get("pot_id")
            sensor_tag = entry.get("sensor_tag")
            sensor_type = entry.get("sensor_type")

            if sensor_tag == http_req_sensor_tag:
                tag_found = True
                return sensor_id, pot_id, sensor_tag, sensor_type
                
        if not tag_found:
            print("Sensor not found")
    elif response.status_code == 400:
        print("Bad Request")
    else:
        print(f"HTTP error! Status: {response.status_code}")

    return None, None, None, None

resulting_sensor_id, resulting_pot_id, resulting_sensor_tag, resulting_sensor_type = get_sensor_list()


def send_data():
    def send_tag_to_pico(tag):
        ser.write(tag.encode())
        time.sleep(1)

    send_tag_to_pico(resulting_sensor_tag)
    ser.close()
    return send_tag_to_pico


def receive_data():
    def receive_value_from_pico():
        return ser.readline().decode("utf-8").strip()

    received_value = receive_value_from_pico()
    ser.close()
    return received_value


def write_to_tsdb():

    measurement = "testing_measurement"
    sensor_id = resulting_sensor_id
    pot_id = resulting_pot_id
    sensor_tag = resulting_sensor_tag
    sensor_type = resulting_sensor_type

    data_point = {
    "point": {
        "sensor_id" : sensor_id,
        "pot_id" : pot_id,
        "sensor_tag" : sensor_tag,
        "sensor_type" : sensor_type,
        "value" : receive_data(),
    }
    }

    for key in data_point:
        point = (
            Point(measurement) #measurement
            .tag("sensor_id", data_point[key]["sensor_id"])
            .tag("pot_id", data_point[key]["pot_id"])
            .tag("sensor_tag", data_point[key]["sensor_tag"])
            .tag("sensor_type", data_point[key]["sensor_type"])
            .field("value", data_point[key]["value"])
        )

        client.write(point)


get_sensor_list()
send_data()
write_to_tsdb()
