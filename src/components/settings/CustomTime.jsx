import React, { useContext } from "react";
import useFocusTimer from "../timer/FocusTimer";
import { SettingsContext } from '../../context/SettingsContext';

// Input for custom time
const CustomTime = () => {
    const { timer, visibility, isOnBreak, colorTheme } = useContext(SettingsContext);     
    
    const { 
        handleInputChange,
    } = useFocusTimer();

    return ( // Handles each input field with a type (sec, min, hour)
        <>
        <div className={`custom-time-container ${isOnBreak || visibility === "" ? "hidden" : ""}`}>
            <input 
                className={`custom-time ${colorTheme}`}
                placeholder="HH" 
                type="number" 
                min="0"
                value={Math.floor(timer / 3600) || ""} 
                onChange={(e) => handleInputChange(e, "hours")}
            />
            <span>:</span>
            <input 
                className={`custom-time ${colorTheme}`}
                placeholder="MM" 
                type="number" 
                min="0"
                max="59"
                value={Math.floor((timer % 3600) / 60) || ""} 
                onChange={(e) => handleInputChange(e, "minutes")}
            />
            <span>:</span>
            <input 
                className={`custom-time ${colorTheme}`}
                placeholder="SS" 
                type="number" 
                min="0"
                max="59"
                value={timer % 60 || ""} 
                onChange={(e) => handleInputChange(e, "seconds")}
            />
        </div>
        </>
    )
}

export default CustomTime;