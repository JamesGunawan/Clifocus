import { useState, useEffect, useRef, useContext } from "react";

// Context APIs
import { SettingsContext } from '../../context/SettingsContext';
import { NotificationContext } from "../../context/NotificationContext";
import { StatisticsContext } from "../../context/StatisticsContext";

const useFocusTimer = () => {
    const {timer, setTimer, resetTimer, setResetTimer, volume, enableSounds, setProgressBarState, isOnBreak, toggleBreak } = useContext(SettingsContext);
    const { checkStatisticsAvailability, updateStatistics, displayStatistics, convertTotalTimeTracker, getTodaysDate} = useContext(StatisticsContext);
    const { achievementNotification} = useContext(NotificationContext);
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
        // Display statistics 
        const totalFinish = displayStatistics("times-finished");
        const totalStopped = displayStatistics("times-stopped");
    
        // Get the current achievements state
        const achievements = JSON.parse(localStorage.getItem("achievements")) || initialAchievements;
    
        // Helper function to trigger achievement notification and to make sure the achievement doesn't trigger multiple times
        const triggerAchievement = (id, rarity) => {
            // Check if the achievement is not unlocked yet
            if (!achievements.find(achievement => achievement.id === id && achievement.unlocked)) {
                achievementNotification(rarity, id); // Handle achievement unlock and notification
            }
        };
    
        // Check and trigger achievements based on finish count
        if (totalFinish == 1) {
            triggerAchievement(1, "common");
        }
        if (totalFinish == 5) {
            triggerAchievement(2, "common");
        }
        if (totalFinish == 25) {
            triggerAchievement(3, "common");
        }
    
        // Check and trigger achievements based on stop count
        if (totalStopped == 1) {
            triggerAchievement(4, "common");
        }
        if (totalStopped == 25) {
            triggerAchievement(5, "common");
        }
        if (totalStopped == 100) {
            triggerAchievement(6, "rare");
        }
    };
    

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
    
                        // Update local storage
                        updateStatistics("times-finished", 1)
                    }
    
                    return isOnBreak ? resetTimer : 300; // Switch between work & break
                }

                return prevTime - 1; // Decrement timer every second
            });
            updateStatistics("total-time-tracker", 1)
            convertTotalTimeTracker();
        }, 1000);
    
        // Cleanup function: Clears interval and resets hasUpdatedRecord on unmount
        return () => {
            clearInterval(interval);
            hasUpdatedRecord.current = false; // Reset to allow proper execution on next timer run
        };
    
    }, [timerState, volume, enableSounds, isOnBreak ]);

    // Start/Stop timer
    const start = () => {
        getTodaysDate();
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
