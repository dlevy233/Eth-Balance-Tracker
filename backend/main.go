package main

import (
    "context"
    "database/sql"
    "encoding/json"
    "log"
    "math/big"
    "net/http"
    "os"
    "strconv"
    "time"

    _ "github.com/mattn/go-sqlite3"
    "github.com/ethereum/go-ethereum/common"
    "github.com/ethereum/go-ethereum/ethclient"
    "github.com/joho/godotenv"
)

type Balance struct {
    Timestamp int64   `json:"timestamp"`
    Balance   float64 `json:"balance"`
}

var db *sql.DB

func main() {
    godotenv.Load()

    var err error
    db, err = sql.Open("sqlite3", "./balances.db")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    createTable()

    // Start querying the balance every 60 seconds
    go periodicallyQueryBalance()

    // Serve balance data via the API
    http.HandleFunc("/api/balances", getBalancesHandler)

    log.Println("Server running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func createTable() {
    query := `
    CREATE TABLE IF NOT EXISTS balances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp INTEGER NOT NULL,
        balance REAL NOT NULL
    );`
    _, err := db.Exec(query)
    if err != nil {
        log.Fatal(err)
    }
}

// Periodically queries the balance and stores it in the database every 60 seconds
func periodicallyQueryBalance() {
    for {
        queryAndStoreBalance()
        queryInterval, err := strconv.Atoi(os.Getenv("QUERY_INTERVAL"))
        if err != nil {
            // Handle the error or set a default value
            queryInterval = 60 // Default to 60 seconds if not set or invalid
        }
        interval := time.Duration(queryInterval) * time.Second
        time.Sleep(interval)
    }
}

func queryAndStoreBalance() {
    walletAddress := os.Getenv("WALLET_ADDRESS")
    rpcEndpoint := os.Getenv("RPC_ENDPOINT")

    client, err := ethclient.Dial(rpcEndpoint)
    if err != nil {
        log.Println("Error connecting to Ethereum network:", err)
        return
    }

    address := common.HexToAddress(walletAddress)
    balance, err := client.BalanceAt(context.Background(), address, nil)
    if err != nil {
        log.Println("Error querying balance:", err)
        return
    }

    ethBalance := new(big.Float).Quo(new(big.Float).SetInt(balance), big.NewFloat(1e18))
    balanceFloat64, _ := ethBalance.Float64()

    // Store the balance with a timestamp
    storeBalance(time.Now().Unix(), balanceFloat64)
    log.Println("Stored new balance:", balance)
}

func storeBalance(timestamp int64, balance float64) {
    _, err := db.Exec("INSERT INTO balances (timestamp, balance) VALUES (?, ?)", timestamp, balance)
    if err != nil {
        log.Println("Error storing balance:", err)
    }
}

// Handler to get balances with optional start and end time filtering
func getBalancesHandler(w http.ResponseWriter, r *http.Request) {
    startTime := r.URL.Query().Get("start")
    endTime := r.URL.Query().Get("end")

    query := "SELECT timestamp, balance FROM balances"
    args := []interface{}{}

    if startTime != "" && endTime != "" {
        query += " WHERE timestamp BETWEEN ? AND ?"
        args = append(args, startTime, endTime)
    }

    rows, err := db.Query(query, args...)
    if err != nil {
        http.Error(w, "Error fetching balances", http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var balances []Balance
    for rows.Next() {
        var b Balance
        rows.Scan(&b.Timestamp, &b.Balance)
        balances = append(balances, b)
    }

    json.NewEncoder(w).Encode(balances)
}
