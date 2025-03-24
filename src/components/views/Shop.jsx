import { useState, useEffect } from "react";
import "../shop/Shop.css";

function UpgradeItem({ upgrade, onPurchase }) {
    const [isHovered, setIsHovered] = useState(false);

    // Calculate the current price based on level and price multiplier
    const currentPrice = Math.floor(upgrade.basePrice * Math.pow(upgrade.priceMultiplier, upgrade.level));

    // Locked state: If the level is 0 and the user hasn't met the unlockRequirement
    const isLocked = upgrade.level === 0 && upgrade.unlockRequirement > 0;

    return (
        <div
            className={`upgrade-item ${isLocked ? "locked" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={!isLocked ? () => onPurchase(upgrade) : null}
        >
            <div className="upgrade-name">{upgrade.name}</div>
            
            <div className="upgrade-price">
                <span>Cost: {currentPrice}</span>
                <img src="/tockens.png" alt={upgrade.currency} className="currency-icon" />
            </div>

            <div className="upgrade-level">Level: {upgrade.level}</div>

            {isHovered && (
                <div className="upgrade-tooltip">
                    <p>{upgrade.description}</p>
                    {upgrade.unlockRequirement > 0 && <p>Unlocks at: {upgrade.unlockRequirement} clicks</p>}
                </div>
            )}

            {isLocked && <div className="lock-overlay">🔒</div>}
        </div>
    );
}

function Shop() {
    const [shopItems, setShopItems] = useState([]);

    // Fetch shop items from localStorage when the component mounts
    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("shopItems"));
        if (storedItems) {
            setShopItems(storedItems);
        }
    }, []);

    const handlePurchase = (upgrade) => {
        // Purchase logic here, such as deducting currency, upgrading, etc.
        console.log(`Purchasing: ${upgrade.name}`);
    };

    return (
        <div className="shop-container">
            {shopItems.map((item, index) => (
                <UpgradeItem key={index} upgrade={item} onPurchase={handlePurchase} />
            ))}
        </div>
    );
}

export default Shop;
