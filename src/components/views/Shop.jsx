import { useState, useEffect, useContext } from "react";
import "../shop/Shop.css";
import { UpgradeItem } from "../shop/ShopHandler";
import { SettingsContext } from "../../context/SettingsContext";

function Shop() {
    const [shopItems, setShopItems] = useState([]);
    const { colorTheme } = useContext(SettingsContext)
    
    // Fetch shop items from localStorage when the component mounts
    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("shopItems"));
        if (storedItems) {
            setShopItems(storedItems);
        }
    }, []);

    return (
        <>
        <div className={`shop-container ${colorTheme}`}>
            {shopItems.map((item, index) => (
                <UpgradeItem
                    key={index}
                    upgrade={item}
                    setShopItems={setShopItems} // Pass setShopItems directly to handle re-rendering
                />
            ))}
        </div>
        </>
    );
}

export default Shop;
