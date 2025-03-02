    
    
    // Checks the availabilty of the times-finished
    const checkTimesAvailability = () => {
        const checkTimes = parseInt(localStorage.getItem("times-finished") ?? 0);
        if (checkTimes > 0) {
            // If it exists do nothing
            return;
        }
        // If it doesn't exist, set counter to 0
        localStorage.setItem("times-finished", 0);
    }

    const checkStopAvailabilty = () => {
        const checkStop = parseInt(localStorage.getItem("times-stopped") ?? 0);
        if (checkStop > 0) {
            // If it exists do nothing
            return;
        }
        // If it doesn't exist, set counter to 0
        localStorage.setItem("times-stopped", 0);
    }   

    export { checkTimesAvailability, checkStopAvailabilty };