from flask import Flask, jsonify, request, Response
import mysql.connector
import os
import json
from datetime import timedelta, date
from dotenv import load_dotenv

# Custom JSON encoder to handle timedelta and date objects
class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, timedelta):
            return str(obj)
        elif isinstance(obj, date):
            return obj.isoformat()
        return super().default(obj)

app = Flask(__name__)
load_dotenv()
conn = mysql.connector.connect(user='root', password=os.getenv('SQL_PASSWORD'), database='icms')
cursor = conn.cursor()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/login", methods=['POST'])
def login():
    return "<p>Login</p>"

@app.route("/logout", methods=['GET'])
def logout():
    return "<p>Logout</p>"

@app.route("/signin", methods=['POST'])
def signin():
    return "<p>Signin</p>"

@app.route("/signout", methods=['GET'])
def signout():
    return "<p>Signout</p>"


@app.route("/timetable", methods=['GET'])
def timetable():
    return "<p>Timetable</p>"

@app.route("/class", methods=['GET'])
def class_():
    # TODO: change name to use session
    name = 'John Doe'
    cursor.execute("SELECT * FROM Student")
    values = cursor.fetchall()

    # JSONify the response
    response = Response(json.dumps(values, cls=CustomJSONEncoder), mimetype='application/json') 
    return response

@app.route("/mail", methods=['POST'])
def mail():
    return "<p>Mail</p>"

if __name__ == "__main__":
    app.run(debug=True)