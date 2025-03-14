import React, { useEffect } from "react";
import "../settings/Settings.css";
import { X } from "lucide-react";

// Importing the necessary components and functions
import VolumeSlider from "../settings/Volume";
import ThemeToggler from "../settings/ThemeToggler";
import CustomTime from "../settings/CustomTime";
import ResetSettings from "../settings/ResetSettings";
import ToggleSound from "../settings/ToggleSound";
import TimerMode from "../settings/TimerMode";

function SettingsOverlay({ closeSettings }) {
    // Add overlay-active class to body when component mounts
    useEffect(() => {
        document.body.classList.add("overlay-active");

        return () => {
            document.body.classList.remove("overlay-active");
        };
    }, []);

    return (
        <div className="background-wrapper">
            <div className="settings-container">
                <X onClick={closeSettings} className="close-icon" />
                <h1>Settings</h1>
                <TimerMode/>
                <CustomTime/>
                <ThemeToggler/>
                <ToggleSound/>
                <VolumeSlider/>
                <button onClick={closeSettings}>Save</button> {/* This button actually does nothing LOL (cuz the settings updates as the user interacts with it which is caused by useEffect), 
                it just gives the user the illusion of saving their settings and an alternative way to close the settings menu */}
                <ResetSettings/>
            </div>
        </div>
    );
}

export default SettingsOverlay;
