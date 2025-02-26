import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import "../statistics/Statistics.css"

function Statistics() {
    const data = [{name: 'Today', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 400, pv: 2400, amt: 2400}]
    return (
        <>
        <div className="statistics-container">
            <p>Total Focus Time</p>
            <LineChart width={500} height={300} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            </LineChart>
        </div>
        </>
    )
}

export default Statistics;