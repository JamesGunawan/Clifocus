import { createContext, useState, useEffect } from "react";

// Create the context
const AchievementContext = createContext(null);

const initialAchievements = [ // Define the achievements
    { id: 1, name: "First Focus", description: "Complete 1 focus session", unlocked: false },
    { id: 2, name: "Dedicated", description: "Complete 5 focus sessions", unlocked: false },
    { id: 3, name: "Master Focus", description: "Complete 25 sessions", unlocked: false }
];

// Provider component
const AchievementProvider = ({ children }) => {
    const [achievements, setAchievements] = useState(() => {
        const saved = localStorage.getItem("achievements");
        return saved ? JSON.parse(saved) : initialAchievements;
    });

    // Save to localStorage when achievements change
    useEffect(() => {
        localStorage.setItem("achievements", JSON.stringify(achievements));
    }, [achievements]);

    // Unlock an achievement, call the function and provide the id to the correspomding achievement id holder to change state
    const unlockAchievement = (id) => {
        setAchievements((prev) =>
            prev.map((achievement) =>
                achievement.id === id ? { ...achievement, unlocked: true } : achievement
            )
        );
    };

    // Reset all achievements with confirmation
    const resetAchievements = () => {
        const confirmReset = window.confirm(
            "Are you sure you want to reset all achievements? THIS ACTION CANNOT BE UNDONE"
        );

        if (confirmReset) {
            setAchievements(initialAchievements);
        }
    };


    return (
        <AchievementContext.Provider value={{ achievements, unlockAchievement, resetAchievements }}>
            {children}
        </AchievementContext.Provider>
    );
};

export { AchievementContext, AchievementProvider };
