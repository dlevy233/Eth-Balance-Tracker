import React, { useState } from 'react';
import BalanceChart from './BalanceChart';
import TimeRangeSelector from './TimeRangeSelector';

const App: React.FC = () => {
  const [startTime, setStartTime] = useState<number>(
    Math.floor(Date.now() / 1000) - 86400
  ); // Default to 24 hours ago
  const [endTime, setEndTime] = useState<number>(
    Math.floor(Date.now() / 1000)
  ); // Current time

  return (
    <div style={{ padding: '20px' }}>
      <h1>ETH Balance Tracker</h1>
      <TimeRangeSelector
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
      />
      <BalanceChart startTime={startTime} endTime={endTime} />
    </div>
  );
};

export default App;
