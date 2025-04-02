import { createContext, useState, useEffect, useRef } from "react";

const SettingsContext = createContext(null);

// This is the context provider for anything that's wrapped around it.
const SettingsProvider = ({ children }) => {
    const [colorTheme, setColorTheme] = useState(() => localStorage.getItem("colorTheme") || "light"); // Light or dark mode
    const [volume, setVolume] = useState(() => Number(localStorage.getItem("volume")) || 100); // Default volume is 100%
    const [timer, setTimer] = useState(() => Number(localStorage.getItem("timer")) || 1500); // Default timer is set to 25 mins
    const [resetTimer, setResetTimer] = useState(() => Number(localStorage.getItem("resetTimer")) || 1500); // Default reset timer that changes for dynamic reset timer
    const [enableSounds, setEnableSounds] = useState(() => localStorage.getItem("enableSounds") === "true"); // Default is true/enabled
    const [visibility, setVisibility] = useState("") // Visibility state for some usecases if i need to hide something
    const [progressBarState, setProgressBarState] = useState(false); // State for the progress bar
    const [showTutorial, setShowTutorial] = useState(false); // Show tutorial state
    const [hasSeenTutorial, setHasSeenTutorial] = useState(() => {
        return JSON.parse(localStorage.getItem("hasSeenTutorial")) || false;
    });
    const [isOnBreak, setIsOnBreak] = useState(() => { // Prevents the timer from going back to false when the state is true if the user refreshess the page
        const storedState = localStorage.getItem("isOnBreak");
        return storedState ? JSON.parse(storedState) : false;
    });

    // Save changes to localStorage
    // Might need to rework everything here, make arrays instead of single key and values, but that's if i have time
    useEffect(() => {
        localStorage.setItem("colorTheme", colorTheme);
    }, [colorTheme]); 

    useEffect(() => {
        localStorage.setItem("volume", volume);
    }, [volume]);

    useEffect(() => {
        localStorage.setItem("timer", timer);
    }, [timer]);

    useEffect(() => {
        localStorage.setItem("enableSounds", enableSounds);
    }, [enableSounds]);

    useEffect(() => {
        localStorage.setItem("resetTimer", resetTimer);
    }, [resetTimer]);

    useEffect(() => {
        localStorage.setItem("progressBarState", progressBarState);
    }, [progressBarState]);

    useEffect(() => {
        localStorage.setItem("isOnBreak", isOnBreak);
    }, [isOnBreak]);

    useEffect(() => {
        localStorage.setItem("hasSeenTutorial", (hasSeenTutorial));
    }, [hasSeenTutorial]);
    
    const toggleTheme = () => {
        setColorTheme((prev) => prev === "light" ? "dark" : "light");
    };

    const toggleVisibility = () => {
        setVisibility((prev) => prev === "" ? "hidden" : "");
    };

    const toggleSounds = () => {
        setEnableSounds((prev) => !prev);
    }

    const toggleBreak = () => {
        setIsOnBreak((prev) => !prev);
    }

    const tutorialFirstTimeCheck = () => {
        if (hasSeenTutorial) {
            // Return if the tutorial has been seen before
            return;
        } else {
            setHasSeenTutorial(true);
            setShowTutorial(true)
        }
    };
    
    // Gets the audiopath and plays it
    const playAudio = (audioPath) => {
        const audio = new Audio(audioPath);
    
        // Set audio properties
        audio.currentTime = 0;
        audio.muted = !enableSounds;
        audio.volume = volume / 100;
    
        // Play the audio
        audio.play().catch(err => console.error('Audio play failed:', err));

        // Reset the audio currentTime when the audio ends. Super important function to prevent delay and makes it spamable
        const resetAudio = () => {
            audio.currentTime = 0; // Reset to start
            audio.removeEventListener('ended', resetAudio); // Clean up the event listener
        };

        audio.addEventListener('ended', resetAudio);
    };

    return ( // gives context to the child components
        <SettingsContext.Provider value={{ colorTheme, setColorTheme, toggleTheme, volume, setVolume, timer, setTimer, resetTimer, isOnBreak, toggleBreak, progressBarState, setProgressBarState, setResetTimer, enableSounds, setEnableSounds, toggleSounds, visibility, toggleVisibility, playAudio, tutorialFirstTimeCheck, hasSeenTutorial, showTutorial, setShowTutorial}}>
            {children}
        </SettingsContext.Provider>
    );
};

export { SettingsContext, SettingsProvider };

