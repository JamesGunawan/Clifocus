import { createContext, useState, useEffect, useRef, useContext } from "react";
import { StatisticsContext } from "./StatisticsContext";
import { SettingsContext } from "./SettingsContext";

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
    const { userStatistics } = useContext(StatisticsContext);
    const { volume, enableSounds } = useContext(SettingsContext);

    const unlockAudioCommon = useRef(new Audio('/achievementUnlockedCommon.mp3'));
    const unlockAudioRare = useRef(new Audio('/achievementUnlockedRare.mp3'));
    
    const playAudio = (rarity) => {
        let audio;
    
        // Determine which audio to play based on the rarity parameter
        if (rarity === 'common') {
            audio = unlockAudioCommon.current;
        } else if (rarity === 'rare') {
            audio = unlockAudioRare.current;
        } else {
            console.error('Invalid rarity type:', rarity);
            return; // Exit if the rarity is invalid
        }
    
        // Set audio properties
        audio.currentTime = 0;
        audio.muted = !enableSounds;
        audio.volume = volume / 100;
    
        // Play the audio
        audio.play().catch(err => console.error('Audio play failed:', err));

        // Reset the audio currentTime when the audio ends. Super important function to prevent delay and makes it spamable
        const resetAudio = () => {
            audio.currentTime = 0; // Reset to start
            audio.removeEventListener('ended'   , resetAudio); // Clean up the event listener
        };

        audio.addEventListener('ended', resetAudio);
    };

    // Unlock an achievement, call the function and provide the id to the correspomding achievement id holder to change state
    const unlockAchievement = (rarity, id) => {
        playAudio(rarity);  // Play the audio for the achievement unlock
        
        setAchievements((prev) => {
            // Map over the achievements and update the unlocked status for the specific achievement
            const updatedAchievements = prev.map((achievement) =>
                achievement.id === id ? { ...achievement, unlocked: true } : achievement
            );
            
            // Update localStorage with the new achievements list
            localStorage.setItem("achievements", JSON.stringify(updatedAchievements));
            
            return updatedAchievements;  // Return the updated state
        });
    };
    

    // Reset all achievements and statistics
    const resetAchievements = () => {
        const confirmReset = window.confirm(
            "Are you sure you want to reset all achievements? WARNING, THIS WILL ALSO AFFECT YOUR STATISTICS AND THIS ACTION CANNOT BE UNDONE"
        );
    
        if (confirmReset) {
            // Reset all statistics

            const resetStats = userStatistics.map(stat => ({
                ...stat,
                value: 0
            }));
            localStorage.setItem("userStatistics", JSON.stringify(resetStats));
    
            // Reset achievements
            setAchievements(initialAchievements);
            localStorage.setItem("achievements", JSON.stringify(initialAchievements)); // Ensure it persists
        }
    };
    

        // Checks if statistics are available in localStorage, otherwise initializes them
        const checkAchievements = () => {
            const storedStats = JSON.parse(localStorage.getItem("achievements"));
    
            if (!storedStats) {
                // Store the default statistics in localStorage if they don’t exist
                localStorage.setItem("achievements", JSON.stringify(initialAchievements));

            }
        };

    return (
        <AchievementContext.Provider value={{ achievements, unlockAchievement, resetAchievements, playAudio, unlockAudioRare, checkAchievements }}>
            {children}
        </AchievementContext.Provider>
    );
};

export { AchievementContext, AchievementProvider };
