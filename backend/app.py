from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

@app.route('/balances', methods=['GET'])
def get_balances():
    conn = sqlite3.connect("eth_balance.db")
    cur = conn.cursor()

    # Query all balance records
    cur.execute("SELECT * FROM balances")
    rows = cur.fetchall()

    # Format the data into JSON
    balances = [{"timestamp": row[0], "balance": row[1]} for row in rows]
    conn.close()

    return jsonify(balances)

if __name__ == "__main__":
    app.run(debug=True)
