import React from "react";
import { useContext } from "react";
import "./Notification.css";
import { NotificationContext } from "../../context/NotificationContext";

function NotificationDisplay() {
    const { notificationState, currentNotification } = useContext(NotificationContext);

    return (
        <div className={`notification-container ${notificationState}`}>
            {currentNotification && (
                <>
                    <h1 className="notification-title">{currentNotification.title}</h1>
                    <h2 className="notification-description">{currentNotification.description}</h2>
                    <h3 className="notification-message">{currentNotification.message}</h3>
                </>
            )}
        </div>
    );
}

export default NotificationDisplay;
