# Installation Guide

## Overview

This guide explains how to set up and run the MachineSense AI project on your local system. The project consists of an IoT device (ESP32), a backend server, a frontend dashboard, and Firebase for cloud data storage.

---

## Prerequisites

Before starting, make sure the following software is installed:

- Git
- Node.js and npm
- Arduino IDE
- Visual Studio Code
- Firebase Project
- ESP32 Board Package for Arduino IDE

---

## Step 1: Clone the Repository

Clone the project repository to your local machine.

```bash
git clone https://github.com/username/MachineSense-AI.git
cd MachineSense-AI
```

---

## Step 2: Install Frontend Dependencies

Navigate to the frontend folder and install the required packages.

```bash
cd frontend
npm install
```

---

## Step 3: Install Backend Dependencies

Navigate to the backend folder and install the required packages.

```bash
cd ../backend
npm install
```

---

## Step 4: Configure Firebase

- Create a Firebase project.
- Enable Firebase Realtime Database.
- Copy the Firebase configuration details.
- Add the configuration to the frontend and backend as required.

---

## Step 5: Upload ESP32 Firmware

- Open the ESP32 firmware in the Arduino IDE.
- Update the Wi-Fi credentials and Firebase configuration.
- Select the correct ESP32 board and COM port.
- Upload the firmware to the ESP32.

---

## Step 6: Run the Backend Server

Start the backend service.

```bash
npm start
```

---

## Step 7: Run the Frontend Application

Open a new terminal and start the frontend application.

```bash
cd frontend
npm start
```

---

## Verification

After completing the installation:

- Connect the ESP32 to the sensors.
- Verify that sensor data is being uploaded to Firebase.
- Open the Smart Factory Dashboard.
- Confirm that live sensor values are displayed.
- Check that AI predictions and alerts are generated correctly.