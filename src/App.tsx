// src/App.tsx
import React, { useState, useEffect } from 'react';
import AddressInput from './components/AddressInput';
import TimeRangeSelector from './components/TimeRangeSelector';
import BalanceChart from './components/BalanceChart';
import { useBalanceTracker } from './hooks/useBalanceTracker';

interface BalanceEntry {
  timestamp: number;
  balance: string;
}

const App: React.FC = () => {
  const [address, setAddress] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [data, setData] = useState<BalanceEntry[]>([]);

  useBalanceTracker(address, 60000); // Fetch balance every 60 seconds

  const handleAddressSubmit = (addr: string) => {
    setAddress(addr);
    localStorage.setItem('balanceData', '[]'); // Reset data when new address is entered
  };

  const handleRangeChange = (fromDate: string, toDate: string) => {
    setFrom(fromDate);
    setTo(toDate);
  };

  useEffect(() => {
    const allData: BalanceEntry[] = JSON.parse(localStorage.getItem('balanceData') || '[]');
    const fromTime = from ? new Date(from).getTime() : 0;
    const toTime = to ? new Date(to).getTime() : Date.now();
    const filteredData = allData.filter((entry) => entry.timestamp >= fromTime && entry.timestamp <= toTime);
    setData(filteredData);
  }, [from, to, address]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>ETH Balance Tracker</h1>
      <AddressInput onSubmit={handleAddressSubmit} />
      <TimeRangeSelector from={from} to={to} onChange={handleRangeChange} />
      <BalanceChart data={data} />
    </div>
  );
};

export default App;
