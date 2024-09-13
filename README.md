# ETH Balance Tracker
A simple app that queries and stores the ETH balance of a configurable Base wallet and visualizes the data in a time-series graph.

## Stack
- **Frontend**: React, TypeScript, Vite, viem, Chart.js

## How It Works

1. **Periodic Balance Query**: The app uses viem to periodically query the ETH balance of a configurable wallet address.
2. **Local Data Storage**: Stores balance data locally in the browser's localStorage.
3. **Visualization**: React app visualizes the balance history as a time-series graph using Chart.js.
4. **Time Range Adjustment**: Users can adjust the time window for the displayed balance data.