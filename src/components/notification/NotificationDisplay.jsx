import React from "react";
import { useContext } from "react";
import './Notification.css'
import { NotificationContext } from "../context/NotificationContext";

function NotificationDisplay() {
const { notificationState, notificationTitle, notificationDescription, notificationMessage } = useContext(NotificationContext);

    return(
        <>
        <div className={`notification-container ${notificationState}`}>
            <h1 className="notification-title">{notificationTitle}</h1>
            <h2 className="notification-description">{notificationDescription}</h2>
            <h3 className="notification-message">{notificationMessage}</h3>
        </div>
        </>
    )
}

export default NotificationDisplay;