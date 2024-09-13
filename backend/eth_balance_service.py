import os
import sqlite3
from ethers import Web3
import schedule
import time
from datetime import datetime

# Load environment variables
BASE_RPC_URL = os.getenv("BASE_RPC_URL")
WALLET_ADDRESS = os.getenv("WALLET_ADDRESS")

# Initialize ethers
w3 = Web3(Web3.HTTPProvider(BASE_RPC_URL))

# Setup SQLite Database connection
conn = sqlite3.connect("eth_balance.db")
cur = conn.cursor()

# Create table if it doesn't exist
cur.execute('''CREATE TABLE IF NOT EXISTS balances (
               timestamp TEXT, 
               balance REAL)''')
conn.commit()

def query_eth_balance():
    try:
        # Query ETH balance
        balance = w3.eth.get_balance(WALLET_ADDRESS)
        balance_eth = w3.from_wei(balance, 'ether')

        # Insert into database
        timestamp = datetime.now().isoformat()
        cur.execute("INSERT INTO balances (timestamp, balance) VALUES (?, ?)", (timestamp, balance_eth))
        conn.commit()

        print(f"Balance at {timestamp}: {balance_eth} ETH")
    except Exception as e:
        print(f"Error fetching balance: {e}")

# Schedule the task every 10 minutes
schedule.every(10).minutes.do(query_eth_balance)

if __name__ == "__main__":
    while True:
        schedule.run_pending()
        time.sleep(1)
