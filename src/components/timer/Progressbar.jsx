import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

const ProgressBar = ({ currentTime, totalTime }) => {
    const { progressBarState } = useContext(SettingsContext);
    const progress = totalTime > 0 ? (currentTime / totalTime) * 100 : 0;
    const progressBarClass = progressBarState ? "progress-bar active" : "progress-bar paused";

    return (
        <div className="progress-bar-container">
            <div
                className={progressBarClass}
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
