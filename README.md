# Focus Timer App Documentation

## Overview

The Focus Timer App is a productivity tool designed to help users stay focused and track their progress. It features a timer, achievement system, sound controls, and statistics tracking.

### Features

* **Focus Timer**: Start a timer to help you focus on a task. When the timer runs out, you'll receive an alert and the timer resets.
* **Achievement System**: Track your progress with various achievements based on how many focus sessions you complete.
* **Sound Control**: Toggle sound settings for timer alerts.
* **Statistics**: View statistics for total focus time, number of sessions completed, and number of times the timer was stopped.
* **Achievements Reset**: Reset all achievements with a confirmation prompt.

## How It Works

### Timer Functionality

* **Start Timer**: The timer is initially set to 25 minutes (or your desired session time). You can start it by clicking the "Start" button.
* **Focus Mode**: During the focus period, the app will count down from the timer until it reaches zero.
* **Timer Finished**: Once the timer reaches zero, an alert is triggered, and the timer resets to the initial time. You can track your completed sessions and stop the timer manually.
* **Sounds**: When the timer ends, an audio alert is played unless sounds are disabled in the settings.

### Achievement System

* **Unlock Achievements**: Completing focus sessions unlocks achievements. Each achievement is unlocked by completing a certain number of focus sessions.
* **Achievement Reset**: You can reset all achievements with a confirmation prompt. This action cannot be undone.

### Statistics

The app tracks the following statistics:

* **Total Focus Time**: Displays the total time spent on focus sessions.
* **Total Times Stopped**: Displays how many times the timer has been stopped.
* **Total Achievements**: Shows the number of unlocked achievements.

### Sound Controls

* **Mute Sound**: A checkbox allows you to enable or disable sound for the app's alerts. If disabled, no sound will be played at the end of the timer.

## Setup & Installation

To set up the app locally, follow these steps:

1. **Clone the Repository**: `git clone https://github.com/yourusername/focus-timer-app.git`
2. **Navigate to the Project Directory**: `cd focus-timer-app`
3. **Install Dependencies**: `npm install`
4. **Run the App**: `npm start`

The app will open in your default web browser.

## Technologies Used

* **React**: A JavaScript library for building user interfaces.
* **React Context API**: For managing global state such as achievements, sound settings, and timer states.
* **Recharts**: A charting library used to display statistics visually (currently commented out in the code).
* **Local Storage**: Used to persist data such as achievements, focus sessions, and statistics across sessions.