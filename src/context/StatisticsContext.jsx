import { createContext, useEffect, useState } from "react";

const StatisticsContext = createContext(null);

// Checks the statistics if they are available in localstorage
const userStatistics = [
    { id: 1, name: "times-finished", description: "Number of focus sessions completed", value: 0 },
    { id: 2, name: "times-stopped", description: "Number of times the timer was stopped", value: 0 },
    { id: 3, name: "total-time", description: "Total time spent in focus sessions", value: 0 },
    { id: 3.1, name: "total-time-tracker", description: "ONLY used for total time tracking function", value: 0 }
];

const StatisticsProvider = ({ children }) => {
    const [ dataType, setDataType ] = useState("Day");

    const getTodaysDate = () => {
        const today = new Date().toISOString().slice(5, 10); // MM-DD format
    
        // Save updated data back to localStorage
        localStorage.setItem("todaysDate", JSON.stringify(today));
    };
    
    const convertTotalTimeTracker = () => {
        const totalTimeTracker = displayStatistics("total-time-tracker"); // Get the stored value
    
        if (totalTimeTracker >= 60) {
            updateStatistics("total-time-tracker", -60); // Reduce tracked time by 60 seconds
            updateStatistics("total-time", 1); // Increase total time by 1 minute
        }
    };
    

        // Function to get data based on dataType
        const data = (dataType) => {
            switch (dataType) {
                case "Day":
                    const today = new Date().toISOString().slice(5, 10); // MM-DD format
                    const storedData = JSON.parse(localStorage.getItem("daily-usage")) || {};
                    const minutesToday = storedData[today] || 0; // Get today's minutes, or 0 if not set
                    return [
                        { name: '', Minutes: 0 },
                        { name: 'Today', Minutes: minutesToday },
                    ];
            case "Week":
                return [
                    { name: 'Mon', Minutes: 150, pv: 2300, amt: 2300 },
                    { name: 'Tue', Minutes: 350, pv: 2400, amt: 2400 },
                    { name: 'Wed', Minutes: 450, pv: 2400, amt: 2400 },
                    { name: 'Thu', Minutes: 400, pv: 2400, amt: 2400 },
                    { name: 'Fri', Minutes: 430, pv: 2400, amt: 2400 },
                    { name: 'Sat', Minutes: 300, pv: 2400, amt: 2400 },
                    { name: 'Sun', Minutes: 250, pv: 2400, amt: 2400 }
                ];
            case "Month":
                return [
                    { name: 'Week 1', Minutes: 200, pv: 2200, amt: 2200 },
                    { name: 'Week 2', Minutes: 400, pv: 2500, amt: 2500 },
                    { name: 'Week 3', Minutes: 500, pv: 2600, amt: 2600 },
                    { name: 'Week 4', Minutes: 500, pv: 2600, amt: 2600 }
                ];
            default:
                return [];
        }
    };   

// Checks if statistics are available in localStorage, otherwise initializes them
const checkStatisticsAvailability = () => {
    const storedStats = JSON.parse(localStorage.getItem("userStatistics"));

    if (!storedStats) {
        // Store the default statistics in localStorage if they don’t exist
        localStorage.setItem("userStatistics", JSON.stringify(userStatistics));
    }
};

// Function to display the statistics using the name and this also can also act as getStatistics("stat-name") lol
const displayStatistics = (stat) => {
    const storedStats = JSON.parse(localStorage.getItem("userStatistics")) || []; // Parse the stored JSON

    // Find the statistic object by name
    const statistic = storedStats.find(statistics => statistics.name === stat);

    return statistic ? statistic.value : 0; // Return the value or default to 0
};

// Function to update a statistic by name and value
const updateStatistics = (stat, value) => {
    const storedStats = JSON.parse(localStorage.getItem("userStatistics")) || [];

    // Find the statistic object by name
    const statObject = storedStats.find(statistics => statistics.name === stat);

    // Update the value
    statObject.value += value;

    // Save updated statistics back to localStorage
    localStorage.setItem("userStatistics", JSON.stringify(storedStats));

    return statObject.value; // Return the updated value
}
    
    return (
        <StatisticsContext.Provider value={{ userStatistics, checkStatisticsAvailability, data, dataType, setDataType, displayStatistics, updateStatistics, convertTotalTimeTracker, getTodaysDate}}>
            {children}
        </StatisticsContext.Provider>
    );
};

export { StatisticsProvider, StatisticsContext };
