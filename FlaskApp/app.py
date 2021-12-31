from datetime import datetime
from functools import wraps
from hashlib import sha1

import json
from bson import ObjectId
from flask import Flask, request, jsonify, json
import jwt
from flask_cors import CORS
from pymongo import MongoClient

client = MongoClient()
db = client.roster
collection = db.students  # can switch to users for that info

app = Flask(__name__)
CORS(app)

@app.route('/students')
def students():
    documents = collection.find()
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    return jsonify(response)

@app.route('/students/<id>')
def student_by_id(id):
    target = str(id)
    documents = collection.find()
    response = "Not Found"
    for document in documents:
        if str(document['_id']) == target:
            response = str(document)
    return response + '\n'


@app.route('/students', methods=['POST'])
def add_student():
    print(request.headers)
    data = request.json
    print(data)
    name = data['name']
    major = data['major']
    classyr = data['classyr']
    present = data['present']

    db.students.insert_one({
        'name': name,
        'major': major,
        'classyr': classyr,
        'present': present
    })
    return 'success\n', 201

# Get /listings/stats - return the number of listings for each make (aggregate)
@app.route('/students/stats')
def stats():
    agg_result = collection.aggregate( 
    [{ 
    "$group" :  
        {"_id" : "$major",  
         "count" : {"$sum" : 1} 
         }} 
    ])
    return json.dumps(list(agg_result))

# Delete /listings/<_id> - mark a listing as sold
@app.route('/students/<id>', methods=['DELETE'])
def delete_by_id(id):
    target = str(id)
    documents = collection.find()
    #can I use findOneAndUpdate?
    for document in documents:
        if str(document['_id']) == target:
            if str(document['sold']) == "false":
                db.listings.update_one(
                    {'_id': ObjectId(target)},  
                    {'$set': {"sold": "true"}})
            else:
                db.listings.update_one(
                    {'_id': ObjectId(target)},  
                    {'$set': {"sold": "false"}})
            return 'Success\n', 200
    return 'Not Found\n', 404

app.run()