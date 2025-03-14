import { createContext, useState, useEffect, useRef } from "react";

// Create the context
const AchievementContext = createContext(null);

const initialAchievements = [ // Define the achievements
    { id: 1, name: "First Focus", description: "Complete 1 focus session", unlocked: false, hidden: false },
    { id: 2, name: "Dedicated", description: "Complete 5 focus sessions", unlocked: false, hidden: false },
    { id: 3, name: "Master Focus", description: "Complete 25 focus sessions", unlocked: false, hidden: false },
    { id: 4, name: "Be Right Back", description: "Stopped the timer once", unlocked: false, hidden: false },
    { id: 5, name: "Alright Bro, Lock in", description: "Stopped the timer 25 times", unlocked: false, hidden: false },
    { id: 6, name: "Procrastinator", description: "Stopped the timer 100 TIMES", unlocked: false, hidden: true },
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

    const playAudio = () => {
        unlockAudio.current.play().catch(err => console.error('Audio play failed:', err));
    };
    
    const unlockAudio = useRef(new Audio('/achievementUnlocked.mp3'));

    // Unlock an achievement, call the function and provide the id to the correspomding achievement id holder to change state
    const unlockAchievement = (id) => {
        setAchievements((prev) =>
            prev.map((achievement) =>
                achievement.id === id ? { ...achievement, unlocked: true } : achievement
            )
        );
        playAudio();
    };

    const getStatistics = () => {
        const gatheredStatistics = [
            { id: 1, name: "times-finished" ,value: localStorage.getItem("times-finished")},
            { id: 2, name: "times-stopped", value: localStorage.getItem("times-stopped")}
        ]
        return gatheredStatistics; 
    }

    // Reset all achievements and statistics
    const resetAchievements = () => {
        const confirmReset = window.confirm(
            "Are you sure you want to reset all achievements? WARNING, THIS WILL ALSO AFFECT YOUR STATISTICS AND THIS ACTION CANNOT BE UNDONE"
        ); 

        if (confirmReset) {
            // Reset all statistics
            getStatistics().forEach(stat => localStorage.setItem(stat.name, 0)); 

            // Reset achievements 
            setAchievements(initialAchievements);
            
            console.log("All statistics and achievements have been reset.");
        }
    };


    return (
        <AchievementContext.Provider value={{ achievements, unlockAchievement, resetAchievements, playAudio}}>
            {children}
        </AchievementContext.Provider>
    );
};

export { AchievementContext, AchievementProvider };
