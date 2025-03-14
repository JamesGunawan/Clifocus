import { useState, useEffect, useRef, useContext } from "react";
import { SettingsContext } from '../../context/SettingsContext';
import { NotificationContext } from "../../context/NotificationContext";
import { StatisticsContext } from "../../context/StatisticsContext";

const useFocusTimer = () => {
    const {timer, setTimer, resetTimer, setResetTimer, volume, enableSounds, setProgressBarState, isOnBreak, toggleBreak } = useContext(SettingsContext);
    const { checkStatisticsAvailability, updateStatistics } = useContext(StatisticsContext);
    const { achievementNotification } = useContext(NotificationContext);
    const [inputValue, setInputValue] = useState(""); // User input time
    const [timerState, setTimerState] = useState(false); // Timer running state
    const [timerStateDisplay, setTimerStateDisplay] = useState("Start"); // Display text for start/stop button
    const [alertTimer, setAlertTimer] = useState(""); // Alert timer state
    const [reskipButton, setReskipButton] = useState(isOnBreak ? "Skip Break" : "Reset"); // Reskip button state
    
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

    // Tried moving this to the context, it did NOT like it, had issues with the context depending with each other which creates a problem loop
    const achievementHandler = () => {
        const totalFinish = localStorage.getItem("times-finished");
        const totalStopped = localStorage.getItem("times-stopped");
        if(totalFinish == 1) {
            achievementNotification(1); // First achievement (if user has finished at least one session)
        } if(totalFinish == 5) {
            achievementNotification(2); // Second achievement (if user has finished at least 5 sessions)
        } if(totalFinish == 25) {
            achievementNotification(3); // Third achievement (if user has finished at least 25 sessions)
        } if (totalStopped == 1) {
            achievementNotification(4); // Fourth achievement (if user has stopped at least one session)
        } if (totalStopped == 25) {
            achievementNotification(5); // Fifth achievement (if user has stopped at least 5 session)
        } if (totalStopped == 100) {
            achievementNotification(100); // Fourth achievement (if user has stopped at least 100 session)
        }else {
            return;
        }
    }

    const alarmAudio = useRef(new Audio('/alarm.mp3')); // Audio for alarm sound

    const hasMounted = useRef(false); // Prevents useEffect from running twice in Strict Mode
    const hasUpdatedRecord = useRef(false); // Ensures completion logic runs only once per timer
    
    useEffect(() => {
        if (!hasMounted.current) {
            checkStatisticsAvailability(); // Checks if statistics are available    
            hasMounted.current = true;
        }
    
        // Exit early if the timer is not active or has an invalid value
        if (!timerState || timer < 0) return;
    
        const interval = setInterval(() => {
            setTimer(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(interval); // Stop the interval
                    setProgressBarState(false); // Stop progress bar
    
                    if (!hasUpdatedRecord.current) {
                        hasUpdatedRecord.current = true;
    
                        // Play alarm sound
                        alarmAudio.current.muted = !enableSounds;
                        alarmAudio.current.volume = volume / 100;
                        alarmAudio.current.play();
    
                        setTimeout(() => {
                            setTimerState(false);
                            setAlertTimer(isOnBreak ? "Break Finished!" : "Timer Finished!");
                            setTimerStateDisplay("Start");
                            achievementHandler();
                            setReskipButton("Skip Break")
    
                            // If true = finish, else enter break
                            if (isOnBreak) {
                                // If break finishes, go back to work timer
                                toggleBreak();
                                setReskipButton("Reset")
                                setTimer(resetTimer); 
                            } else {
                                // If work timer finishes, start a break
                                toggleBreak();
                                setTimer(300); // Set break time (5 mins default)
                            }
                        }, 0);
    
                        // Update local storage safely
                        const updateRecord = parseInt(localStorage.getItem("times-finished")) || 0;
                        localStorage.setItem("times-finished", updateRecord + 1);
                    }
    
                    return isOnBreak ? resetTimer : 300; // Switch between work & break
                }
    
                return prevTime - 1; // Decrement timer every second
            });
        }, 1000);
    
        // Cleanup function: Clears interval and resets hasUpdatedRecord on unmount
        return () => {
            clearInterval(interval);
            hasUpdatedRecord.current = false; // Reset to allow proper execution on next timer run
        };
    
    }, [timerState, volume, enableSounds, isOnBreak ]);

    // Start/Stop timer
    const start = () => {
        setProgressBarState(true);
        setTimerStateDisplay("Stop");
        if (timerState) { //if true (on) change to false (off)
            setTimerStateDisplay("Start");
            setTimerState(false);
            setProgressBarState(true);
            updateStatistics("times-stopped", 1);
            setProgressBarState(false);
            achievementHandler();
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

        // ONLY applies if on break, else default timer reset
        if(isOnBreak) {
            toggleBreak();
            setReskipButton("Reset");
            setTimer(resetTimer);
            setAlertTimer("Break Skipped!");
            setTimerState(false);
            setTimerStateDisplay("Start");
            setProgressBarState(false);
        } else {
            setTimerState(false);
            setProgressBarState(false);
            setTimerStateDisplay("Start");
            setTimer(resetTimer);
            setAlertTimer("");
        }

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
        reskipButton,
        handleInputChange,
        start,
        reset,
        formatTime
    };
};

export default useFocusTimer;
