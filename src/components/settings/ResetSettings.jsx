import React, { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

function ResetSettings() {
    const { setTheme, setVolume, setTimer, setEnableSounds } = useContext(SettingsContext);

    const defaultSettings = () => {
        setTheme("light");
        setVolume(100);
        setTimer(1500);
        setEnableSounds(true);

        localStorage.setItem("theme", "light");
        localStorage.setItem("volume", 100);
        localStorage.setItem("timer", 1500);
        localStorage.setItem("enableSounds", "true");
    };

    return (
        <button className="reset-settings" onClick={defaultSettings}>
            Reset Settings
        </button>
    );
}

export default ResetSettings;
