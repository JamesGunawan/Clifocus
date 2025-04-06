import { useContext, useState, useEffect} from 'react';
import { SettingsContext } from '../../context/SettingsContext';

// Timer Modes
function TimerMode() {
    const { toggleVisibility, visibility, setTimer, setResetTimer, setResetTimerController, isOnBreak } = useContext(SettingsContext);
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
        setResetTimerController(1500)
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
        setResetTimerController(300);
        setMessage("Short Focus");
        toggleMessageState();
        setTimeout(() => {
            setMessageVisibility("hidden")
        }, 2000);
    }

    return (
        <>
        <div className='timer-mode-container'>
            {!isOnBreak ? (
                <>
                    <div className='timer-modes'>
                        <button 
                            className='timer-mode-buttons' 
                            onClick={pomodoroMode}
                        >
                            Pomodoro
                        </button>
                    </div>
            
                    <div className='timer-modes'>
                        <button 
                            className='timer-mode-buttons' 
                            onClick={shortFocusMode}
                        >
                            Short Focus
                        </button>
                    </div>
            
                    <div className='timer-modes'>
                        <button 
                            className='timer-mode-buttons' 
                            onClick={() => { if (!visibility) { toggleVisibility(); setTimer("600"), setResetTimer("600"), setResetTimerController("600"); }}} 
                        >
                            Custom
                        </button>
                    </div>
                </>
            ) : (
                <p className="break-message">Unable to change timer duration during break!</p>
            )}
        </div>
        <h3 className={`message ${messageVisibility}`}>{message} Mode Set!</h3>
        </>
    );
}

export default TimerMode;