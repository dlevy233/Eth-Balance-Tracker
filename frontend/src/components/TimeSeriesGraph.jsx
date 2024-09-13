import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

function TimeSeriesGraph() {
    const [balances, setBalances] = useState([]);
    const [timestamps, setTimestamps] = useState([]);

    useEffect(() => {
        fetchBalances();
    }, []);

    const fetchBalances = async () => {
        try {
            const response = await axios.get('http://localhost:5000/balances');
            const data = response.data;

            // Extract timestamps and balances for the graph
            const balanceData = data.map(entry => entry.balance);
            const timestampData = data.map(entry => entry.timestamp);

            setBalances(balanceData);
            setTimestamps(timestampData);
        } catch (error) {
            console.error('Error fetching balances:', error);
        }
    };

    return (
        <div>
            <h2>ETH Balance Over Time</h2>
            <Plot
                data={[
                    {
                        x: timestamps,
                        y: balances,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'blue' },
                    },
                ]}
                layout={{ title: 'ETH Balance' }}
            />
        </div>
    );
}

export default TimeSeriesGraph;
