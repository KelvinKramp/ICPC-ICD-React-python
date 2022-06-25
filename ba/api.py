# Import flask and datetime module for showing date and time
from flask import Flask
import datetime
import json
# get this object
from flask import Response
import datetime
  
x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)
  
  
# Route for seeing a data
@app.route('/data')
def get_time():
  
    # Returning an api for showing in  reactjs
    top100Films = [
  { "title": "The Shawshank Redemption", "year": 1994 },
  { "title": "The Godfather", "year": 1972 },
  { "title": "The Godfather: Part II", "year": 1974 },
  { "title": "The Dark Knight", "year": 2008 },
]
    return {
        'name':"geek", 
        "age":"22",
        "date":x, 
        "programming":"python"
        }
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)