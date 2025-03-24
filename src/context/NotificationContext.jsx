import { createContext, useContext, useState, useEffect } from "react";
import { AchievementContext } from "./AchievementContext";

const NotificationContext = createContext(null);

const NotificationProvider = ({ children }) => {
    const [queue, setQueue] = useState([]);  // Queue for notifications
    const [currentNotification, setCurrentNotification] = useState(null); // Stores the currently displayed notification
    const [notificationState, setNotificationState] = useState(""); // Handles the animation state
    const { achievements, unlockAchievement } = useContext(AchievementContext);

    useEffect(() => {
        if (!currentNotification && queue.length > 0) {
            // Show the next notification
            setCurrentNotification(queue[0]); // Set the first notification in the queue
            setQueue((prevQueue) => prevQueue.slice(1)); // Remove it from the queue
            setNotificationState("active"); // Start animation

            // Removes the active class after 6 seconds to slide out the notification
            setTimeout(() => {
                setNotificationState(""); // Slide out animation
            }, 6000);

            // Clears the notification after it fully disappears (7 seconds total)
            setTimeout(() => {
                setCurrentNotification(null);
            }, 7000);
        }
    }, [queue, currentNotification]);

    // Makes life easier. Instead of exporting all the title and message functions,
    // you can just call this function and provide the title, description, and message.
    const notificationContent = (title, description, message) => {
        const newNotification = { title, description, message };
        setQueue((prevQueue) => [...prevQueue, newNotification]); // Adds the notification to the queue
    };

    // This function is used both as an achievement unlocker and a notification creator.
    // It gets the provided id from the user, retrieves the title and description, and unlocks it.
    const achievementNotification = (rarity, id) => {
        // Array id is required because it accesses the number list of dictionaries.
        // THEN the unlock achievement itself uses id to unlock the achievement.
        const arrayId = id - 1;
        const achievementTitle = "Achievement Unlocked!";
        const achievementDescription = achievements[arrayId].name;
        const achievementMessage = achievements[arrayId].description;
        unlockAchievement(rarity, id); // Unlock the achievement
        notificationContent(achievementTitle, achievementDescription, achievementMessage); // Push it to the queue
    };

    return (
        <NotificationContext.Provider value={{ notificationContent, achievementNotification, notificationState, currentNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export { NotificationProvider, NotificationContext };
