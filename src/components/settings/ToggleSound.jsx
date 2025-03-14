import React, { useContext } from "react";
import { SettingsContext } from '../../context/SettingsContext';

function ToggleSound() {

    const {enableSounds, toggleSounds} = useContext(SettingsContext);
    return (
        <>
        <p className="mute-title">Volume Mute</p>
        <div className="toggle-container">
      <input
        type="checkbox"
        id="checkboxInput"
        className="toggle-checkbox"
        checked={!enableSounds}
        onChange={toggleSounds}
      />
      <label htmlFor="checkboxInput" className="toggleSwitch">
        {!enableSounds ? (
          <div className="mute-speaker">
            <svg
              version="1.0"
              viewBox="0 0 75 75"
              stroke="#fff"
              strokeWidth="5"
            >
              <path
                d="m39,14-17,15H6V48H22l17,15z"
                fill="#fff"
                strokeLinejoin="round"
              ></path>
              <path
                d="m49,26 20,24m0-24-20,24"
                fill="#fff"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
        ) : (
          <div className="speaker">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 75 75">
              <path
                d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
                style={{
                  stroke: "#fff",
                  strokeWidth: 5,
                  strokeLinejoin: "round",
                  fill: "#fff",
                }}
              ></path>
              <path
                d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
                style={{ fill: "none", stroke: "#fff", strokeWidth: 5, strokeLinecap: "round" }}
              ></path>
            </svg>
          </div>
        )}
      </label>
    </div>
        </>
    )
}

export default ToggleSound;