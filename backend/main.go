package main

import (
    "context"
    "database/sql"
    "encoding/json"
    "fmt"
    "log"
    "math/big"
    "net/http"
    "os"
    "strconv"
    "time"

    "github.com/ethereum/go-ethereum/common"
    "github.com/ethereum/go-ethereum/ethclient"
    _ "github.com/mattn/go-sqlite3"
    "github.com/joho/godotenv"
)

func main() {
    // Load environment variables from .env file
    err := godotenv.Load()
    if err != nil {
        log.Println("No .env file found, using system environment variables")
    }

    // Get environment variables
    walletAddress := os.Getenv("WALLET_ADDRESS")
    if walletAddress == "" {
        log.Fatal("WALLET_ADDRESS not set")
    }

    rpcEndpoint := os.Getenv("RPC_ENDPOINT")
    if rpcEndpoint == "" {
        log.Fatal("RPC_ENDPOINT not set")
    }

    queryIntervalStr := os.Getenv("QUERY_INTERVAL")
    if queryIntervalStr == "" {
        queryIntervalStr = "60" // default to 60 seconds
    }
    queryInterval, err := strconv.Atoi(queryIntervalStr)
    if err != nil {
        log.Fatal("Invalid QUERY_INTERVAL:", err)
    }

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    // Connect to Ethereum client
    client, err := ethclient.Dial(rpcEndpoint)
    if err != nil {
        log.Fatal(err)
    }
    defer client.Close()

    // Open database connection
    db, err := sql.Open("sqlite3", "./balances.db")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    // Create balances table if it doesn't exist
    createTableSQL := `CREATE TABLE IF NOT EXISTS balances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp INTEGER NOT NULL,
        balance TEXT NOT NULL
    );`
    _, err = db.Exec(createTableSQL)
    if err != nil {
        log.Fatal(err)
    }

    // Start ticker to fetch and store balance periodically
    ticker := time.NewTicker(time.Duration(queryInterval) * time.Second)
    defer ticker.Stop()

    walletAddr := common.HexToAddress(walletAddress)

    // Fetch and store balance immediately at startup
    fetchAndStoreBalance(client, db, walletAddr)

    go func() {
        for range ticker.C {
            fetchAndStoreBalance(client, db, walletAddr)
        }
    }()

    // Set up HTTP server
    http.HandleFunc("/api/balances", getBalancesHandler(db))

    fmt.Printf("Server started on port %s\n", port)
    log.Fatal(http.ListenAndServe(":"+port, nil))
}

// Function to fetch balance and store it in the database
func fetchAndStoreBalance(client *ethclient.Client, db *sql.DB, address common.Address) {
    balance, err := client.BalanceAt(context.Background(), address, nil)
    if err != nil {
        log.Println("Error fetching balance:", err)
        return
    }
    _, err = db.Exec("INSERT INTO balances (timestamp, balance) VALUES (?, ?)", time.Now().Unix(), balance.String())
    if err != nil {
        log.Println("Error storing balance:", err)
    }
}

// Handler for /api/balances endpoint
func getBalancesHandler(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        start := r.URL.Query().Get("start")
        end := r.URL.Query().Get("end")

        // Default to showing the last 24 hours if no parameters are provided
        var startTime, endTime int64
        now := time.Now().Unix()
        if start == "" {
            startTime = now - 86400 // 24 hours ago
        } else {
            startTime, _ = strconv.ParseInt(start, 10, 64)
        }
        if end == "" {
            endTime = now
        } else {
            endTime, _ = strconv.ParseInt(end, 10, 64)
        }

        // Query balances within the time range
        rows, err := db.Query("SELECT timestamp, balance FROM balances WHERE timestamp BETWEEN ? AND ?", startTime, endTime)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        defer rows.Close()

        var balances []map[string]interface{}
        for rows.Next() {
            var timestamp int64
            var balanceStr string
            if err := rows.Scan(&timestamp, &balanceStr); err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
                return
            }
            balanceFloat, _ := new(big.Float).SetString(balanceStr)
            ethValue := new(big.Float).Quo(balanceFloat, big.NewFloat(1e18)) // Convert Wei to Ether

            balances = append(balances, map[string]interface{}{
                "timestamp": timestamp,
                "balance":   ethValue,
            })
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(balances)
    }
}
