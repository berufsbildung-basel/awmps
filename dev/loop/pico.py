import time, json, serial, random, os
from dotenv import load_dotenv

load_dotenv()

PORT = os.getenv('portPico')
BAUDRATE = os.getenv('baudrate')
SER = serial.Serial(PORT, BAUDRATE)

# sends the list with the sensors and its values back to the microcontroller
def sendBack(list):
    list = "\n" + list + "\n"
    SER.write(list.encode('utf-8'))


# processes(reads) the values from the sensors every 10s and appends the values to the dictionary of each of the sensors and appends the dictionaries to a list which is used by the sendBack function
def loop(sensorList):
    while True:
        sendListBack = []
        for sensor in sensorList:
            sensorType = sensor.get('sensorType')

            if sensorType == 'light':
                value = int((random.uniform(0, 10)))
            elif sensorType == 'airHumidity':
                value = int((random.uniform(10, 20)))
            elif sensorType == 'airTemperature':
                value = int((random.uniform(20, 30)))
            elif sensorType == 'soilMoisture':
                value = int((random.uniform(30, 40)))
            elif sensorType == 'soilTemperature':
                value = int((random.uniform(40, 50)))
            elif sensorType == 'waterFlow':
                value = int((random.uniform(50, 60)))
            elif sensorType == 'valve':
                value = int((random.uniform(0, 2)))
            else:
                value = None

            sensor["value"] = value
            sendListBack.append(sensor)

        sendJsonListBack = json.dumps(sendListBack)
        
        print(sendJsonListBack + "\n") ### remove later
        sendBack(sendJsonListBack)

        time.sleep(10)


# receives the sensor list - parses the json string to an object - calls the loop function - handles error if nothing comes from the serial
def readSensorList():
    time.sleep(3)
    try:
        sensorListStr = SER.read_all().decode('utf-8').strip()
        sensorList = json.loads(sensorListStr)
        loop(sensorList)

    except ValueError:
        print("DecodeValueError")


def main():
        readSensorList()

if __name__ == "__main__":
    main()