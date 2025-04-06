import React, { useContext } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import "../statistics/Statistics.css"
import '../theme/colorTheme.css'

// Context APIs
import { SettingsContext } from "../../context/SettingsContext";   
import { StatisticsContext } from "../../context/StatisticsContext";
import Switch from "../common/Switch";

function Statistics() {
    const { colorTheme } = useContext(SettingsContext);
    const { data, dataType, setDataType, displayStatistics, setIsMonthExpanded, isMonthExpanded, setMonthCheckboxVisibility} = useContext(StatisticsContext);
    const timeWidth = displayStatistics("statistics-container-time-width");
    const userStatistics = JSON.parse(localStorage.getItem("userStatistics"));
    const displayedStats = ["times-finished", "times-stopped", "total-game-clicks", "total-breaks-skipped", "total-achievement"]; // Manual input field to choose what stats to display

    return (
        <>
        <div className={`statistics-container ${colorTheme}`}>
            <h1>Statistics</h1>
            {userStatistics
                .filter(stat => displayedStats.includes(stat.name)) // Only show selected stats
                .map(stat => (
                    <div key={stat.name} className={`statistics-holder ${colorTheme}`}>
                        <p>{stat.title}</p>
                        <p>{displayStatistics(stat.name)}</p>
                    </div>
                ))
            }
        </div>

        <div className="statistics-container-time">
            <div className="statistics-type">
               {/* Pass functions to update state */}
                <button onClick={() => { setDataType("Day"), setMonthCheckboxVisibility("hiddens") }} className="statistics-button">Today</button>
                <button onClick={() => { setDataType("Week"), setMonthCheckboxVisibility("hiddens") }} className="statistics-button">This Week</button>
                <button onClick={() => { setDataType("Month"), setMonthCheckboxVisibility("visibles") }} className="statistics-button">This Month</button>
                <div>
                    <Switch checked={isMonthExpanded} onChange={() => setIsMonthExpanded(prev => !prev)}/>
                </div>
               
            </div>
            <h1>Total Focus Time</h1>
            <LineChart width={timeWidth} height={300} data={data(dataType)} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
            <Line type="monotone" dataKey="Minutes" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" tick={`anythig`} />
            <YAxis />
            <Tooltip />
            </LineChart>
        </div>
        </>
    )
}

export default Statistics;