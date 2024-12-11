from flask import Flask, request, jsonify
from pymongo import MongoClient
from datetime import datetime
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# MongoDB connection string from Atlas
MONGO_URI = "mongodb+srv://tharindudrm:incident123@cluster0.egbrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client.IncidentManagement  # database name
collection = db.incidents  # collection name

# Route to handle POST request for incident submission
@app.route("/submit-incident", methods=["POST"])
def submit_incident():
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    incident = {
        "title": data.get("title"),
        "description": data.get("description"),
        "category": data.get("category"),
        "date": data.get("date"),
        "customer_name": data.get("customer_name"),
        "address": data.get("address"),
        "contact_number": data.get("contact_number"),
        "created_at": datetime.now()
    }
    
    # Insert the incident into the database
    try:
        result = collection.insert_one(incident)
        return jsonify({"message": "Incident reported successfully!", "id": str(result.inserted_id)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to handle GET request for retrieving all incidents
@app.route("/get-incidents", methods=["GET"])
def get_incidents():
    try:
        # Retrieve all incidents from the database
        incidents = collection.find()  # Fetch all incidents
        incident_list = []

        # Convert MongoDB cursor to a list of dictionaries
        for incident in incidents:
            incident['_id'] = str(incident['_id'])  # Convert ObjectId to string for JSON serialization
            incident_list.append(incident)

        return jsonify(incident_list), 200  # Return all incidents as JSON
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
