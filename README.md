# MachineSense AI

## Introduction

MachineSense AI is an Industry 4.0 retrofit solution designed to transform conventional industrial machines into smart, AI-enabled machines using low-cost IoT sensors and predictive analytics. Instead of replacing existing machinery, the system continuously monitors machine health, analyzes real-time operating data, predicts potential failures, and provides maintenance recommendations through a Smart Factory Dashboard.

The project is specifically developed for Micro, Small, and Medium Enterprises (MSMEs), enabling them to adopt predictive maintenance at an affordable cost. By detecting machine issues before they become critical failures, MachineSense AI helps reduce unplanned downtime, lower maintenance costs, improve equipment reliability, and increase overall operational efficiency.

---

## Problem Statement

Many MSMEs continue to rely on conventional industrial machines that lack real-time monitoring and predictive maintenance capabilities. As a result, machine faults are often detected only after a breakdown occurs, leading to unexpected production downtime, increased repair costs, delayed deliveries, higher energy consumption, and reduced productivity.

Although Industry 4.0 technologies provide advanced predictive maintenance solutions, they usually require significant investment in new equipment, software, and supporting infrastructure. These costs make such solutions difficult for many MSMEs to adopt.

For a detailed discussion of the problem, refer to **docs/ProblemStatement.md**.

---

## Proposed Solution

MachineSense AI provides an affordable IoT retrofit solution that upgrades existing industrial machines with smart monitoring capabilities. The system continuously collects machine data such as temperature, vibration, and power consumption through IoT sensors. The collected information is transmitted to a cloud platform where an AI Prediction Engine analyzes the data, detects abnormal operating conditions, estimates failure probability, calculates machine health scores, and generates actionable maintenance recommendations.

The processed information is displayed through a Smart Factory Dashboard, enabling factory owners and maintenance personnel to monitor machine health in real time and take preventive maintenance actions before unexpected failures occur.

For more details, refer to **docs/Solution.md**.

---

## Key Features

- Real-time machine health monitoring
- Temperature monitoring
- Vibration analysis
- Power consumption monitoring
- AI-based predictive maintenance
- Machine Health Score
- Failure Probability Estimation
- Remaining Useful Life (RUL) Estimation
- Smart Factory Dashboard
- Preventive maintenance recommendations
- Maintenance alerts and notifications
- Cloud-based data storage
- Multi-machine monitoring support

---

## Technology Stack

### Hardware

- ESP32 Microcontroller
- DS18B20 Temperature Sensor
- SW-420 / MPU6050 Vibration Sensor
- ACS712 Current Sensor
- Breadboard
- Jumper Wires

### Software

- HTML
- CSS
- JavaScript
- Firebase Realtime Database
- MQTT Protocol
- Figma
- Draw.io
- Git & GitHub

---

## System Workflow

The MachineSense AI system follows a simple workflow for monitoring industrial machines:

Machine

↓

IoT Sensors

↓

ESP32

↓

Wi-Fi / MQTT

↓

Cloud Platform (Firebase Realtime Database)

↓

AI Prediction Engine

↓

Smart Factory Dashboard

↓

Maintenance Decision

The AI Prediction Engine processes both real-time and historical sensor data to estimate machine health, detect anomalies, predict possible failures, and recommend preventive maintenance actions.

---

## Documentation

Detailed project documentation is available in the **docs/** folder.

- ProblemStatement.md
- Solution.md
- Hardware.md
- SystemArchitecture.md
- UserFlow.md
- Installation.md
- FutureScope.md

---

## Future Scope

The current prototype can be extended with several advanced features to improve its functionality and industrial applicability. Planned enhancements include:

- WhatsApp, Email, and SMS notifications
- Mobile application for remote monitoring
- Edge AI deployment on ESP32
- Digital Twin visualization
- Multiple factory support
- ERP integration
- QR code-based machine history
- Advanced analytics and reporting

---

## Team Members

- Your Name
- Team Member 2
- Team Member 3
- Team Member 4

---

## Conclusion

MachineSense AI demonstrates how IoT and Artificial Intelligence can make predictive maintenance affordable and accessible for MSMEs. By retrofitting existing industrial machines instead of replacing them, the system enables manufacturers to monitor machine health in real time, reduce maintenance costs, minimize unplanned downtime, and improve operational efficiency. The project provides a practical step toward Industry 4.0 adoption while remaining cost-effective and scalable for small and medium-sized industries.

---