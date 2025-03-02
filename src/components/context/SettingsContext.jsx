import { createContext, useState, useEffect } from "react";

// Creating the context
const SettingsContext = createContext(null);

// This is the context provider for anything that's wrapped around it.
const SettingsProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light"); // Light or dark mode
    const [volume, setVolume] = useState(() => Number(localStorage.getItem("volume")) || 100); // Default volume is 100%
    const [timer, setTimer] = useState(() => Number(localStorage.getItem("timer")) || 1500); // Default timer is set to 25 mins
    const [enableSounds, setEnableSounds] = useState(() => localStorage.getItem("enableSounds") === "true"); // Default is true/enabled

    // Save changes to localStorage
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("volume", volume);
    }, [volume]);

    useEffect(() => {
        localStorage.setItem("timer", timer);
    }, [timer]);

    useEffect(() => {
        localStorage.setItem("enableSounds", enableSounds);
    }, [enableSounds]);

    const toggleTheme = () => {
        setTheme((prev) => prev === "light" ? "dark" : "light");
    };

    const toggleSounds = () => {
        setEnableSounds((prev) => !prev);
    }

    return ( // gives context to the child components
        <SettingsContext.Provider value={{ theme, setTheme, toggleTheme, volume, setVolume, timer, setTimer, enableSounds, setEnableSounds, toggleSounds }}>
            {children}
        </SettingsContext.Provider>
    );
};

export { SettingsContext, SettingsProvider };
