import { useState, useEffect, useRef } from "react";

const useFocusTimer = () => {
    const [timer, setTimer] = useState(1500); // Default value of 1500 (25 minutes)
    const [inputValue, setInputValue] = useState(""); // User input time
    const [timerState, setTimerState] = useState(false); // Timer running state
    const [timerStateDisplay, setTimerStateDisplay] = useState("Start"); // Display text for start/stop button
    const [alertTimer, setAlertTimer] = useState(""); // Alert timer state
    const [trackNavbar, setTrackNavbar] = useState("navbar"); //navbar not updating FIX


    useEffect(() => {
        setTrackNavbar(timerState ? "navbar-focus" : "navbar");
    }, [timerState]);

    
    useEffect(() => {
        console.log("trackNavbar updated:", trackNavbar);
    }, [trackNavbar]);
    


    const trackButton = timerState ? "stop-button" : "start-button"; // Class for start/stop button

    const handleInputChange = (e) => {
        const inputValue = e.target.value; // Get input value

        // Check if the value is a valid number and not negative
        if (inputValue < 0) {
            alert("Please enter a positive number");
        } else {
            setInputValue(inputValue); // Update input value as user types
        }
    };

    const alarmAudio = useRef(new Audio('/alarm.mp3'));
    
    useEffect(() => {
        // If timerState is true, decrement timer every second
        if (!timerState || timer < 0) return;
        
        const interval = setInterval(() => {
            setTimer(prevTime => {
                // When timer hits 0, reset it to the original value and change the display text back to the default state
                if (prevTime <= 0) {
                    clearInterval(interval);
                    setTimerState(false);
                    alarmAudio.current.play();
                    setAlertTimer("Timer Finished!");
                    setTimerStateDisplay("Start");
                    return 1500; // Returns to 25 mins
                }
                return prevTime - 1;
            });
        }, 1000); // 1 second

        // Clear interval when it finishes
        return () => clearInterval(interval);
    }, [timerState]);

    // Start/Stop timer
    const start = () => {
        setTimerStateDisplay("Stop");
        if (timerState) { //if true (on) change to false (off)
            setTimerStateDisplay("Start");
            setTimerState(false);
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
        setTimer(1500);
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
        trackNavbar,
        handleInputChange,
        start,
        reset,
        formatTime
    };
};

export default useFocusTimer;
