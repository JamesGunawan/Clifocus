import { useEffect } from "react";
import "../shop/Shop.css";

function ClickEffect({ clickElement }) {
    const handleClick = (event) => {
        const gameStats = JSON.parse(localStorage.getItem("gameStatistics")) || [];
        const clickStat = gameStats.find(stat => stat.name === "click-value");
        const clickValue = clickStat ? clickStat.value : 1;

        // Get cursor position
        const x = event.clientX;
        const y = event.clientY;

        // Create floating number
        const floatingNumber = document.createElement("div");
        floatingNumber.className = "floating-number";
        floatingNumber.innerText = `+${clickValue}`;
        document.body.appendChild(floatingNumber);

        // Position it at cursor
        floatingNumber.style.left = `${x}px`;
        floatingNumber.style.top = `${y}px`;

        // Remove after animation
        setTimeout(() => {
            floatingNumber.remove();
        }, 1000);
    };

    useEffect(() => {
        if (clickElement) {
            clickElement.addEventListener("click", handleClick);
        }
        return () => {
            if (clickElement) {
                clickElement.removeEventListener("click", handleClick);
            }
        };
    }, [clickElement]);

    return null;
}

export default ClickEffect;
