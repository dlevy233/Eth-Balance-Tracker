# **ETH Balance Tracker**

A simple app that queries and stores the ETH balance of a Base wallet and displays the data in a time-series graph.

## **Stack**
- **Frontend**: React, TypeScript, Vite, Recharts
- **Backend**: Go, SQLite, `go-ethereum`

## **How It Works**
1. **Periodic Balance Query**: The Go backend queries the ETH balance of a configurable wallet at a specified interval (default: every minute).
2. **Data Storage**: The balance data is stored in a SQLite database.
3. **Visualization**: The frontend displays the balance history as a time-series graph.
4. **Time Range Adjustment**: Users can adjust the time window for balance data visualization.

## **Running the Application**

### **Backend (Go)**
1. Clone the repository and navigate to the backend:
    ```bash
    git clone https://github.com/yourusername/eth-balance-tracker.git
    cd eth-balance-tracker/backend
    ```
2. Set up the `.env` file in the `backend` directory with the following environment variables:
    ```bash
    WALLET_ADDRESS=<Your-Ethereum-Wallet-Address>
    RPC_ENDPOINT=<Your-RPC-Endpoint>
    QUERY_INTERVAL=60       # Time interval for querying the balance in seconds
    PORT=8080               # Port for the backend server
    ```

    Example `.env`:
    ```bash
    WALLET_ADDRESS=0xYourEthereumWalletAddress
    RPC_ENDPOINT=https://api.developer.coinbase.com/rpc/v1/base/123
    QUERY_INTERVAL=60
    PORT=8080
    ```

3. Install dependencies and run the backend:
    ```bash
    go run main.go
    ```

The backend will start on `http://localhost:8080` and begin querying the ETH balance based on the specified interval (`QUERY_INTERVAL`).

### **Frontend (React + Vite)**
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2. Set up the `.env` file in the `frontend` directory with the following:
    ```bash
    VITE_BACKEND_URL=http://localhost:8080
    ```

3. Install dependencies and run the frontend:
    ```bash
    npm install
    npm run dev
    ```

The frontend will be available at `http://localhost:5173`.

## **Environment Variables**

### **Frontend**
- `VITE_BACKEND_URL`: URL of the backend (e.g., `http://localhost:8080`).

### **Backend**
- `WALLET_ADDRESS`: Ethereum wallet to track.
- `RPC_ENDPOINT`: Ethereum RPC endpoint.
- `QUERY_INTERVAL`: Time interval (in seconds) for querying the balance.
- `PORT`: Port the backend server listens on.

## **Project Structure**
```bash
eth-balance-tracker/
├── backend/       # Go backend for balance querying and storage
├── frontend/      # React frontend for visualization
