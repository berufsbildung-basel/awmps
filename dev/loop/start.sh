#!/bin/bash

kill $(lsof -t -i :9000)

> pids.txt

(cd ../http && python3 -m http.server 9000) & echo $! >> pids.txt

sleep 2

python3 microcontroller.py & echo $! >> pids.txt
python3 pico.py & echo $! >> pids.txt