# **ETH Balance Tracker**

A simple app that queries and stores the ETH balance of a configurable Base wallet and displays the data in a time-series graph.

## **Stack**
- **Frontend**: React, TypeScript, Vite, Recharts
- **Backend**: Go, SQLite, `go-ethereum`

## **How It Works**
1. **Periodic Balance Query**: The Go backend queries the ETH balance of a configurable wallet every minute.
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
2. Set up the `.env` file with:
    ```bash
    WALLET_ADDRESS=<Your-Ethereum-Wallet-Address>
    RPC_ENDPOINT=<Your-RPC-Endpoint>
    PORT=8080
    ```
3. Install dependencies and run the backend:
    ```bash
    go mod tidy
    go run main.go
    ```

### **Frontend (React + Vite)**
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2. Set up the `.env.local` file with:
    ```bash
    VITE_BACKEND_URL=http://localhost:8080
    ```
3. Install dependencies and run the frontend:
    ```bash
    npm install
    npm run dev
    ```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:8080`.

## **Environment Variables**

### **Frontend**
- `VITE_BACKEND_URL`: URL of the backend (`http://localhost:8080` for local development).

### **Backend**
- `WALLET_ADDRESS`: Ethereum wallet to track.
- `RPC_ENDPOINT`: Ethereum RPC endpoint.
- `PORT`: Port the backend server listens on.

## **Project Structure**
```bash
eth-balance-tracker/
├── backend/       # Go backend for balance querying and storage
├── frontend/      # React frontend for visualization
