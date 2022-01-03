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

# GET /students - Get list of all students
@app.route('/students', methods=['GET'])
def students():
    documents = collection.find()
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    return jsonify(response)

# GET /students/<_id> - Get student by id
@app.route('/students/<id>', methods=['GET'])
def student_by_id(id):
    target = str(id)
    documents = collection.find()
    response = "Not Found"
    for document in documents:
        if str(document['_id']) == target:
            response = str(document)
    return response + '\n'

# POST /students - Add a new Student to the list
@app.route('/students', methods=['POST'])
def add_student():
    print(request.headers)
    data = request.json
    print(data)
    name = data['name']
    major = data['major']
    classyr = data['classyr']
    present = data['present']

    obj = db.students.insert_one({
        'name': name,
        'major': major,
        'classyr': classyr,
        'present': present
    })
    return jsonify({'_id': str(obj.inserted_id), 'name': name, 'major': major, 'classyr': classyr, 'present': present}),201

# DELETE /students/<_id>
@app.route('/students/<id>', methods=['DELETE'])
def delete_by_id(id):
    target = str(id)
    documents = collection.find()
    #can I use findOneAndUpdate?
    for document in documents:
        if str(document['_id']) == target:
            db.students.remove(
                {'_id': ObjectId(target)}
            )
            return 'Success\n', 200
    return 'Not Found\n', 404

# PUT /students/present/<_id> - Update Student Present
@app.route('/students/present/<id>', methods=['PUT'])
def update_by_id(id):
    target = str(id)
    documents = collection.find()
    #can I use findOneAndUpdate?
    for document in documents:
        if str(document['_id']) == target:
            if str(document['present']) == 'False':
                db.students.update_one(
                    {'_id': ObjectId(target)},  
                    {'$set': {"present": True}})
            else:
                db.students.update_one(
                    {'_id': ObjectId(target)},  
                    {'$set': {"present": False}})
            return jsonify({'_id': str(document['_id']), 'name': str(document['name']), 'major': str(document['major']), 'classyr': str(document['classyr']), 'present': not bool(document['present'])}),200
    return 'Not Found\n', 404

# GET /students/stats - Return the number of students for each major (aggregate)
@app.route('/students/stats', methods=['GET'])
def stats():
    agg_result = collection.aggregate( 
    [{ 
    "$group" :  
        {"_id" : "$classyr",  
         "count" : {"$sum" : 1} 
         }} 
    ])
    return json.dumps(list(agg_result))

app.run()