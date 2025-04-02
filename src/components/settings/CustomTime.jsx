import React, { useContext } from "react";
import useFocusTimer from "../timer/FocusTimer";
import { SettingsContext } from '../../context/SettingsContext';

// Input for custom time
const CustomTime = () => {
    const {timer, visibility} = useContext(SettingsContext);
    
    const { 
        handleInputChange,
    } = useFocusTimer();

    return (
        <>
        <input className={`custom-time ${visibility === "" ? "hidden" : ""}`} placeholder="Enter Time" type="number" value={timer} onChange={handleInputChange}/>
        </>
    )
}

export default CustomTime;