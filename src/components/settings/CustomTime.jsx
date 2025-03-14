import React, { useContext } from "react";
import useFocusTimer from "../hooks/UseFocusTimer";
import { SettingsContext } from '../../context/SettingsContext';

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