import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SettingsContext } from '../../context/SettingsContext';

const ProgressBar = ({ currentTime, totalTime }) => {
    const { progressBarState, setProgressBarState, isOnBreak } = useContext(SettingsContext);

    let progress = 0;

    if (isOnBreak) {
        progress = totalTime > 0 ? (currentTime / 300) * 100 : 0; 
    } else {
        progress = totalTime > 0 ? (currentTime / totalTime) * 100 : 0;
    }
    
    const progressBarClass = progressBarState ? "progress-bar active" : "progress-bar paused";
    
    const location = useLocation(); // Detects route changes

    // Detect route changes and reset progress bar so it doesn't stay active
    useEffect(() => {
        setProgressBarState(false);
    }, [location]);

    return (
        <div className="progress-bar-container">
            <div
                className={progressBarClass}
                style={{
                    width: `${progress}%`,
                    transition: "width 0.3s linear"
                }}
            ></div>
        </div>
    );
};

export default ProgressBar;
