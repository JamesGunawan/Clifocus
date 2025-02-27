import React, { useState } from "react";
import "../settings/Settings.css"; // Ensure styles are applied

function VolumeSlider() {
    const [volume, setVolume] = useState(50); // Default volume level

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    return (
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
    );
}

export default VolumeSlider;
