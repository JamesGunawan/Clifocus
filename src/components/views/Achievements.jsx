import React, { useContext } from "react";
import { AchievementContext } from "../context/AchievementContext";
import "../achievements/Achievements.css";

function Achievements() {
    const { achievements, resetAchievements } = useContext(AchievementContext);

    return (
        <div className="achievements-container">
            <h1 className="title">Achievements</h1>
            <div className="flex-row">
                {achievements.map((achievement) => (
                    <div
                        key={achievement.id}
                        className={achievement.unlocked ? "achievements-unlocked" : "achievements-locked"}
                    >
                        <h3>{achievement.name}</h3>
                        <p>{achievement.description}</p>
                    </div>
                ))}
            </div>
            <button className="reset-achievements" onClick={resetAchievements}>Reset Achievements</button>
        </div>
    );
}

export default Achievements;
