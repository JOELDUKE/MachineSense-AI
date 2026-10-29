# System Architecture

## Overview

The MachineSense AI architecture is designed to retrofit existing industrial machines with smart monitoring capabilities. The system collects real-time sensor data, securely transfers it to a cloud platform, and uses an AI Prediction Engine to analyze machine health and generate maintenance recommendations. The processed information is then displayed through a Smart Factory Dashboard, enabling factory owners to make informed maintenance decisions.

---

## System Architecture Diagram

![MachineSense AI System Architecture](../assets/images/system_architecture.png)

---

## Workflow

The overall workflow of the system is shown below.

```
Machine
   │
   ▼
Sensors
(Temperature • Vibration • Current)
   │
   ▼
ESP32
   │
   ▼
Wi-Fi / MQTT
(IoT Communication)
   │
   ▼
Cloud Platform
(Firebase Realtime Database)
   │
   ▼
AI Prediction Engine
   │
   ├── Health Score
   ├── Failure Probability
   ├── Remaining Useful Life (RUL)
   └── Maintenance Recommendation
   │
   ▼
Smart Factory Dashboard
   │
   ▼
Maintenance Decision
```

---

## Component Description

**Machine**

The industrial machine being monitored for its operating condition.

**Sensors**

Temperature, vibration, and current sensors continuously collect real-time machine data.

**ESP32**

Acts as the IoT controller by collecting sensor readings and transmitting them to the cloud.

**Wi-Fi / MQTT**

Provides IoT communication between the ESP32 and the cloud platform.

**Cloud Platform (Firebase Realtime Database)**

Stores sensor readings, machine history, AI predictions, health scores, and maintenance alerts.

**AI Prediction Engine**

Processes real-time and historical sensor data to detect anomalies, estimate failure probability, calculate the machine health score, predict Remaining Useful Life (RUL), and generate actionable maintenance recommendations.

**Smart Factory Dashboard**

Displays live sensor values, machine health, AI insights, alerts, and energy usage for the factory owner.

**Maintenance Decision**

Based on AI recommendations, maintenance personnel can schedule preventive maintenance before an unexpected machine failure occurs.