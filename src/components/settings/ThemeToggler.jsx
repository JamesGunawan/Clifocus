import React, { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

function ThemeToggler() {
    const {theme, toggleTheme} = useContext(SettingsContext)
    return(
        <>
        <p>Toggle Dark Mode</p>
        <div className="darkmode-toggle">
            <label className="darkmode-label">
                <input type="checkbox" className="darkmode-checkbox" onChange={toggleTheme} checked={theme === "dark"}></input>
                <span className="darkmode-slider"></span>
            </label>
        </div>  
        </>
    )
}

export default ThemeToggler;