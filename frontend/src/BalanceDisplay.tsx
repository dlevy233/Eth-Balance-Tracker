import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Balance {
  timestamp: number;
  balance: number;
}

interface BalanceDisplayProps {
  balances: Balance[];
  startTime: number;
  endTime: number;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balances, startTime, endTime }) => {
  // Filter balances based on the selected time range
  const filteredBalances = balances.filter(
    (balance) => balance.timestamp >= startTime && balance.timestamp <= endTime
  );

  // Format large numbers for the Y-axis (balance values)
  const formatBalance = (balance: number) => {
    if (balance >= 1e6) {
      return balance.toExponential(2);
    }
    return balance;
  };

  return (
    <div>
      <h2>Balance History</h2>
      {filteredBalances.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredBalances} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => new Date(timestamp * 1000).toLocaleDateString()}
            />
            <YAxis
              dataKey="balance"
              tickFormatter={(balance) => formatBalance(balance)}
            />
            <Tooltip
              labelFormatter={(timestamp) => new Date(timestamp * 1000).toLocaleString()}
            />
            <Line type="monotone" dataKey="balance" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>No balance data available for this time range.</p>
      )}
    </div>
  );
};

export default BalanceDisplay;
