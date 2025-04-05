import flask
from flask import Flask, request, jsonify
import json
import time
import random
import uuid
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# In-memory database for demonstration
database = {
    "accounts": {},
    "transactions": [],
    "sessions": {},
    "users": {},
    "login_attempts": []
}

# Load initial dummy data
def initialize_dummy_data():
    # Create some users with accounts
    user_profiles = [
        {"user_id": "U1001", "name": "John Smith", "email": "john@example.com", "password": "john123", 
         "phone": "555-123-4567", "address": "123 Main St, Anytown", "registration_date": "2022-01-15", 
         "usual_device": "iPhone-Safari", "usual_locations": ["New York", "New Jersey"]},
        {"user_id": "U1002", "name": "Sarah Johnson", "email": "sarah@example.com", "password": "sarah123", 
         "phone": "555-234-5678", "address": "456 Oak Ave, Somewhere", "registration_date": "2021-11-22", 
         "usual_device": "Android-Chrome", "usual_locations": ["Los Angeles", "San Diego"]},
        {"user_id": "U1003", "name": "Maria Garcia", "email": "maria@example.com", "password": "maria123", 
         "phone": "555-345-6789", "address": "789 Pine Rd, Elsewhere", "registration_date": "2023-03-10", 
         "usual_device": "Windows-Edge", "usual_locations": ["Chicago", "Detroit"]}
    ]
    
    for user in user_profiles:
        user_id = user["user_id"]
        database["users"][user_id] = user
        
        # Create checking and savings accounts for each user
        checking_account = {
            "account_id": f"C{user_id[1:]}",
            "user_id": user_id,
            "account_type": "checking",
            "balance": round(random.uniform(1000, 5000), 2),
            "open_date": user["registration_date"],
            "status": "active"
        }
        
        savings_account = {
            "account_id": f"S{user_id[1:]}",
            "user_id": user_id,
            "account_type": "savings",
            "balance": round(random.uniform(5000, 20000), 2),
            "open_date": user["registration_date"],
            "status": "active"
        }
        
        database["accounts"][checking_account["account_id"]] = checking_account
        database["accounts"][savings_account["account_id"]] = savings_account
    
    # Generate transaction history (past 30 days)
    generate_transaction_history(30)

def generate_transaction_history(days):
    """Generate realistic transaction history for the past X days"""
    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)
    current_date = start_date
    
    # Common merchants
    merchants = [
        "Amazon", "Walmart", "Target", "Starbucks", "Uber", "Netflix", 
        "Spotify", "Shell Gas", "Whole Foods", "Apple"
    ]
    
    # Transaction categories
    categories = [
        "shopping", "groceries", "dining", "transportation", "entertainment", 
        "utilities", "healthcare", "transfer"
    ]
    
    all_accounts = list(database["accounts"].keys())
    
    while current_date < end_date:
        # Generate 10-30 transactions per day
        daily_txn_count = random.randint(10, 30)
        
        for _ in range(daily_txn_count):
            # Select random account
            account_id = random.choice(all_accounts)
            account = database["accounts"][account_id]
            
            txn_type = random.choice(["debit", "credit"])
            
            if txn_type == "debit":
                amount = round(random.uniform(1, 200), 2)
                merchant = random.choice(merchants)
                category = random.choice(categories)
                recipient = merchant
            else:
                amount = round(random.uniform(100, 1000), 2)
                merchant = None
                category = "deposit"
                recipient = account_id
            
            # Random timestamp within the current day
            txn_time = current_date + timedelta(
                hours=random.randint(8, 22),
                minutes=random.randint(0, 59),
                seconds=random.randint(0, 59)
            )
            
            # Create transaction object
            transaction = {
                "transaction_id": str(uuid.uuid4()),
                "account_id": account_id,
                "user_id": account["user_id"],
                "timestamp": txn_time.isoformat(),
                "amount": amount,
                "type": txn_type,
                "merchant": merchant,
                "category": category,
                "recipient": recipient,
                "balance_after": account["balance"],
                "ip_address": f"192.168.{random.randint(0, 255)}.{random.randint(0, 255)}",
                "device_info": database["users"][account["user_id"]]["usual_device"],
                "location": random.choice(database["users"][account["user_id"]]["usual_locations"]),
                "status": "completed"
            }
            
            # Update account balance
            if txn_type == "debit":
                account["balance"] -= amount
            else:
                account["balance"] += amount
            
            transaction["balance_after"] = round(account["balance"], 2)
            database["transactions"].append(transaction)
        
        current_date += timedelta(days=1)

# API endpoints
@app.route('/api/accounts', methods=['GET'])
def get_accounts():
    user_id = request.args.get('user_id')
    if user_id:
        user_accounts = {k: v for k, v in database["accounts"].items() if v["user_id"] == user_id}
        return jsonify(user_accounts)
    return jsonify(database["accounts"])

@app.route('/api/accounts/<account_id>', methods=['GET'])
def get_account(account_id):
    if account_id in database["accounts"]:
        return jsonify(database["accounts"][account_id])
    return jsonify({"error": "Account not found"}), 404

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    account_id = request.args.get('account_id')
    user_id = request.args.get('user_id')
    days = request.args.get('days', default=30, type=int)
    
    start_date = (datetime.now() - timedelta(days=days)).isoformat()
    
    filtered_txns = database["transactions"]
    
    if account_id:
        filtered_txns = [t for t in filtered_txns if t["account_id"] == account_id]
    
    if user_id:
        filtered_txns = [t for t in filtered_txns if t["user_id"] == user_id]
    
    filtered_txns = [t for t in filtered_txns if t["timestamp"] >= start_date]
    
    # Sort by timestamp (newest first)
    filtered_txns = sorted(filtered_txns, key=lambda x: x["timestamp"], reverse=True)
    
    return jsonify(filtered_txns)

@app.route('/api/transactions', methods=['POST'])
def create_transaction():
    txn_data = request.json
    
    # Validate transaction data
    required_fields = ["account_id", "amount", "type"]
    for field in required_fields:
        if field not in txn_data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    # Check if account exists
    account_id = txn_data["account_id"]
    if account_id not in database["accounts"]:
        return jsonify({"error": "Account not found"}), 404
    
    account = database["accounts"][account_id]
    
    # Generate a new transaction
    txn_id = str(uuid.uuid4())
    timestamp = datetime.now().isoformat()
    
    # Set defaults for optional fields
    txn_data.setdefault("merchant", None)
    txn_data.setdefault("category", "uncategorized")
    txn_data.setdefault("recipient", account_id if txn_data["type"] == "credit" else None)
    
    # Get client information
    ip_address = request.remote_addr
    user_agent = request.headers.get("User-Agent", "Unknown")
    
    # Get location data (simulated)
    user = database["users"][account["user_id"]]
    
    if random.random() < 0.05:  # 5% chance of unusual location
        location = random.choice(["Hong Kong", "Moscow", "Lagos", "Rio de Janeiro"])
        device_info = "Unknown-Device"
    else:
        location = random.choice(user["usual_locations"])
        device_info = user["usual_device"]
    
    # Create transaction object
    transaction = {
        "transaction_id": txn_id,
        "account_id": account_id,
        "user_id": account["user_id"],
        "timestamp": timestamp,
        "amount": txn_data["amount"],
        "type": txn_data["type"],
        "merchant": txn_data["merchant"],
        "category": txn_data["category"],
        "recipient": txn_data["recipient"],
        "ip_address": ip_address,
        "device_info": device_info,
        "location": location,
        "status": "pending"
    }
    
    # Update account balance
    if txn_data["type"] == "debit":
        if account["balance"] < txn_data["amount"]:
            return jsonify({"error": "Insufficient funds"}), 400
        account["balance"] -= txn_data["amount"]
    else:
        account["balance"] += txn_data["amount"]
    
    transaction["balance_after"] = round(account["balance"], 2)
    transaction["status"] = "completed"
    
    # Add to database
    database["transactions"].append(transaction)
    
    return jsonify(transaction), 201

@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'POST,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200

    # Handle actual login request
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    behavioral_data = data.get('behavioralData', {})
    
    # Find user by email
    user = None
    for u in database["users"].values():
        if u["email"] == username and u["password"] == password:
            user = u
            break
    
    # Store the login attempt with behavioral data
    login_attempt = {
        "timestamp": behavioral_data.get('timestamp', datetime.now().isoformat()),
        "username": username,
        "success": user is not None,
        "behavioral_data": behavioral_data,
        "ip_address": request.remote_addr,
        "user_agent": request.headers.get("User-Agent")
    }
    
    # Store login attempt in database (you might want to create a new collection for this)
    if "login_attempts" not in database:
        database["login_attempts"] = []
    database["login_attempts"].append(login_attempt)
    
    if user:
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'user': {
                'username': user['name'],
                'email': user['email'],
                'user_id': user['user_id']
            }
        }), 200
    else:
        return jsonify({
            'success': False,
            'message': 'Invalid email or password'
        }), 401

@app.route('/login-attempt', methods=['POST'])
def record_login_attempt():
    data = request.get_json()
    
    # Store the failed login attempt
    login_attempt = {
        "timestamp": data.get('timestamp', datetime.now().isoformat()),
        "username": data.get('username'),
        "success": False,
        "error": data.get('error'),
        "behavioral_data": {
            "sessionData": data.get('sessionData', {}),
            "typingAnalysis": data.get('typingAnalysis', {}),
            "securityMetrics": data.get('securityMetrics', {})
        },
        "ip_address": request.remote_addr,
        "user_agent": request.headers.get("User-Agent")
    }
    
    # Store login attempt in database
    if "login_attempts" not in database:
        database["login_attempts"] = []
    database["login_attempts"].append(login_attempt)
    
    return jsonify({
        'success': True,
        'message': 'Login attempt recorded'
    }), 200

@app.route('/api/generate-fraud', methods=['POST'])
def generate_fraud():
    """Endpoint to generate fraudulent activities for testing"""
    fraud_type = request.json.get('type', 'transaction')
    account_id = request.json.get('account_id')
    
    if fraud_type == 'transaction':
        # Get a random account if none specified
        if not account_id:
            account_id = random.choice(list(database["accounts"].keys()))
        
        account = database["accounts"][account_id]
        user = database["users"][account["user_id"]]
        
        # Create a fraudulent transaction
        txn_id = str(uuid.uuid4())
        timestamp = datetime.now().isoformat()
        
        # High value suspicious transaction
        amount = round(random.uniform(500, 2000), 2)
        
        transaction = {
            "transaction_id": txn_id,
            "account_id": account_id,
            "user_id": account["user_id"],
            "timestamp": timestamp,
            "amount": amount,
            "type": "debit",
            "merchant": "Unusual Merchant Inc.",
            "category": "other",
            "recipient": "Unknown",
            "ip_address": f"103.{random.randint(0, 255)}.{random.randint(0, 255)}.{random.randint(0, 255)}",
            "device_info": "Unknown-Device",
            "location": random.choice(["Hong Kong", "Moscow", "Lagos", "Rio de Janeiro"]),
            "status": "completed",
            "flag": "POTENTIAL_FRAUD"
        }
        
        # Update account balance
        account["balance"] -= amount
        transaction["balance_after"] = round(account["balance"], 2)
        
        # Add to database
        database["transactions"].append(transaction)
        return jsonify({"message": "Fraudulent transaction generated", "transaction": transaction})
    
    elif fraud_type == 'login':
        # Simulate a suspicious login attempt
        if not account_id:
            account_id = random.choice(list(database["accounts"].keys()))
        
        account = database["accounts"][account_id]
        user_id = account["user_id"]
        
        # Create a new session
        session_id = str(uuid.uuid4())
        timestamp = datetime.now().isoformat()
        
        session = {
            "session_id": session_id,
            "user_id": user_id,
            "timestamp": timestamp,
            "ip_address": f"103.{random.randint(0, 255)}.{random.randint(0, 255)}.{random.randint(0, 255)}",
            "device_info": "Unknown-Device",
            "location": random.choice(["Hong Kong", "Moscow", "Lagos", "Rio de Janeiro"]),
            "status": "active",
            "flag": "SUSPICIOUS_LOGIN"
        }
        
        database["sessions"][session_id] = session
        return jsonify({"message": "Suspicious login attempt generated", "session": session})
    
    else:
        return jsonify({"error": "Invalid fraud type specified"}), 400

@app.route('/api/export-data', methods=['GET'])
def export_data():
    """Export data for ML training"""
    data_type = request.args.get('type', 'transactions')
    
    if data_type == 'transactions':
        df = pd.DataFrame(database["transactions"])
        
        # Add fraud labels (for demonstration)
        df['is_fraud'] = df.apply(
            lambda x: 1 if ('flag' in x and x['flag'] == 'POTENTIAL_FRAUD') or 
                          (x['location'] not in database["users"].get(x['user_id'], {}).get('usual_locations', []) and 
                           x['amount'] > 500 and x['type'] == 'debit') 
                      else 0, 
            axis=1
        )
        
        # Convert to JSON
        result = df.to_dict('records')
        return jsonify(result)
    
    elif data_type == 'sessions':
        df = pd.DataFrame(list(database["sessions"].values()))
        
        # Add fraud labels (for demonstration)
        df['is_suspicious'] = df.apply(
            lambda x: 1 if ('flag' in x and x['flag'] == 'SUSPICIOUS_LOGIN') or 
                          (x['location'] not in database["users"].get(x['user_id'], {}).get('usual_locations', [])) 
                      else 0, 
            axis=1
        )
        
        # Convert to JSON
        result = df.to_dict('records')
        return jsonify(result)
    
    else:
        return jsonify({"error": "Invalid data type specified"}), 400

# Initialize database
initialize_dummy_data()

if __name__ == '__main__':
    app.run(debug=True, port=5000)