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

## **Deployment**

### **Backend Deployment**
- Host the backend (e.g., Heroku, AWS) and ensure the environment variables are set.

### **Frontend Deployment (Vercel)**
1. Add `VITE_BACKEND_URL=<Your-Production-Backend-URL>` in Vercel’s environment variables.
2. Deploy using Vercel.

## **Environment Variables**

### **Frontend (Vercel)**
- `VITE_BACKEND_URL`: URL of the backend.

### **Backend (Heroku/Local)**
- `WALLET_ADDRESS`: Ethereum wallet to track.
- `RPC_ENDPOINT`: Ethereum RPC endpoint.
- `PORT`: Port the backend server listens on.

## **Project Structure**
```bash
eth-balance-tracker/
├── backend/       # Go backend for balance querying and storage
├── frontend/      # React frontend for visualization
