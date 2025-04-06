import React, { useContext } from "react";
import { SettingsContext } from '../../context/SettingsContext';

// Reset to default settings
function ResetSettings() {
    const { setColorTheme, setVolume, setTimer, setResetTimer, setResetTimerController, setEnableSounds, colorTheme, isOnBreak } = useContext(SettingsContext);

    const defaultSettings = () => {
        setColorTheme("light");
        setVolume(100);
        setEnableSounds(true);
        if(!isOnBreak) {
            setTimer(1500);
            setResetTimer(1500);
            setResetTimerController(1500)
        }

        localStorage.setItem("colorTheme", "light");
        localStorage.setItem("volume", 100);
        localStorage.setItem("enableSounds", "true");
        if(!isOnBreak) {
            localStorage.setItem("timer", 1500);
            localStorage.setItem("resetTimer", 1500);
            localStorage.setItem("resetTimerController", 1500);
        }
    };

    return (
        <button className={`reset-settings button-extras ${colorTheme}`} onClick={defaultSettings}>
            Reset Settings
        </button>
    );
}

export default ResetSettings;
