import React from "react";
import useFocusTimer from "../hooks/UseFocusTimer";

const FocusTimer = () => {
    const { 
        timer, 
        inputValue, 
        timerStateDisplay, 
        alertTimer, 
        trackButton, 
        handleInputChange, 
        start, 
        reset,
        formatTime
    } = useFocusTimer();

    return (
        <> 
        <h1 className="alarm-alert">{alertTimer}</h1>
        <div className="timer-container"> 
            <p>Timer : {formatTime(timer)} </p>
            <input placeholder="Enter Time" type="number" value={inputValue} onChange={handleInputChange} />
            <div className="buttons">
                <button className={trackButton} onClick={start}>{timerStateDisplay}</button>
                <button className="reset-button" onClick={reset}>Reset</button>
            </div>
        </div>
        </>
    );
};

export default FocusTimer;
