import React, { useContext, useState } from "react";
import "../settings/Settings.css"; // Ensure styles are applied
import { SettingsContext } from '../../context/SettingsContext';

function VolumeSlider() {
    const {volume, setVolume} = useContext(SettingsContext)

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    return (
        <>
        <p>Volume Slider</p>
        <div className="volume-slider-container">
            
            <input
                type="range"
                className="volume-slider"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
            />
            <span className="volume-tooltip">{volume}%</span>
        </div>
        </>

    );
}

export default VolumeSlider;
