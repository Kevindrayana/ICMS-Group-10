from flask import Flask, jsonify, request, Response, session
import mysql.connector
import os
import json
from datetime import timedelta, date
from dotenv import load_dotenv
import urllib
import numpy as np
import cv2          
import pickle
from datetime import datetime
import sys
from flask_cors import CORS

# Custom JSON encoder to handle timedelta and date objects
class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, timedelta):
            return str(obj)
        elif isinstance(obj, date):
            return obj.isoformat()
        return super().default(obj)

app = Flask(__name__)
CORS(app)
app.secret_key = "hello"
load_dotenv()
conn = mysql.connector.connect(user='root', password=os.getenv('SQL_PASSWORD'), database='icms')
cursor = conn.cursor()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/start-face-recognition", methods=['GET'])
def start_face_recognition():


    result = start_face_recognition_process()


    return jsonify(result)

def start_face_recognition_process():
    #Load recognize and read label from model 
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read("train.yml")
    labels = {"person_name": 1}
    with open("labels.pickle", "rb") as f:
        labels = pickle.load(f)
        labels = {v: k for k, v in labels.items()}
    
    # print labels
    for i in labels.keys():
        print(i)
    # Define camera and detect face
    face_cascade = cv2.CascadeClassifier('haarcascade/haarcascade_frontalface_default.xml')
    cap = cv2.VideoCapture(0)

    response = {'signin': False}

    #Open the camera and start face recognition
    while True:
        flag = 0
        ret, frame = cap.read()
        if frame is None:
            print("Error reading frame from camera")
            continue  # Skip the current iteration and move to the next one
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.5, minNeighbors=5)

        for (x, y, w, h) in faces:
            roi_gray = gray[y:y + h, x:x + w]
            # predict the id and confidence for faces
            id_, conf = recognizer.predict(roi_gray)
            print(id_)

            # If the face is recognized
            print(conf)
            if conf >= 50:
                font = cv2.QT_FONT_NORMAL
                id = 0
                student_id = labels[id]
                color = (255, 0, 0)
                stroke = 2
                cv2.putText(frame, student_id, (x, y), font, 1, color, stroke, cv2.LINE_AA)
                cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), (2))

                # Find the student's information in the database.
                cursor.execute("SELECT * FROM Student WHERE student_id = %s", (student_id,))
                values = cursor.fetchone()
                print(values)

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
                    color = (255, 0, 0)
                    stroke = 2
                    font = cv2.QT_FONT_NORMAL
                    cv2.putText(frame, "UNKNOWN", (x, y), font, 1, color, stroke, cv2.LINE_AA)
                    cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), (2))
                    hello = ("Your face is not recognized")
                    print(hello)
                
                flag =  1
        

        cv2.imshow('Attendance System', frame)
        k = cv2.waitKey(20) & 0xff
        if k == ord('q') or flag:
            break
                
    cap.release()
    cv2.destroyAllWindows()

    if 'student_id' in session:
        response = {
            'signin': True,
            'student_id': student_id
        }
 
    if response['signin'] == True:
        print("Updating login_time...")
        cursor.execute("UPDATE Student SET login_time = NOW() WHERE student_id = %s;", (student_id,))
        conn.commit()

    # return the response
    print(response)
    return response


@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    student_id = data['username']
    password = data['password']

    if request.method == 'POST':
        cursor.execute("SELECT * FROM Student WHERE student_id = %s AND password = %s;", (student_id, password))
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

    if response['signin'] == True:
        print("Updating login_time...")
        cursor.execute("UPDATE Student SET login_time = NOW() WHERE student_id = %s;", (student_id,))
        conn.commit()

    # JSONify the response
    response = Response(json.dumps(values, cls=CustomJSONEncoder), mimetype='application/json')
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
    student_id = request.args.get('uid')
    if not student_id:
        return Response(status=400)
    
    query_lec = f"SELECT * FROM Lecture WHERE course_code IN (\
    SELECT course_code FROM Student_asoc_course\
    WHERE student_id = {student_id});"
    cursor.execute(query_lec)
    values_lec = cursor.fetchall()

    query_tut = f"SELECT * FROM Tutorial WHERE course_code IN (\
    SELECT course_code FROM Student_asoc_course\
    WHERE student_id = {student_id});"
    cursor.execute(query_tut)
    values_tut = cursor.fetchall()


    # JSONify the response
    response_dict = {
        "lecture_results": values_lec,
        "tutorial_results": values_tut
    }

    # JSONify the response dictionary
    response = Response(json.dumps(response_dict, cls=CustomJSONEncoder), mimetype='application/json')
    return response

@app.route("/latest-login", methods=['GET'])
def latest_login():
    student_id = request.args.get('uid')
    if not student_id:
        return Response(status=400)

    query = f"SELECT student_id, login_time FROM Student WHERE student_id = {student_id};"
    cursor.execute(query)
    values = cursor.fetchone()

    # JSONify the response
    response = Response(json.dumps(values, cls=CustomJSONEncoder), mimetype='application/json')
    return response

@app.route("/class", methods=['GET'])
def class_():
    student_id = request.args.get('student_id')
    if not student_id:
        return Response(status=400)

    query = f"SELECT sac.student_id, sac.course_code, l.notes as lecture_notes, l.start_time as lecture_start, l.end_time as lecture_end, t.notes as tutorial_notes, t.start_time as tutorial_start, t.end_time as tutorial_end\
    FROM Student_asoc_course as sac\
    LEFT JOIN Lecture as l\
    ON sac.course_code = l.course_code\
    LEFT JOIN Tutorial as t\
    ON sac.course_code = t.course_code\
    WHERE sac.student_id = {student_id} AND\
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