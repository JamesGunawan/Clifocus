import React, { use, useContext, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import "../statistics/Statistics.css"
import '../theme/colorTheme.css'

// Context APIs
import { SettingsContext } from "../../context/SettingsContext";  
import { StatisticsContext } from "../../context/StatisticsContext";
import Switch from "../common/Switch";

function Statistics() {
    const { colorTheme } = useContext(SettingsContext);
    const { data, dataType, setDataType, displayStatistics, setIsMonthExpanded, isMonthExpanded, monthCheckboxVisibility, setMonthCheckboxVisibility} = useContext(StatisticsContext);
    const timeWidth = displayStatistics("statistics-container-time-width");

    return (
        <>
        <div className={`statistics-container ${colorTheme}`}>
            <h1>Statistics</h1>
            <div className={`statistics-holder ${colorTheme}`}>
                <p>Total Finish Time</p>
                <p>{displayStatistics("times-finished")}</p>
            </div>

            <div className={`statistics-holder ${colorTheme}`}>
                <p>Total Times Stopped</p>
                <p>{displayStatistics("times-stopped")}</p>
            </div>
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