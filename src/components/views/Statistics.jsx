import React, { useContext, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import "../statistics/Statistics.css"
import '../theme/colorTheme.css'
import { SettingsContext } from "../../context/SettingsContext";  
import { StatisticsContext } from "../../context/StatisticsContext";

function Statistics() {
    const { colorTheme } = useContext(SettingsContext);
    const { data, dataType, setDataType, displayStatistics, checkStatisticsAvailability} = useContext(StatisticsContext);
    
    return (
        <>
        <div className={`statistics-container ${colorTheme}`}>
            <h1>Statistics</h1>
            <div className={`statistics-holder ${colorTheme}`}>
                <p>Total Finish Time</p>
                <p>{displayStatistics("times-stopped")}</p>
            </div>

            <div className={`statistics-holder ${colorTheme}`}>
                <p>Total Times Stopped</p>
                <p>{displayStatistics("times-finished")}</p>
            </div>
        </div>

        <div className="statistics-container">
            <div className="statistics-type">
               {/* Pass functions to update state */}
               <button onClick={() => setDataType("Day")}>Today</button>
                <button onClick={() => setDataType("Week")}>This Week</button>
                <button onClick={() => setDataType("Month")}>This Month</button>
            </div>
            <h1>Total Focus Time</h1>
            <LineChart width={500} height={300} data={data(dataType)} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
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