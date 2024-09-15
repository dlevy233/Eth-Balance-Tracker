import React, { useState, useEffect } from 'react';
import TimeRangeSelector from './TimeRangeSelector';
import BalanceDisplay from './BalanceDisplay';

const App: React.FC = () => {
  const [balances, setBalances] = useState<{ timestamp: number; balance: number }[]>([]);
  const [startTime, setStartTime] = useState<number>(Math.floor(Date.now() / 1000) - 86400 * 7); // 7 days ago
  const [endTime, setEndTime] = useState<number>(Math.floor(Date.now() / 1000)); // Current time

  const fetchBalances = (start: number, end: number) => {
    fetch(`/api/balances?start=${start}&end=${end}`)
      .then((response) => response.json())
      .then((data) => setBalances(data))
      .catch((err) => console.error('Error fetching balances:', err));
  };

  useEffect(() => {
    // Fetch balances when the component loads
    fetchBalances(startTime, endTime);
  }, [startTime, endTime]);

  return (
    <div>
      <h1>Ethereum Balance Tracker</h1>
      <TimeRangeSelector
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
      />
      <BalanceDisplay balances={balances} startTime={startTime} endTime={endTime} />
    </div>
  );
};

export default App;
