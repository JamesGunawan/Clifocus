import React from "react";
import "../settings/Settings.css"
import VolumeSlider from "../settings/Volume";

function SettingsTemp() {
    return(
        <>
        <div className="background-wrapper">
            <div className="settings-container">
                <h1>Settings</h1>
                <p>Set Custom Time</p>
                <input></input>
                <p>Toggle Dark Mode</p>
                <div className="darkmode-toggle">
                    <label className="darkmode-label">
                        <input type="checkbox" className="darkmode-checkbox"></input>
                        <span className="darkmode-slider"></span>
                    </label>
                </div>  
                <p>enable Sounds</p>
                <input type="checkbox"></input>
                <p>volume slider</p>
                <VolumeSlider/>
            </div>
        </div>
        </>
    )
}

export default SettingsTemp;