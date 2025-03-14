import { createContext, useState } from "react";

const StatisticsContext = createContext(null);

// Checks the statistics if they are available in localstorage
const userStatistics = [
    { id: 1, name: "times-finished", description: "Number of focus sessions completed", value: 0 },
    { id: 2, name: "times-stopped", description: "Number of times the timer was stopped", value: 0 }
];

// Checks if statistics are available in localStorage, otherwise initializes them
const checkStatisticsAvailability = () => {
    const storedStats = JSON.parse(localStorage.getItem("userStatistics"));

    if (!storedStats) {
        // Store the default statistics in localStorage if they don’t exist
        localStorage.setItem("userStatistics", JSON.stringify(userStatistics));
    }
};

// Function to display the statistics using the name
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

    if (!statObject) {
        console.error("Statistic not found:", stat);
        return;
    }

    // Update the value
    statObject.value += value;

    // Save updated statistics back to localStorage
    localStorage.setItem("userStatistics", JSON.stringify(storedStats));

    return statObject.value; // Return the updated value
}



const StatisticsProvider = ({ children }) => {
    const [ dataType, setDataType ] = useState("Day");

       // Function to get data based on dataType
       const data = (dataType) => {
        switch (dataType) {
            case "Day":
                return [
                    { name: '', Minutes: 0 },
                    { name: 'Today', Minutes: 60 },
                ];
            case "Week":
                return [
                    { name: 'Week - Yesterday', Minutes: 150, pv: 2300, amt: 2300 },
                    { name: 'Week - Today', Minutes: 350, pv: 2400, amt: 2400 },
                    { name: 'Week - Tomorrow', Minutes: 450, pv: 2400, amt: 2400 }
                ];
            case "Month":
                return [
                    { name: 'Month - Yesterday', Minutes: 200, pv: 2200, amt: 2200 },
                    { name: 'Month - Today', Minutes: 400, pv: 2500, amt: 2500 },
                    { name: 'Month - Tomorrow', Minutes: 500, pv: 2600, amt: 2600 }
                ];
            default:
                return [];
        }
    };   
    
    return (
        <StatisticsContext.Provider value={{ checkStatisticsAvailability, data, dataType, setDataType, displayStatistics, updateStatistics}}>
            {children}
        </StatisticsContext.Provider>
    );
};

export { StatisticsProvider, StatisticsContext };
