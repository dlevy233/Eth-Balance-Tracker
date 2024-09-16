import React, { useState, useEffect } from 'react';
import TimeRangeSelector from './TimeRangeSelector';
import BalanceDisplay from './BalanceDisplay';

const App: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>(''); // Wallet address state
  const [balances, setBalances] = useState<{ timestamp: number; balance: number }[]>([]);
  const [startTime, setStartTime] = useState<number>(Math.floor(Date.now() / 1000) - 86400 * 7); // 7 days ago
  const [endTime, setEndTime] = useState<number>(Math.floor(Date.now() / 1000)); // Current time
  const [error, setError] = useState<string | null>(null); // Error state
  const fetchInterval = 10000; // 10 seconds interval

  // Function to fetch balances based on the wallet address, start, and end times
  const fetchBalances = (wallet: string, start: number, end: number) => {
    if (!wallet) {
      setError('Please enter a valid wallet address');
      return;
    }

    setError(null); // Clear any previous errors

    fetch(`/api/balances?wallet=${wallet}&start=${start}&end=${end}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch balances');
        }
        return response.json();
      })
      .then((data) => setBalances(data))
      .catch((err) => {
        console.error('Error fetching balances:', err);
        setError('Failed to fetch balances. Please check the console for more details.');
      });
  };

  // Periodically fetch balances every 10 seconds
  useEffect(() => {
    if (walletAddress) {
      // Fetch initially
      fetchBalances(walletAddress, startTime, endTime);

      // Set up an interval to fetch balances periodically
      const intervalId = setInterval(() => {
        fetchBalances(walletAddress, startTime, endTime);
      }, fetchInterval);

      // Clear the interval when the component unmounts or the wallet address changes
      return () => clearInterval(intervalId);
    }
  }, [walletAddress, startTime, endTime]);

  // Handle form submission to track the wallet
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress.trim()) {
      setError('Please enter a valid wallet address');
      return;
    }
    // Fetch the balances when the wallet address is submitted
    fetchBalances(walletAddress, startTime, endTime);
  };

  return (
    <div>
      <h1>Ethereum Balance Tracker</h1>

      {/* Form to input the wallet address */}
      <form onSubmit={handleSubmit}>
        <label>
          Wallet Address:
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)} // Update wallet address state
            placeholder="Enter wallet address"
          />
        </label>
        <button type="submit">Track Wallet</button>
      </form>

      {/* Error message display */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Time range selector */}
      <TimeRangeSelector
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
      />

      {/* Balance display */}
      <BalanceDisplay balances={balances} startTime={startTime} endTime={endTime} />
    </div>
  );
};

export default App;
