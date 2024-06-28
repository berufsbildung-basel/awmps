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


# gets sensors list from endpoint and stores it in a list and returns it
def getSensorList():
    sensorList = []
    response = requests.get(API_URL)
    data = response.json()

    if response.status_code != 200:
        return sensorList
    
    for item in data:
        sensorList.append(item)

    return json.dumps(sensorList)


# writes the sensor list to the pico
def sendSensorList(sensorList):
    try:
        sensorList = "\n" + sensorList + "\n"
        SER.write(sensorList.encode('utf-8'))
    
    finally:
        with serial.Serial(PORT, BAUDRATE) as ser:
            x = ser.read()


# reads the sensor list including it's values and writes them to the tsdb 1 by 1 through data points
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

        # print(dataPoint)
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


# while loop reads the data 1 by 1 until it reaches "\n" (line break) and calls the function tsdb with the sensor list with the values
def receiveSensorList():
    while True:
        try:
            while True:
                sensorListWithValues = SER.read_until().decode('utf-8')
                sensorList = json.loads(sensorListWithValues)
                tsdb(sensorList)

        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")


def main():
    sensorList = getSensorList()
    sendSensorList(sensorList)
    receiveSensorList()


if __name__ == "__main__":
    main()