import React from "react";
import { useContext } from "react";
import './Notification.css'
import { NotificationContext } from "../context/NotificationContext";

function NotificationDisplay() {
const { notificationState, notificationTitle, notificationMessage } = useContext(NotificationContext);

    return(
        <>
        <div className={`notification-container ${notificationState}`}>
            <h1 className="notification-title">{notificationTitle}</h1>
            <h3 className="notification-description">{notificationMessage}</h3>
        </div>
        </>
    )
}

export default NotificationDisplay;