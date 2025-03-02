import React, { useContext } from "react";
import useFocusTimer from "../hooks/UseFocusTimer";
import { SettingsContext } from "../context/SettingsContext";

const CustomTime = () => {
    const {timer} = useContext(SettingsContext);
    
    const { 
        handleInputChange,
    } = useFocusTimer();

    return (
        <>
        <input placeholder="Enter Time" type="number" value={timer} onChange={handleInputChange} />
        </>
    )
}

export default CustomTime;