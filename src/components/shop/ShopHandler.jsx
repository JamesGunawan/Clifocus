import { useContext, useState } from "react";
import { GameContext } from "../../context/GameContext";
import { SettingsContext } from "../../context/SettingsContext";

const UpgradeItem = ({ upgrade, setShopItems }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { updateCurrencyInLocalStorage } = useContext(GameContext);
    const { playAudio, colorTheme } = useContext(SettingsContext);

    // Retrieve shop items once to avoid duplication
    const shopItems = JSON.parse(localStorage.getItem("shopItems")) || [];
    const shopItem = shopItems.find(item => item.id === upgrade.id);

    if (!shopItem) return null; // Prevent errors if shopItem is undefined

    const levelBreakpoint = shopItem.tierBreakpoints;
    const isBreakpointLevel = (upgrade.level + 1) % levelBreakpoint === 0; // Determine if next level requires Time Crystal

    // Calculate the current price based on level and price multiplier
    const currentPrice = Math.floor(upgrade.price * Math.pow(upgrade.priceMultiplier, upgrade.level));

    // Find the previous upgrade based on ID
    const previousUpgrade = shopItems.find(item => item.id === upgrade.id - 1);

    // Locked state: If previous upgrade exists, check if its level meets the unlock requirement
    const isLocked = previousUpgrade ? previousUpgrade.level < upgrade.unlockRequirement : false;

    const handlePurchase = () => {
        const usersGameStat = JSON.parse(localStorage.getItem("gameStatistics")) || [];
        const gameCurrencies = JSON.parse(localStorage.getItem("gameCurrencies")) || [];

        const playerCurrencyObj = gameCurrencies.find(currency => currency.name === upgrade.currency);
        if (!playerCurrencyObj || playerCurrencyObj.value < currentPrice) {
            console.log("Not enough currency to purchase this upgrade");
            return;
        }

        const isBreakpointLevel = (upgrade.level + 1) % levelBreakpoint === 0;

        // If it's a breakpoint level, check Time Crystal requirement
        if (isBreakpointLevel) {
            const playerTimeCrystal = gameCurrencies.find(currency => currency.name === "Time Crystal");
            const requiredCrystals = upgrade.requiredCrystals || 1; // Default to 1 if not specified

            if (!playerTimeCrystal || playerTimeCrystal.value < requiredCrystals) {
                console.log(`Not enough Time Crystals. You need ${requiredCrystals}, but you have ${playerTimeCrystal ? playerTimeCrystal.value : 0}.`);
                return;
            }

            playerTimeCrystal.value -= requiredCrystals; // Deduct the required amount of Time Crystals
            console.log(`${requiredCrystals} Time Crystal(s) deducted.`);
        }

        // Deduct Tockens
        playerCurrencyObj.value -= currentPrice;

        // Update currencies in localStorage
        localStorage.setItem("gameCurrencies", JSON.stringify(gameCurrencies));

        // Increase upgrade level
        const newUpgrade = { ...upgrade, level: upgrade.level + 1 };

        // Update shop items in localStorage
        const updatedUpgrades = shopItems.map(item =>
            item.id === upgrade.id ? newUpgrade : item
        );
        localStorage.setItem("shopItems", JSON.stringify(updatedUpgrades));

        // Update game statistics (if relevant)
        const updatedStats = usersGameStat.map(stat =>
            stat.name === "click-value" ? { ...stat, value: stat.value + upgrade.effect } : stat
        );
        localStorage.setItem("gameStatistics", JSON.stringify(updatedStats));

        // **Update state to trigger re-render**
        setShopItems(updatedUpgrades);

        // Update Tockens value in localStorage after purchase
        updateCurrencyInLocalStorage({ name: "Tockens", value: playerCurrencyObj.value });

        // Play audio for successful purchase
        console.log("audio for shop played");
        playAudio("/shopPurchase.mp3");

        console.log("Upgrade purchased:", newUpgrade);
    };

    return (
        <div
            className={`upgrade-item ${colorTheme} ${isLocked ? "locked" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={!isLocked ? handlePurchase : null}
        >
            <div className="upgrade-name">{upgrade.name}</div>

            <div className="upgrade-price">
                <span>Cost: {currentPrice}</span>
                <img src="/tockens.png" alt={upgrade.currency} className="currency-icon" />

                {isBreakpointLevel && (
                    <>
                        <span> + {upgrade.requiredCrystals || 1}</span>
                        <img src="/timeCrystal.png" alt="Time Crystal" className="currency-icon timeCrystal" />
                    </>
                )}
            </div>

            <div className="upgrade-level">Level: {upgrade.level}</div>

            {isHovered && (
                <div className="upgrade-tooltip">
                    <p>{upgrade.description}</p>
                </div>
            )}

            {isLocked && (
                <div className="lock-overlay">
                    🔒
                    {upgrade.unlockRequirement > 0 && (
                        <p className="lock-tooltip">Unlocks when previous upgrade reaches level {upgrade.unlockRequirement}</p>
                    )}
                </div>
            )}
        </div>
    );
};


export { UpgradeItem };
