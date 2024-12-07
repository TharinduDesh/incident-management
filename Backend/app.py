from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from waitress import serve

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB Connection
try:
    # Connect to MongoDB Atlas
    client = MongoClient(
       "mongodb+srv://abc:1234@cluster0.32yjc.mongodb.net/incident_management?retryWrites=true&w=majority"
    )
    db = client["incident_management"]  # Database name
    incidents_collection = db["incidents"]  # Incidents collection
    complaints_collection = db["complaints"]  # Complaints collection
    counters = db["counters"]  # Counter collection
    print("Connected to MongoDB successfully!")

    # Ensure the counter exists for both incidents and complaints
    if counters.count_documents({"name": "issue_number"}) == 0:
        counters.insert_one({"name": "issue_number", "value": 0})
    if counters.count_documents({"name": "complaint_number"}) == 0:
        counters.insert_one({"name": "complaint_number", "value": 0})

except Exception as e:
    print(f"Error connecting to MongoDB: {e}")

# Routes

# Add a new complaint (Admin)
@app.route("/api/complaints", methods=["POST"])
def add_complaint():
    try:
        # Add a new complaint document
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Ensure required fields are present in the data
        required_fields = ['customerName', 'address', 'contactNumber', 'incidentTitle', 'description', 'category', 'date']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        # Get and increment the counter for the complaint number
        counter = counters.find_one_and_update(
            {"name": "complaint_number"}, {"$inc": {"value": 1}}, return_document=True
        )
        complaint_number = counter["value"]

        # Add the complaint_number to the data
        data["complaint_number"] = complaint_number
        data["status"] = " "  # Initial status as 'new'

        # Insert the document into the complaints collection
        complaints_collection.insert_one(data)

        return jsonify({"message": "Complaint submitted successfully!", "complaint_number": complaint_number}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Admin: View all complaints
@app.route("/api/complaints", methods=["GET"])
def get_complaints():
    try:
        complaints = list(complaints_collection.find({}, {"_id": 0}))  # Exclude _id field
        return jsonify(complaints), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Admin: Assign a repair team to a complaint
@app.route("/api/complaints/<int:complaint_id>/assign", methods=["PATCH"])
def assign_repair_team(complaint_id):
    try:
        data = request.json
        repair_team = data.get("repair_team")
        
        if not repair_team:
            return jsonify({"error": "Repair team is required"}), 400

        # Update the complaint with the assigned repair team and set status to 'opened'
        result = complaints_collection.update_one(
            {"complaint_number": complaint_id},
            {"$set": {"repair_team": repair_team, "status": "opened"}}
        )

        if result.matched_count == 0:
            return jsonify({"message": "Complaint not found"}), 404

        return jsonify({"message": "Repair team assigned successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Add a new incident (Admin)
@app.route("/api/incidents", methods=["POST"])
def add_incident():
    try:
        # Add a new incident document
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Get and increment the counter for the issue number
        counter = counters.find_one_and_update(
            {"name": "issue_number"}, {"$inc": {"value": 1}}, return_document=True
        )
        issue_number = counter["value"]

        # Add the issue_number to the data
        data["issue_number"] = issue_number

        # Insert the document into the incidents collection
        incidents_collection.insert_one(data)
        return jsonify({"message": "Incident added successfully!", "issue_number": issue_number}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Admin: View all incidents
@app.route("/api/incidents", methods=["GET"])
def get_incidents():
    try:
        incidents = list(incidents_collection.find({}, {"_id": 0}))  # Exclude _id field
        return jsonify(incidents), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Function to run Flask app with Waitress
def run_flask():
    print("Starting Flask server with Waitress on localhost:5000...")
    serve(app, host="127.0.0.1", port=5000)

# Start Flask app
if __name__ == "__main__":
    run_flask()
