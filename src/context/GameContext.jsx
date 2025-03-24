import { createContext, useContext, useEffect, useState } from "react";
import { SettingsContext } from "./SettingsContext";

const GameContext = createContext(null);

// Define initial currencies
const gameCurrencies = [
    { name: "Tockens", icon: "/tockens.png", value: 0 },
    { name: "Time Crystals", icon: "/noIconYet.png", value: 0 }
];

const gameStatistics = [
    { name: "click-value", value: 1 }
];

const shopItems = [
    {
        name: "Worn-out Clicks",      // The name of the upgrade
        currency: "Tockens",         // What currency is used to buy it
        basePrice: 10,               // Initial price before scaling
        priceMultiplier: 1.15,       // How much the price increases after each purchase
        level: 0,                    // How many times this upgrade has been purchased
        maxLevel: Infinity,          // Limit the number of purchases
        effect: 1,                   // The impact of the upgrade (e.g., +1 to click power)
        type: "click-power",         // The type of upgrade (click boost, auto-gen, etc.)
        description: "Your clicks feel sluggish, but they still count. (+1 click power)", // Text explaining the upgrade
        unlockRequirement: 0,        // Requires X total clicks or another milestone
        unlockRequirementType : "none", // "none", "clicks", "level", "currency", etc
        tierBreakpoints: 0 // Breakpoints that requires premium currency for unlocking gated upgrades (e.g., 24, 49, 74, 99, etc)
    }
];

const GameProvider = ({ children }) => {
    const { isOnBreak, progressBarState } = useContext(SettingsContext);
    const onBreakClass = isOnBreak && progressBarState ? 'on-break' : '';
    
    const [currencies, setCurrencies] = useState(gameCurrencies); // Store currencies in state

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

    // This is a function that calls addCurrency, it generates the specified amount of currency and returns it to the localStorage
    const generateCurrency = (currencyName) => {
        const clickValue = JSON.parse(localStorage.getItem("gameStatistics"));
        const currentClickValue = clickValue.find(statistics => statistics.name === "click-value").value;

        const newCurrency = addCurrency(currencyName, currentClickValue);
        updateCurrencyInLocalStorage(newCurrency);
    }

    // Helper function to add the specified amount of currency and the amount of it
    const addCurrency = (currencyName, amount) => {
        const currentCurrency = currencies.find(currency => currency.name === currencyName).value;
        const addedCurrency = { name: currencyName, value: currentCurrency + amount };
        return addedCurrency;
    };

    // Helper function to update the currency in local storage
    const updateCurrencyInLocalStorage = (newCurrency) => {
        const updatedCurrencies = currencies.map(currency =>
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

    // Check the click so the user can't cheat
    const validateClick = (event) => {
        // Check if the clicked element is the trackButton
        if (event.target.classList.contains("stop-button")) {
            console.log("Click ignored: Button pressed");
            return;
        }
        if (onBreakClass) {
            generateCurrency("Tockens");
            createFloatingNumber(event);
        } else {
            return;
        }
    };

    return (
        <GameContext.Provider value={{ onBreakClass, checkGameStats, generateCurrency, validateClick, currencies }}>
            {children}
        </GameContext.Provider>
    );
}

export { GameContext, GameProvider }
