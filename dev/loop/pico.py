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
                value = round(float(random.uniform(0, 10)), 1)
            elif sensorType == 'airHumidity':
                value = round(float(random.uniform(10, 20)), 1)
            elif sensorType == 'airTemperature':
                value = round(float(random.uniform(20, 30)), 1)
            elif sensorType == 'soilMoisture':
                value = round(float(random.uniform(30, 40)), 1)
            elif sensorType == 'soilTemperature':
                value = round(float(random.uniform(40, 50)), 1)
            elif sensorType == 'waterFlow':
                value = round(float(random.uniform(50, 60)), 1)
            elif sensorType == 'valve':
                value = round(float(random.uniform(0, 1)), 0)
            else:
                value = None

            sensor["value"] = value
            sendListBack.append(sensor)

        sendJsonListBack = json.dumps(sendListBack)
        
        sendBack(sendJsonListBack)

        time.sleep(10)


# receives the sensor list - parses the json string to an object - calls the loop function - handles errors
def readSensorList():
    time.sleep(3)
    while True:
        try:
            while True:
                sensorListStr = SER.read_until().decode('utf-8')
                print(f"Received raw data: {sensorListStr}")
                
                if not sensorListStr:
                    print("No data received or data is empty.")
                    return
                
                sensorList = json.loads(sensorListStr)
                loop(sensorList)

        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            print("Received data might be incomplete or corrupted.")

def main():
    readSensorList()


if __name__ == "__main__":
    main()