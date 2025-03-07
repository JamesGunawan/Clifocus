import { useState, useEffect, useRef, useContext } from "react";
import { checkStopAvailabilty, checkTimesAvailability } from "../statistics/SessionStats";
import { SettingsContext } from "../context/SettingsContext";
import { NotificationContext } from "../context/NotificationContext";

const useFocusTimer = () => {
    const {timer, setTimer, resetTimer, setResetTimer, volume, enableSounds } = useContext(SettingsContext);
    const { achievementNotification } = useContext(NotificationContext);
    const [inputValue, setInputValue] = useState(""); // User input time
    const [timerState, setTimerState] = useState(false); // Timer running state
    const [timerStateDisplay, setTimerStateDisplay] = useState("Start"); // Display text for start/stop button
    const [alertTimer, setAlertTimer] = useState(""); // Alert timer state
    
    const trackButton = timerState ? "stop-button" : "start-button"; // Class for start/stop button

    const handleInputChange = (e) => {
        const inputValue = e.target.value; // Get input value

        // Check if the value is a valid number and not negative
        if (inputValue < 0) {
            alert("Please enter a positive number");
        } else {
            setTimer(inputValue); // Update input value as user types
            setResetTimer(inputValue)
        }
    };

    const achievementHandler = () => {
        const totalFinish = localStorage.getItem("times-finished")
        if(totalFinish == 1) {
            achievementNotification(1); // First achievement (if user has finished at least one session)
        } if(totalFinish == 5) {
            achievementNotification(2); // Second achievement (if user has finished at least 5 sessions)
        } if(totalFinish == 25) {
            achievementNotification(3); // Third achievement (if user has finished at least 25 sessions)
        } else {
            return;
        }
    }

    const alarmAudio = useRef(new Audio('/alarm.mp3')); // Audio for alarm sound

    const hasMounted = useRef(false); // Prevents useEffect from running twice in Strict Mode
    const hasUpdatedRecord = useRef(false); // Ensures completion logic runs only once per timer
    
    useEffect(() => {
        if (!hasMounted.current) {
            checkTimesAvailability(); // Checks if tracker exists in local storage
            checkStopAvailabilty();
            hasMounted.current = true;
        }
    
        // Exit early if the timer is not active or has an invalid value
        if (!timerState || timer < 0) return;
    
        const interval = setInterval(() => {
            setTimer(prevTime => {
                // When timer reaches 0, handle completion logic
                if (prevTime <= 0) {
                    clearInterval(interval); // Stops the interval
                    setTimerState(false); // Stops the timer
    
                    // Prevent double execution using hasUpdatedRecord
                    if (!hasUpdatedRecord.current) {
                        hasUpdatedRecord.current = true; // Mark as executed
    
                        // Configure and play the alarm sound
                        alarmAudio.current.muted = !enableSounds;
                        alarmAudio.current.volume = volume / 100;
                        alarmAudio.current.play();
    
                        setAlertTimer("Timer Finished!"); // Updates the alert message
                        setTimerStateDisplay("Start"); // Resets the button display text
    
                        // Updates local storage safely (prevents NaN issues)
                        const updateRecord = parseInt(localStorage.getItem("times-finished")) || 0;
                        localStorage.setItem("times-finished", updateRecord + 1);
    
                        achievementHandler(); // Checks if any achievements are completed
                        
                    }
    
                    return resetTimer; // Resets to 25 mins (or configured reset time)
                }
    
                return prevTime - 1; // Decrement timer every second
            });
        }, 1000);
    
        // Cleanup function: Clears interval and resets hasUpdatedRecord on unmount
        return () => {
            clearInterval(interval);
            hasUpdatedRecord.current = false; // Reset to allow proper execution on next timer run
        };
    
    }, [timerState, volume, enableSounds]);
    


    // Start/Stop timer
    const start = () => {
        setTimerStateDisplay("Stop");
        if (timerState) { //if true (on) change to false (off)
            setTimerStateDisplay("Start");
            setTimerState(false);
            const updateRecord = parseInt(localStorage.getItem("times-stopped"));
            localStorage.setItem("times-stopped", updateRecord + 1);
            return;
        }
        
        // Check if the input value is a valid number and not negative 
        const countdown = inputValue && inputValue > 0 ? Number(inputValue) : timer;
        setAlertTimer("");
        setTimer(countdown);
        setTimerState(true);
        
        // Clear the input field when start is clicked
        setInputValue("");
    };

    // Reset timer
    const reset = () => {
        setTimerState(false);
        setTimerStateDisplay("Start");
        setTimer(resetTimer);
        setAlertTimer("");
        
    };

    // Time Formatter
    // Converts countdown to hours, minutes, and seconds
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600); // Get the hours part
        const minutes = Math.floor((seconds % 3600) / 60); // Get the minutes part
        const remainingSeconds = seconds % 60; // Get the seconds part

        // Ensure two digits for minutes and seconds (e.g., 1:01 instead of 1:1)
        return `${hours > 0 ? hours + ':' : ''}${minutes < 10 && hours > 0 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };



    return {
        timer,
        inputValue,
        timerStateDisplay,
        alertTimer,
        trackButton,
        handleInputChange,
        start,
        reset,
        formatTime
    };
};

export default useFocusTimer;
