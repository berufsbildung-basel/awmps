from machine import Pin, UART
import time

uart = UART(0, baudrate=9600, tx=Pin(0), rx=Pin(1))
led = Pin("LED", Pin.OUT)

def send_data_to_pi(value):
    uart.write(str(value).encode())
    time.sleep(1)

received_data = ""
length = 3
count = 0

while not uart.any():
    time.sleep(0.1)
received_data = uart.readline().decode("utf-8").strip()

if received_data == "L01":
    print("Light 01")
elif received_data == "AHT03":
    while count < length:
        count = count + 1
        led.on()
        send_data_to_pi(1)
        time.sleep(count)

        led.off()
        send_data_to_pi(0)
        time.sleep(count)

uart.deinit()
