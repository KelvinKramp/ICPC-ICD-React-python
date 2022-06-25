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

# Initializing flask app
app = Flask(__name__)
  
top100Films = [
  { "title": "The Shawshank Redemption", "year": 1994 },
  { "title": "The Godfather", "year": 1972 },
  { "title": "The Godfather: Part II", "year": 1974 },
  { "title": "The Dark Knight", "year": 2008 },
]

# Route for seeing a data
@app.route('/data')
def get_time():
  return ICPC

     
# Running app
if __name__ == '__main__':
    app.run(debug=True)