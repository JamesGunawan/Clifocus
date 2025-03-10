import React, { useContext } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import "../statistics/Statistics.css"
import getStatistics from "../statistics/StatisticsDisplayer";
import '../theme/colorTheme.css'
import { SettingsContext } from "../context/SettingsContext";

function Statistics() {
    const { colorTheme } = useContext(SettingsContext);
    const { 
        timesFinished,
        timesStopped
    } = getStatistics();
    const data = [{name: 'Today', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 400, pv: 2400, amt: 2400}]
    return (
        <>
        {/* temporarily commented, this is a graph chart but for now i'm just going to display it using numbers instead of a graph */}
        {/* <div className="statistics-container">
            <p>Total Focus Time</p>
            <LineChart width={500} height={300} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            </LineChart>
        </div> */}
        <div className={`statistics-container ${colorTheme}`}>
            <h1>Statistics</h1>
            <div className={`statistics-holder ${colorTheme}`}>
                <p>Total Focus Time</p>
                <p>{timesFinished}</p>
            </div>

            <div className={`statistics-holder ${colorTheme}`}>
                <p>Total times stopped</p>
                <p>{timesStopped}</p>
            </div>
        </div>
        </>
    )
}

export default Statistics;