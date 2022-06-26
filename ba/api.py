# Import flask and datetime module for showing date and time
from flask import Flask
import datetime
import json
import datetime
from flask import jsonify
import pandas as pd
from definitions import ROOT_DIR
import os

json_file_name = os.path.join(ROOT_DIR, "ICPC.json")
f = open(json_file_name)
ICPC = json.load(f)
f.close()

locations = [
  { 'id':1, 'name': 'Location 1'},
  { 'id':2, 'name': 'Location 2'},
  ]

departments = [
  { 'id':1, 'name': 'Department 1'},
  { 'id':2, 'name': 'Department 2'},
  ]

# Initializing flask app
app = Flask(__name__)
  

# Route for RFEs
@app.route('/data')
def return_ICPC():
  return ICPC

# Route for Locations
@app.route('/locations')
def return_locations():
  return jsonify(locations)

# Route for Departments
@app.route('/departments')
def return_departments():
  return jsonify(departments)
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)