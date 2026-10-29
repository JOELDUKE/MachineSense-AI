# Hardware Components
## Overview

MachineSense AI uses a low-cost IoT hardware setup to monitor the health of existing industrial machines. The selected components collect real-time machine data, which is used for monitoring and AI-based predictive maintenance.

| Component                | Description                   | Purpose                                                  |
|--------------------------|-------------------------------|----------------------------------------------------------|
| ESP32                    | Wi-Fi enabled microcontroller | Collects sensor data and sends it to the cloud platform. |
|                          |                               |                                                          |
|Temperature Sensor        | Digital temperature sensor    | Measures machine temperature and detects overheating.    |
| (DS18B20)                |                               |                                                          |
|                          |                               |                                                          |
|Vibration Sensor          | Vibration and motion sensor   | Detects abnormal vibration patterns that may             |
(SW-420 / MPU6050)         |                               | indicate machine faults.                                 |
|                          |                               |                                                          |
|Current Sensor (ACS712)   | Current measurement sensor    | Monitors machine power consumption and electrical load.  |
|                          |                               |                                                          |
|Breadboard                | Prototyping board             | Used for assembling and testing the hardware without     |
|                          |                               | soldering.                                               |
|                          |                               |                                                          |
|Jumper Wires              | Connecting wires              | Connect the ESP32 with sensors and other hardware        |
|                          |                               | components.                                              |
|_____________________________________________________________________________________________________________________|
## Hardware Summary

The ESP32 acts as the central controller of the system. It collects data from the temperature, vibration, and current sensors, then transmits the information to the cloud platform through Wi-Fi. This hardware configuration is inexpensive, easy to assemble, and suitable for retrofitting existing industrial machines used by MSMEs.