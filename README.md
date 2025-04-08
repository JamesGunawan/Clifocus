# Focus Timer App Documentation

## Overview

The Focus Timer App is a productivity tool designed to help users stay focused and track their progress. It features a timer, achievement system, sound controls, and statistics tracking.

### Features

* **Focus Timer**: Start a timer to help you focus on a task. When the timer runs out, you'll receive an alert and the timer resets.
* **Achievement System**: Track your progress with various achievements based on how many focus sessions you complete.
* **Personalization Settings**: Configure the app to your preferences with options for dark mode, sound controls (including volume and mute), timer modes (such as Pomodoro and custom), and more.
* **Statistics**: View statistics for total focus time, number of sessions completed, and number of times the timer was stopped.
* **Achievements Reset**: Reset all achievements with a confirmation prompt.
* **Clicker Game**: A mini-game that rewards users with points for each click, providing a fun distraction during breaks.
* **Shop**: A store where users can spend their accumulated points to purchase items, such as custom themes, sound effects, or exclusive features.

## How It Works

### Timer Functionality

* **Start Timer**: The timer is initially set to 25 minutes (or your desired session time). You can start it by clicking the "Start" button.
* **Focus Mode**: During the focus period, the app will count down from the timer until it reaches zero.
* **Timer Finished**: Once the timer reaches zero, an alert is triggered, and the timer resets to the initial time. You can track your completed sessions and stop the timer manually.
* **Sounds**: When the timer ends, an audio alert is played unless sounds are disabled in the settings. This feature can be customized in the Personalization Settings.
* **Break Time**: During this period, the clicker minigame and shop are unlocked, providing users with a fun distraction and opportunities to spend accumulated points.

### Achievement System

* **Unlock Achievements**: Completing focus sessions unlocks achievements. Each achievement is unlocked by completing a certain number of focus sessions.
* **Achievement Reset**: You can reset all achievements with a confirmation prompt. This action cannot be undone.

### Statistics

The app tracks the following statistics:

* **Total Focus Time**: Displays the total time spent on focus sessions, categorized by day, week, and month.
* **Total Times Stopped**: Displays how many times the timer has been stopped.
* **Total Minigame Clicks**: Displays the total number of clicks during the clicker minigame.
* **Total Breaks Skipped**: Displays the total number of breaks skipped.
* **Total Achievements**: Shows the number of unlocked achievements.

### Sound Controls

* **Mute Sound**: A checkbox allows you to enable or disable sound for the app's alerts. If disabled, no sound will be played at the end of the timer.
* **Volume Control**: Adjust the volume of the alert sound.
* **Timer Modes**: Choose from different timer modes (e.g., Pomodoro, Custom).

### Settings 
* **Dark Mode**: Toggle the app's theme between light and dark modes.
* **Custom Timer**: Set a custom timer duration.
* **Sound Controls**:
* **Volume Mute**: Mute the app's sound.
* **Volume Slider**: Adjust the volume of the app's sound.
* **Reset Settings**: Reset all settings to their default values.

## Setup & Installation

To set up the app locally, follow these steps:
```bash
# Clone the repository and navigate to the project directory
git clone https://github.com/yourusername/focus-timer-app.git && cd focus-timer-app

# Install dependencies
npm install

# Run the app
npm run dev
```
The app will open in your default web browser.

## Technologies Used

* **React**: A JavaScript library for building user interfaces, utilized for creating the app's UI components.
* **React Context API**: Employs the Context API for managing global state, including achievements, sound settings, and timer states, ensuring seamless data sharing across components.
* **Vite**: A modern development server and build tool, providing a fast and efficient development experience.
* **Styled Components**: A popular CSS-in-JS solution, used for styling the app's UI components with a focus on maintainability and reusability.
* **Shadcn**: A utility-first CSS framework, utilized for styling the app's UI components with a focus on simplicity and customization.
* **Lucide React Icons**: A set of customizable icons, used for enhancing the app's UI with visually appealing and consistent icons.
* **Recharts**: A charting library, used to display statistics visually, providing users with a clear and concise overview of their progress (currently commented out in the code).
* **Local Storage**: Utilizes the browser's local storage for persisting data, such as achievements, focus sessions, and statistics, across sessions, ensuring a seamless user experience.

## Future Improvements

* **Music Integration**: Integrate a music player that supports Spotify and YouTube, allowing users to import their playlists or use a preset one.
* **Expanded Shop**: Add a wide variety of shop items, including relics, auto-click generators, and exclusive features like themes.
* **Personalizable Themes**: Introduce customizable themes that users can personalize or use a preset one.
* **Additional Timer Designs**: Offer additional timer designs that can be unlocked using premium currency.
* **Task List Feature**: Develop a task list feature that allows users to organize and prioritize their tasks.
* **Mobile App Development**: Explore the possibility of developing the Focus Timer App into a mobile app.
* **Code Refactoring**: Refactor the code to make it more efficient, neater, and maintainable.
* **Database Integration**: Migrate from local storage to a database/server to improve data persistence and scalability.