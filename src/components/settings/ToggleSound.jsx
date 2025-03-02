import React, { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

function ToggleSound() {

    const {enableSounds, toggleSounds} = useContext(SettingsContext);
    return (
        <>
        <p>Volume Mute</p>
        <input type="checkbox" onChange={toggleSounds} checked={!enableSounds}/>
        </>
    )
}

export default ToggleSound;