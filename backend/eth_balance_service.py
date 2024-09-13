import os
import sqlite3
from ethers import Web3
import schedule
import time
from datetime import datetime



# Load environment variables
BASE_RPC_URL = os.getenv("BASE_RPC_URL")
WALLET_ADDRESS = os.getenv("WALLET_ADDRESS")