import os, requests, serial, json
from influxdb_client_3 import InfluxDBClient3, Point
from dotenv import load_dotenv

load_dotenv()

INFLUX_TOKEN = os.getenv('token')
INFLUX_ORG = os.getenv('org')
INFLUX_HOST = os.getenv('host')
INFLUX_DATABASE = os.getenv('database')
INFLUX_MEASUREMENT = os.getenv('measurement')
INFLUX_CLIENT = InfluxDBClient3(host = INFLUX_HOST, token = INFLUX_TOKEN, org = INFLUX_ORG, database = INFLUX_DATABASE, verify_ssl = False)
API_URL = os.getenv('apiURL')
PORT = os.getenv('portMicrocontroller')
BAUDRATE = os.getenv('baudrate')
SER = serial.Serial(PORT, BAUDRATE)


# get json and store in list and return it
def getSensorList():
    sensorList = []
    response = requests.get(API_URL)
    data = response.json()

    if response.status_code != 200:
        return sensorList
    
    for item in data:
        sensorList.append(item)

    return json.dumps(sensorList)


# write sensor list to pico
def sendSensorList(sensorList):
    try:
        SER.write(f"{sensorList}".encode('utf-8'))
    
    finally:
        with serial.Serial(PORT, BAUDRATE) as ser:
            x = ser.read()


# read the sensor list values one by one and writes them to the tsdb by making data points
def tsdb(sensorList):
    for sensor in sensorList:
        sensorID = sensor.get("sensorID")
        potID = sensor.get("potID")
        zoneID = sensor.get("zoneID")
        sensorType = sensor.get("sensorType")
        value = sensor.get("value")


        dataPoint = {
        "point": {
            "sensorID" : sensorID,
            "potID" : potID,
            "zoneID" : zoneID,
            "sensorType" : sensorType,
            "value" : value,
        }
        }

        print(dataPoint)
        for key in dataPoint:
            point = (
                Point(INFLUX_MEASUREMENT)
                .tag("sensorID", dataPoint[key]["sensorID"])
                .tag("potID", dataPoint[key]["potID"])
                .tag("zoneID", dataPoint[key]["zoneID"])
                .tag("sensorType", dataPoint[key]["sensorType"])
                .field("value", dataPoint[key]["value"])
            )

            INFLUX_CLIENT.write(point)


# while loop reading the sensor data until it reaches 2nd "\n", otherwise handles json error (see list in send_back() in pico.py)
def receiveSensorList():
    while True:
        try:
            while True:
                sensorListWithValues = SER.read_until().decode("utf-8")
                sensorList = json.loads(sensorListWithValues)
                tsdb(sensorList)

        except ValueError:
            print("DecodeValueError")


def main():
    sensorList = getSensorList()
    sendSensorList(sensorList)
    receiveSensorList()


if __name__ == "__main__":
    main()