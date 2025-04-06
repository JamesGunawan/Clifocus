import React, { useContext } from "react";
import useFocusTimer from "../timer/FocusTimer";
import ProgressBar from "../timer/Progressbar";
import { SettingsContext } from '../../context/SettingsContext';
import '../theme/colorTheme.css'
import { GameContext } from "../../context/GameContext";
import "../timer/FocusTimer.css"
import { StatisticsContext } from "../../context/StatisticsContext";

const Timer = () => {
    const { colorTheme, resetTimer } = useContext(SettingsContext);
    const { onBreakClass, validateClick } = useContext(GameContext)
    const { updateStatistics } = useContext(StatisticsContext)
    const { 
        timer, 
        timerStateDisplay, 
        alertTimer, 
        trackButton, 
        reskipButton,
        start, 
        reset,
        formatTime
    } = useFocusTimer();


    return (
        <> 
        <h1 className="alarm-alert">{alertTimer}</h1>
            <div className={`timer-container ${colorTheme} ${onBreakClass}`}  onClick={(e) => validateClick(e)}> 
            <h1 className={`timer ${colorTheme}`}>Timer : {formatTime(timer)} </h1>
            <ProgressBar currentTime={timer} totalTime={resetTimer} />
            <div className="buttons">
                <button className={trackButton} onClick={start}>{timerStateDisplay}</button>
                <button className="reset-button" onClick={reset}>{reskipButton}</button>
            </div>
        </div>
        </>
    );
};

export default Timer;
