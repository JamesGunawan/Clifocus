import react, { useContext, useState } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

function TimerMode() {
    const {toggleVisibility, visibility, setTimer, setResetTimer} = useContext(SettingsContext);
    const [message, setMessage] = useState(""); // Sets the initial state of the message to an empty string.
    const [messageVisibility, setMessageVisibility] = useState("hidden"); // Sets the initial state of the message visibility to false.

    const toggleMessageState = () => { // Just a toggle function to change the state of the message visibility.
        setMessageVisibility(`${messageVisibility === "" ? "hidden" : ""}`);
    }

    const hideCustomTime = () => { // Hides the custom time input field if it's visible, if not then just do nothing
        if(visibility) {
            toggleVisibility();
        } else {
            return;
        }
    }

    const pomodoroMode = () => { // Function for the Pomodoro mode
        hideCustomTime();
        setTimer(1500);
        setResetTimer(1500);
        setMessage("Pomodoro");
        toggleMessageState();
        setTimeout(() => {
            setMessageVisibility("hidden")
        }, 2000);
    }

    const shortFocusMode = () => { // Function for the Short Focus mode
        hideCustomTime();
        setTimer(300);
        setResetTimer(300);
        setMessage("Short Focus");
        toggleMessageState();
        setTimeout(() => {
            setMessageVisibility("hidden")
        }, 2000);
    }

    return (
        <>
        <h3> Timer Mode </h3>
        <div className='timer-mode-container'>
            <div className='timer-modes'>
                <button className='timer-mode-buttons' onClick={pomodoroMode}>Pomodoro</button>
            </div>

            <div className='timer-modes'>
                <button className='timer-mode-buttons' onClick={shortFocusMode}>Short Focus</button>
            </div>

            <div className='timer-modes'>
                <button className='timer-mode-buttons' onClick={() => { toggleVisibility(); setTimer(""); }}>Custom</button>
            </div>
        </div>
        <h3 className={`message ${messageVisibility}`}>{message} Mode Set!</h3>
        </>
    );
}

export default TimerMode;