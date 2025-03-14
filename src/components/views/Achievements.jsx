import React, { useContext } from "react";
import { AchievementContext } from "../../context/AchievementContext";
import "../achievements/Achievements.css";
import { SettingsContext } from "../../context/SettingsContext";
import '../theme/colorTheme.css'

function Achievements() {
    const { achievements, resetAchievements } = useContext(AchievementContext);
    const { colorTheme } = useContext(SettingsContext);

    return (
    <div className={`achievements-container ${colorTheme}`}>
        <h1 className="title">Achievements</h1>
        <div className="flex-row">
            {achievements.map((achievement) => {
                // If the achievement is hidden and not unlocked, show ??? and "To be discovered"
                const displayName = achievement.hidden && !achievement.unlocked ? "???" : achievement.name;
                const displayDescription = achievement.hidden && !achievement.unlocked ? "To be discovered" : achievement.description;

                return (
                    <div
                        key={achievement.id}
                        className={achievement.unlocked ? "achievements-unlocked" : "achievements-locked"}
                    >
                        <h3>{displayName}</h3>
                        <p>{displayDescription}</p>
                    </div>
                );
            })}
        </div>
        <button className="reset-achievements" onClick={resetAchievements}>Reset Achievements</button>
    </div>
    );
}

export default Achievements;
