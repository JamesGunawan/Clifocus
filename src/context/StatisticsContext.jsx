import { createContext, useContext, useEffect, useState } from "react";
import { GameContext } from "./GameContext";

const StatisticsContext = createContext(null);

// Checks the statistics if they are available in localstorage
const userStatistics = [
    { id: 1, name: "times-finished", description: "Number of focus sessions completed", value: 0 },
    { id: 2, name: "times-stopped", description: "Number of times the timer was stopped", value: 0 },
    { id: 3, name: "total-time", description: "Total time spent in focus sessions", value: 0 },
    { id: 3.1, name: "total-time-tracker", description: "ONLY used for total time tracking function", value: 0 },
    { id: 3.2, name: "statistics-container-time-width", description: "ONLY used for width tracking", value: 0 }
];

// Empty array to track monthly stats
const monthlyStatistics = []

const StatisticsProvider = ({ children }) => {
    const [dataType, setDataType] = useState("Day");
    const [isMonthExpanded, setIsMonthExpanded] = useState(false);
    const [monthCheckboxVisibility, setMonthCheckboxVisibility] = useState("hiddens");
    const { generateCurrency } = useContext(GameContext);

    // Function to get today's date and store it in localStorage
    const getTodaysDate = () => {
        const today = new Date();;
        
        // Get the local date in MM-DD format
        const options = { month: '2-digit', day: '2-digit' };
        const localDate = today.toLocaleDateString(undefined, options)

        localStorage.setItem("todaysDate", (localDate));

        return localDate;
    };

    // Stores the time that has been tracked on that day
    const storeTimeTracked = () => {
        // Define the date and total time for that day
        const today = localStorage.getItem("todaysDate"); 
        const timeTracked = { 
            date: today, 
            value: displayStatistics("total-time")
        };

        // Initialize allStats as an empty array if it is null
        const allStats = JSON.parse(localStorage.getItem("monthlyStatistics")) || [];

        // Find index of existing date entry
        const existingIndex = allStats.findIndex(stat => stat.date === today);

        if (existingIndex !== -1) {
            // If date exists, update its value
            allStats[existingIndex].value = timeTracked.value;
        } else {
            // If date does not exist, push a new entry
            allStats.push(timeTracked);
        }

        // Save updated array back to localStorage
        localStorage.setItem("monthlyStatistics", JSON.stringify(allStats));
    };

    
    // Function to convert total time tracker when it reaches 60 seconds
    const convertTotalTimeTracker = () => {
        const totalTimeTracker = displayStatistics("total-time-tracker"); // Get the stored value

        if (totalTimeTracker >= 60) {
            updateStatistics("total-time-tracker", -60); // Reduce tracked time by 60 seconds
            updateStatistics("total-time", 1); // Increase total time by 1 minute
            generateCurrency("Time Crystal"); // Generate a Time Crystal
        }
    };

    // Function to get the number of days in a given month and year
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    }; // Month is 0 indexed, so we add 1 to get the correct month getDaysInMonth(x, 0) = January, getDaysInMonth(x, 1) = February, etc.

    // Automatic function to track the days in month
    const trackDaysInMonth = () => {
        const year = new Date().getFullYear(); // Get the current year
        const month = new Date().getMonth(); // Get the current month (1-12)
        const daysInMonth = getDaysInMonth(year, month);
        return daysInMonth;
    }

    // Function to check day, if last updated date is not today => reset the daily tracking
    const checkDay = () => {
        const storedDate = localStorage.getItem("todaysDate");
        storeTimeTracked();
        const today = getTodaysDate();
        if (storedDate !== today) {
            setStatisticValue("total-time", 0);
        } else {
        return
        } 
    }

    // This creates days in the month
    const breakDownMonthlyStatistics = () => {
        const monthlyStatisticsInWeeks = [];
        const week1 = [];
        const week2 = [];
        const week3 = [];
        const week4 = [];
    
        const today = new Date();
        
        // Get the local date in MM format (zero-padded)
        const options = { month: '2-digit' };
        const localMonth = today.toLocaleDateString(undefined, options).padStart(2, "0");
    
        // Get the remaining days in the month
        const remainingDays = trackDaysInMonth() - 28;
    
        // Generate weeks with zero-padded days
        for (let i = 1; i <= 7; i++) { 
            let formattedDay = String(i).padStart(2, "0");
            week1.push({ date: `${localMonth}/${formattedDay}`, value: getValueFromDate(`${localMonth}/${formattedDay}`) });
        } 
        for (let i = 8; i <= 14; i++) {
            let formattedDay = String(i).padStart(2, "0");
            week2.push({ date: `${localMonth}/${formattedDay}`, value: getValueFromDate(`${localMonth}/${formattedDay}`) });
        }
        for (let i = 15; i <= 21; i++) {
            let formattedDay = String(i).padStart(2, "0");
            week3.push({ date: `${localMonth}/${formattedDay}`, value: getValueFromDate(`${localMonth}/${formattedDay}`) });
        }
        for (let i = 22; i <= 28 + remainingDays; i++) {
            let formattedDay = String(i).padStart(2, "0");
            week4.push({ date: `${localMonth}/${formattedDay}`, value: getValueFromDate(`${localMonth}/${formattedDay}`) });
        }
    
        // Store in localStorage
        monthlyStatisticsInWeeks.push(week1, week2, week3, week4);
        localStorage.setItem("monthlyStatisticsInWeeks", JSON.stringify(monthlyStatisticsInWeeks));
    }
    

    // Gets all the values of each week
    function retrieveWeeklyStatistics() {
        // Retrieve data from localStorage
        let weeklyData = JSON.parse(localStorage.getItem("monthlyStatisticsInWeeks")) || [];
    
        // Get current date
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;

        // Get the number of days in the current month
        const daysInMonth = new Date(year, month, 0).getDate();

        // Generate week mappings dynamically
        let weekMappings = {
            "week1": `${month}/1 - ${month}/7`,
            "week2": `${month}/8 - ${month}/14`,
            "week3": `${month}/15 - ${month}/21`,
            "week4": `${month}/22 - ${month}/${daysInMonth}`
        };

        // Initialize result structure
        let weekResults = {
            week1: [],
            week2: [],
            week3: [],
            week4: []
        };
    
        // Assign data to corresponding weeks
        weeklyData.forEach((week, index) => {
            let weekKey = Object.keys(weekMappings)[index] || "week4"; // Default extra days to week4
            weekResults[weekKey] = week; // Store full individual data
        });
    
        return weekResults;
    }

    // Get today's date locally
    const getTodaysLocalDate = (expression = "+", date = 0) => {
        const today = new Date();
        const options = { month: '2-digit', day: '2-digit' };
    
        // Adjust the date based on expression and value
        today.setDate(today.getDate() + (expression === "-" ? -date : date));
    
        return today.toLocaleDateString(undefined, options);
    };

    const checkWeek = () => {
        // Get today's date in MM/DD format
        const today = new Date();
        const options = { month: '2-digit', day: '2-digit' };
        const localDay = today.toLocaleDateString(undefined, options); 
        
        // Retrieve weekly data from storage
        const allWeeks = retrieveWeeklyStatistics(); // This returns { week1, week2, week3, week4 } with data for each week
    
        // Loop through all weeks and check if any date matches today's date
        for (let week in allWeeks) {
            let found = allWeeks[week].find(day => day.date === localDay);
            console.log(found)
            if (found) {
                return allWeeks[week]; // Return the entire week array if a match is found
            }
        }
    
        return null; // If no match is found
    };
    

    // Function to get data based on dataType
    const data = (dataType) => {
        switch (dataType) {
            case "Day":
                checkDay();
                breakDownMonthlyStatistics();

                // Getting the day of yesterday
            const yesterday = getTodaysLocalDate("-", 1);

                // Retrieve time for todays
                const getTime = JSON.parse(localStorage.getItem("userStatistics"));
                const minutesToday = getTime[2].value;

                // Get the updated statistics from localStorage
                const todaysMonthlyStatistics = JSON.parse(localStorage.getItem("monthlyStatistics"));

                // Function to find the day of yesterday
                const getDataFromYesterday = (today) => {
                    return todaysMonthlyStatistics.find(date => date.date === today) || 0;
                }
                // Gets the value of yesterday, if there is no yesterday in the data (user's first day), then return 0
                const minutesYesterday = (getDataFromYesterday(yesterday).value) // might need fixing

                setStatisticValue("statistics-container-time-width", 600);

                return [
                    { name: 'Yesterday', Minutes: minutesYesterday },
                    { name: 'Today', Minutes: minutesToday },
                ];
            case "Week": 
                const weekData = checkWeek();

                // Initialize an empty array
                const weekArray = []

                // Restructuring because for some reason it won't take weekData
                for(let days in weekData){
                    let date = weekData[days].date;
                    let time = weekData[days].value;
                    weekArray.push({ name: date, Minutes: time });
                }
                setStatisticValue("statistics-container-time-width", 700);

                console.log(weekData);
                return weekArray;
            case "Month":
                const localMonth = getTodaysLocalDate().split('/')[0]; // Get the current month in MM format
                const getMonthData = retrieveWeeklyStatistics(); 
                const monthArray = [];
                const weeklySummary = {}; // Object to hold aggregated week data
            
                Object.keys(getMonthData).forEach(weekKey => {
                    const weekData = getMonthData[weekKey];
            
                    let weeklyTotal = 0; // To accumulate week total
            
                    weekData.forEach(day => {
                        const dayDate = day.date; 
                        const dayValue = day.value;
            
                        if (dayDate.startsWith(localMonth)) {
                            if (isMonthExpanded) {
                                // Show individual days
                                monthArray.push({ name: dayDate, Minutes: dayValue });
                                setStatisticValue("statistics-container-time-width", 1100);
                            } else {
                                // Aggregate data per week
                                weeklyTotal += dayValue;
                            }
                        }
                    });
            
                    if (!isMonthExpanded) {
                        // Push weekly data (showing sum of days)
                        weeklySummary[weekKey] = { name: `Week ${weekKey.split("k")[1]}`, Minutes: weeklyTotal };
                        setStatisticValue("statistics-container-time-width", 700);
                    }
                });
            
                return isMonthExpanded ? monthArray : Object.values(weeklySummary);                
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

    // Checks if statistics are available in localStorage, otherwise initializes them
    const checkMonthlyAvailability = () => {
        const storedStats = JSON.parse(localStorage.getItem("monthlyStatistics"));

        if (!storedStats) {
            // Store the default statistics in localStorage if they don’t exist
            localStorage.setItem("monthlyStatistics", JSON.stringify(monthlyStatistics));
        }
    };


    /* Function to display the statistics using the name and this also can also act as getStatistics("stat-name") lol
    think of it as a way to display the statistics to the user or to the function */
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

        if (statObject) {
            // Update the value
            statObject.value += value;

            // Save updated statistics back to localStorage
            localStorage.setItem("userStatistics", JSON.stringify(storedStats));

            return statObject.value; // Return the updated value
        }
        return 0;
    };

    // Function to set a statistic to a certain value
    const setStatisticValue = (stat, value) => {
        const storedStats = JSON.parse(localStorage.getItem("userStatistics")) || []; // Parse the stored JSON

        // Find the statistic object by name
        const statistic = storedStats.find(statistics => statistics.name === stat);

        if (statistic) {
            // Set the value to value
            statistic.value = value;

            // Save the updated stats back to localStorage
            localStorage.setItem("userStatistics", JSON.stringify(storedStats));

            // Return the reset value (0)
            return statistic.value;
        }

        return 0; // Return 0 if the statistic wasn't found
    };

    // Gets the date from monthlyStatistics and get the value
    const getValueFromDate = (date) => {
        const storedStats =  JSON.parse(localStorage.getItem("monthlyStatistics")) || []; 

        // Find the statistic object by date
        const statistic = storedStats.find(statistics => statistics.date === date);


        return statistic ? statistic.value : 0; // Return the value or default to 0
    };


    return (
        <StatisticsContext.Provider value={{ checkStatisticsAvailability, checkMonthlyAvailability, data, dataType, setDataType, displayStatistics, updateStatistics, convertTotalTimeTracker, getDaysInMonth, getTodaysDate, userStatistics, storeTimeTracked, breakDownMonthlyStatistics, setIsMonthExpanded, isMonthExpanded, monthCheckboxVisibility, setMonthCheckboxVisibility }}>
            {children}
        </StatisticsContext.Provider>
    );
};

export { StatisticsProvider, StatisticsContext };
