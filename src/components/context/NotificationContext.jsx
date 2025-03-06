import { createContext, useState } from "react";

const NotificationContext = createContext(null);

const NotificationProvider = ({ children }) => {
    const [notificationState, setNotificationState] = useState("");
    const [notificationTitle, setNotificationTitle] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("");

    // Makes life easier. instead of exporting all the title and message functions you can just call the function and provide the title and message
    const notificationContent = (title, message) => {
        setNotificationTitle(title);
        setNotificationMessage(message);
    }

    // Adds the active class which slides the notification in, and after 4 seconds it resets the contents inside it and slides it back out
    const displayNotification = () => {
        setNotificationState((prev) => prev === "" ? "active" : "");
        setTimeout(() => {
            setNotificationState((prev) => prev === "" ? "active" : "");
            notificationContent("", "")
        }, 4000);
    }

    return(
        <NotificationContext.Provider value={{ notificationState, displayNotification, notificationContent, notificationTitle, notificationMessage }}>
            {children}
        </NotificationContext.Provider>
    )
}

export { NotificationProvider, NotificationContext };