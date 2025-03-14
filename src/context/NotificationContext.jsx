import { createContext, useContext, useState } from "react";
import { AchievementContext } from "./AchievementContext";

const NotificationContext = createContext(null);

const NotificationProvider = ({ children }) => {
    const [notificationState, setNotificationState] = useState("");
    const [notificationTitle, setNotificationTitle] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationDescription, setNotificationDescription] = useState("");
    const { achievements, unlockAchievement } = useContext(AchievementContext);

    // Makes life easier. instead of exporting all the title and message functions you can just call the function and provide the title, description and message
    const notificationContent = (title, description, message) => {
        setNotificationTitle(title);
        setNotificationDescription(description);
        setNotificationMessage(message);
    }

    // This function is used both as an achivement unlocker and a notification creator, it gets the provided id from the user and gets the title and description and unlocks it
    const achievementNotification = (rarity, id) => {
        // Array id is required because it accesses the number list of dictionaries THEN the unlock achievement itself uses id to unlock the achievement
        const arrayId = id - 1;
        const achievementTitle = ("Achievement Unlocked!");
        const achievementDescription = achievements[arrayId].name;
        const achievementMessage = achievements[arrayId].description;
        unlockAchievement(rarity, id);
        notificationContent(achievementTitle, achievementDescription, achievementMessage);
        displayNotification();
    }

    // Adds the active class which slides the notification in, and after 4 seconds it resets the contents inside it and slides it back out
    const displayNotification = () => {
        setNotificationState((prev) => prev === "" ? "active" : "");
        setTimeout(() => {
            setNotificationState((prev) => prev === "" ? "active" : "");
        }, 4000);
        setTimeout(() => {
            notificationContent("", "", "") // Resets title and message after it goes off screen
        }, 5000);
    }

    return(
        <NotificationContext.Provider value={{  notificationState, displayNotification, notificationContent, notificationTitle, notificationDescription, notificationMessage, achievementNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}

export { NotificationProvider, NotificationContext };