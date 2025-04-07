import { createContext, useContext, useEffect, useState } from "react";
import { SettingsContext } from "./SettingsContext";

const GameContext = createContext(null);

// Define initial currencies
const gameCurrencies = [
    { name: "Tockens", icon: "/tockens.png", value: 0 },
    { name: "Time Crystal", icon: "/timeCrystal.png", value: 0 }
];

const gameStatistics = [
    { name: "click-value", value: 1 },
    { name: "time-value", value: 1 }
];

const shopItems = [
    {
        name: "Worn-out Clicks",      // The name of the upgrade
        id: 1,                         // The unique id of the upgrade
        currency: "Tockens",         // What currency is used to buy it
        price: 10,               // Initial price before scaling
        priceMultiplier: 1.07,       // How much the price increases after each purchase (1.15 = 15% increase, 1.1 = 10% increase)
        level: 0,                    // How many times this upgrade has been purchased
        maxLevel: Infinity,          // Limit the number of purchases
        effect: 1,                   // The impact of the upgrade (e.g., +1 to click power)
        type: "click-value",         // The type of upgrade (click boost, auto-gen, etc.)
        description: "Your clicks feel sluggish, but they still count. (+1 click power)", // Text explaining the upgrade
        unlockRequirement: 0,        // Requires X total of the previous upgrades
        tierBreakpoints: 25,        // Breakpoints that requires premium currency for unlocking gated upgrades (e.g., 24, 49, 74, 99, etc)
        requiredCrystals: 1          // Required crystals to unlock the upgrade from the breakpoint 
    },
    {
        name: "Empowered Clicks",
        id: 2, 
        currency: "Tockens",
        price: 20,
        priceMultiplier: 1.07,
        level: 0,
        maxLevel: Infinity,
        effect: 2,
        type: "click-value",
        description: "Your clicks feel powerful! (+2 click power)",
        unlockRequirement: 25,
        tierBreakpoints: 25,
        requiredCrystals: 1         
    },
    {
        name: "Turbo Clicks",
        id: 3, 
        currency: "Tockens",
        price: 80,
        priceMultiplier: 1.08,
        level: 0,
        maxLevel: Infinity,
        effect: 4,
        type: "click-value",
        description: "Your fingers move at turbo speed! (+4 click power)",
        unlockRequirement: 30,
        tierBreakpoints: 25,
        requiredCrystals: 1         
    },
    {
        name: "Hyper Clicks",
        id: 4, 
        currency: "Tockens",
        price: 300,
        priceMultiplier: 1.09,
        level: 0,
        maxLevel: Infinity,
        effect: 10,
        type: "click-value",
        description: "Your clicks are infused with raw energy! (+10 click power)",
        unlockRequirement: 35,
        tierBreakpoints: 25,
        requiredCrystals: 2         
    },
    {
        name: "Quantum Clicks",
        id: 5, 
        currency: "Tockens",
        price: 1_500,
        priceMultiplier: 1.10,
        level: 0,
        maxLevel: Infinity,
        effect: 25,
        type: "click-value",
        description: "You tap into quantum mechanics to bend reality! (+25 click power)",
        unlockRequirement: 40,
        tierBreakpoints: 20,
        requiredCrystals: 2         
    },
    {
        name: "Chrono Clicks",
        id: 6, 
        currency: "Tockens",
        price: 7_500,
        priceMultiplier: 1.11,
        level: 0,
        maxLevel: Infinity,
        effect: 75,
        type: "click-value",
        description: "Your clicks transcend time itself! (+75 click power)",
        unlockRequirement: 50,
        tierBreakpoints: 20,
        requiredCrystals: 3         
    },
    {
        name: "Singularity Clicks",
        id: 7, 
        currency: "Tockens",
        price: 50_000,
        priceMultiplier: 1.13,
        level: 0,
        maxLevel: Infinity,
        effect: 200,
        type: "click-value",
        description: "Your clicks are the force of the universe collapsing into a single point! (+200 click power)",
        unlockRequirement: 55,
        tierBreakpoints: 20,
        requiredCrystals: 4         
    },
    {
        name: "Cosmic Clicks",
        id: 8, 
        currency: "Tockens",
        price: 250_000,
        priceMultiplier: 1.14,
        level: 0,
        maxLevel: Infinity,
        effect: 500,
        type: "click-value",
        description: "Your clicks unleash cosmic forces! (+500 click power)",
        unlockRequirement: 60,
        tierBreakpoints: 15,
        requiredCrystals: 5         
    }
];

const GameProvider = ({ children }) => {
    const { isOnBreak, progressBarState, playAudio } = useContext(SettingsContext);
    const onBreakClass = isOnBreak && progressBarState ? 'on-break' : '';
    const [currencies, setCurrencies] = useState(gameCurrencies); // Store in state
    const [tockens, setTockens] = useState(() => {
        const storedCurrencies = JSON.parse(localStorage.getItem("gameCurrencies")) || [];
        return storedCurrencies.find(currency => currency.name === "Tockens")?.value || 0;
    });

    let hasRun = false;
    useEffect(() => {
        if (!hasRun) {
            hasRun = true;
            // Initialize currencies from localStorage on initial mount
            const storedCurrencies = JSON.parse(localStorage.getItem("gameCurrencies"));
            if (storedCurrencies) {
                setCurrencies(storedCurrencies); // Set currencies from localStorage
            } else {
                localStorage.setItem("gameCurrencies", JSON.stringify(gameCurrencies));
            }
        }
    }, []);

    // Listen for changes in localStorage (e.g., from other components or tabs)
    useEffect(() => {
        const handleStorageChange = () => {
            const storedCurrencies = JSON.parse(localStorage.getItem("gameCurrencies")) || [];
            const updatedTockens = storedCurrencies.find(currency => currency.name === "Tockens")?.value || 0;
            setTockens(updatedTockens);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // This is a function that calls addCurrency, it generates the specified amount of currency and returns it to the localStorage
    const generateCurrency = (currencyName) => {
        const currencyMapping = {
            "Tockens": "click-value",
            "Time Crystal": "time-value"
        };
    
        const gameStatistics = JSON.parse(localStorage.getItem("gameStatistics")) || [];
    
        // Get the corresponding stat name for the given currency
        const statName = currencyMapping[currencyName];
    
        if (!statName) {
            console.error("Invalid currency name:", currencyName);
            return;
        }
    
        // Find the statistic value
        const statEntry = gameStatistics.find(stat => stat.name === statName);
    
        if (!statEntry) {
            console.error("Statistic not found for:", statName);
            return;
        }
    
        const newCurrency = addCurrency(currencyName, statEntry.value);
        updateCurrencyInLocalStorage(newCurrency);
    };      

    // Helper function to add the specified amount of currency and the amount of it
    const addCurrency = (currencyName, amount) => {
        // Retrieve the latest currency data from localStorage
        const storedCurrencies = JSON.parse(localStorage.getItem("gameCurrencies")) || currencies;
        
        const currentCurrency = storedCurrencies.find(currency => currency.name === currencyName)?.value || 0;
        return { name: currencyName, value: currentCurrency + amount };
    };
    

    // Helper function to update the currency in local storage
    const updateCurrencyInLocalStorage = (newCurrency) => {
        // Get the latest currency values before updating
        const storedCurrencies = JSON.parse(localStorage.getItem("gameCurrencies")) || currencies;
        
        const updatedCurrencies = storedCurrencies.map(currency =>
            currency.name === newCurrency.name ? { ...currency, value: newCurrency.value } : currency
        );
    
        setCurrencies(updatedCurrencies); // Update the state
        localStorage.setItem("gameCurrencies", JSON.stringify(updatedCurrencies)); // Sync with localStorage
    };
    

    // Checks if statistics are available in localStorage, otherwise initializes them
    const checkGameStats = () => {
        const storedStats = JSON.parse(localStorage.getItem("gameCurrencies"));
        const storedStats2 = JSON.parse(localStorage.getItem("gameStatistics"));
        const storedStats3 = JSON.parse(localStorage.getItem("shopItems"))

        if (!storedStats || !storedStats2 || !storedStats3) {
            // Store the default statistics in localStorage if they don’t exist
            localStorage.setItem("gameCurrencies", JSON.stringify(gameCurrencies));
            localStorage.setItem("gameStatistics", JSON.stringify(gameStatistics));
            localStorage.setItem("shopItems", JSON.stringify(shopItems));
        }
    };

    // Click effect to make it look nice
    const createFloatingNumber = (event) => {
        const gameStats = JSON.parse(localStorage.getItem("gameStatistics")) || [];
        const clickStat = gameStats.find(stat => stat.name === "click-value");
        const clickValue = clickStat ? clickStat.value : null;

        // Get cursor position
        const x = event.clientX;
        const y = event.clientY;

        // Create floating number
        const floatingNumber = document.createElement("div");
        floatingNumber.className = "floating-number";
        floatingNumber.innerHTML = `+${clickValue} <img src="/tockens.png" class="floating-token-icon">`;
        document.body.appendChild(floatingNumber);

        // Position it at cursor
        floatingNumber.style.left = `${x}px`;
        floatingNumber.style.top = `${y}px`;

        // Remove after animation
        setTimeout(() => {
            floatingNumber.remove();
        }, 1000);
    };

      // Function to update a statistic by name and value
      // Same function from StatisticsContext but imported here because we can't import it directly since GameContext is above StatisticsContext in the tree
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

    // Check the click so the user can't cheat
    const validateClick = (event) => {
        // Check if the clicked element is the stop button, if stop button = no currency
        if (event.target.classList.contains("stop-button")) {
            return;
        }
        if (onBreakClass) {
            generateCurrency("Tockens");
            updateStatistics("total-game-clicks", 1)
            createFloatingNumber(event);
            playAudio("/coinGain.mp3");
        } else {
            return;
        }
    };

    return (
        <GameContext.Provider value={{ onBreakClass, checkGameStats, generateCurrency, validateClick, updateCurrencyInLocalStorage, tockens, currencies }}>
            {children}
        </GameContext.Provider>
    );
}

export { GameContext, GameProvider }
