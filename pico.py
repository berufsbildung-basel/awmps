import time, json, serial, random, threading

PORT = '/dev/ttys003'
SER = serial.Serial(PORT, 9600)


def read_sensor_list():
    time.sleep(2)
    sensor_list_str = SER.read_all().decode('utf-8').strip()
    sensor_list = json.loads(sensor_list_str)
    print(sensor_list)
    return sensor_list

# def send_back(value):
#     SER.write(f"{value}".encode())

def loop():
    while True:
        for item in read_sensor_list():
            sensor_type = item.get('sensor_type')

            if sensor_type == 'light':
                value = "200"
            elif sensor_type == 'air_temperature':
                value = int((random.uniform(10, 30)))
            elif sensor_type == 'air_humidity':
                value = int((random.uniform(30, 40)))
            elif sensor_type == 'moisture':
                value = "10"
            elif sensor_type == 'soil_temperature':
                value = "23"
            elif sensor_type == 'water_flow':
                value = "20"
            elif sensor_type == 'valve':
                value = "0"
            else:
                value = None
            
            # item["value"] = value
            print(value)
            # values_list.append(item)
            # send_back(item)


        # print(values_list)
        # return values_list

def main():
    try:
        threading.Thread(target=read_sensor_list, daemon=True).start()
        threading.Thread(target=loop, daemon=True).start()
        
        while True:
            time.sleep(1)
    finally:
        SER.close()

if __name__ == "__main__":
    main()