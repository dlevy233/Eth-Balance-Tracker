# ETH Balance Tracker

A simple app that queries and stores the ETH balance of a configurable Base wallet and visualizes the data in a time-series graph.

## Stack
- **Backend**: Python, Flask, SQLite/PostgreSQL, ethers.py
- **Frontend**: React, Plotly.js, Axios

## How It Works
1. **Backend**: Periodically queries the ETH balance of a wallet address using ethers.py and stores it in a database.
2. **Flask API**: Serves balance data via `/balances` endpoint.
3. **Frontend**: React app fetches and visualizes balance history as a time-series graph using Plotly.js.
