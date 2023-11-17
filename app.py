from flask import Flask, jsonify, request, Response, session
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
app.secret_key = "hello"
load_dotenv()
conn = mysql.connector.connect(user='root', password=os.getenv('SQL_PASSWORD'), database='icms')
cursor = conn.cursor()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/login", methods=['POST', 'GET'])
def login():
    data = request.get_json()
    student_id = data['username']
    password = data['password']

    if request.method == 'POST':
        cursor.execute("SELECT * FROM Student WHERE student_id = %s AND password = %s", (student_id, password))
        values = cursor.fetchone()

        if values:
            # Store username in session
            session.permanent = True
            session['student_id'] = values[0]
            response = {
                'signin': True,
                'student_id': student_id
            }
        else:
            response = {'signin': False}
    else:
        if 'student_id' in session:
            response = {
                'signin': True,
                'student_id': student_id
            }

    if response['signin'] == True:
        print("Updating login_time...")
        cursor.execute("UPDATE Student SET login_time = NOW() WHERE student_id = %s", (student_id,))
        conn.commit()

    # JSONify the response
    # response = Response(json.dumps(values, cls=CustomJSONEncoder), mimetype='application/json')
    return jsonify(response)
    

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
    uid = request.args.get('uid')
    if not uid:
        return Response(status=400)

    query = f"SELECT sac.student_id, sac.course_code, l.notes as lecture_notes, l.start_time as lecture_start, l.end_time as lecture_end, t.notes as tutorial_notes, t.start_time as tutorial_start, t.end_time as tutorial_end\
    FROM Student_asoc_course as sac\
    LEFT JOIN Lecture as l\
    ON sac.course_code = l.course_code\
    LEFT JOIN Tutorial as t\
    ON sac.course_code = t.course_code\
    WHERE sac.student_id = {uid} AND\
    (\
    (l.start_time <= DATE_ADD(NOW(), INTERVAL 1 HOUR) AND L.start_time >= NOW())\
    OR\
    (t.start_time <= DATE_ADD(NOW(), INTERVAL 1 HOUR) AND L.start_time >= NOW())\
    );"
    cursor.execute(query)
    values = cursor.fetchall()

    # JSONify the response
    response = Response(json.dumps(values, cls=CustomJSONEncoder), mimetype='application/json') 
    return response

@app.route("/mail", methods=['POST'])
def mail():
    return "<p>Mail</p>"

if __name__ == "__main__":
    app.run(debug=True)