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
from email.message import EmailMessage
import ssl
import smtplib

# Custom JSON encoder to handle timedelta and date objects
class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, timedelta):
            return str(obj)
        elif isinstance(obj, date):
            return obj.isoformat()
        return super().default(obj)

app = Flask(__name__)
app.secret_key = "Hello"
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
load_dotenv() # Load environment variables from .env file

config = {
    'user': 'root',
    'password': os.getenv('SQL_PASSWORD'),
    'host': '127.0.0.1',
    'port': 3306,
    'database': 'icms',
    'ssl_disabled': True  # Disable SSL/TLS
}

conn = mysql.connector.connect(**config) # Connect to MySQL database
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
            session["student_id"] = values[0]
            cursor.execute("UPDATE Student SET login_time = NOW() WHERE student_id = %s;", (student_id,))
            conn.commit()
            cursor.execute("SELECT * FROM Student WHERE student_id = %s AND password = %s;", (student_id, password))
            values = cursor.fetchone()

    # JSONify the response
    response = Response(json.dumps(values, cls=CustomJSONEncoder), mimetype='application/json')
    return response
    
@app.route("/logout", methods=['GET'])
def logout():
    student_id = request.args.get('uid')
    del session[student_id]

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
    
    query = f"SELECT * FROM Lesson WHERE course_code IN (\
    SELECT course_code FROM Student_asoc_course\
    WHERE student_id = {student_id});"
    cursor.execute(query)
    values = cursor.fetchall()

    # JSONify the response dictionary
    response = Response(json.dumps(values, cls=CustomJSONEncoder), mimetype='application/json')
    return response

@app.route("/latest-login", methods=['GET'])
def latest_login():
    student_id = request.args.get('uid')
    if not student_id:
        return Response(status=400)

    query = f"SELECT student_id, login_time FROM Student WHERE student_id = {student_id};"
    cursor.execute(query)
    values = cursor.fetchone()

    if values:
        response = {
            'student_id': values[0],
            'login_time': values[1]
        }

    # JSONify the response
    response = Response(json.dumps(response, cls=CustomJSONEncoder), mimetype='application/json')
    return response

@app.route("/courses", methods=['GET'])
def get_courses():
    # get the student_id from request parameter
    student_id = request.args.get('uid')
    if not student_id:
        return Response(status=400)

    # get the courses for the student
    query = f'''
    SELECT c.course_code, c.course_name, c.course_link, c.course_image
    FROM Course c
    JOIN Student_asoc_course sac ON c.course_code = sac.course_code
    WHERE sac.student_id = {student_id};
    '''
    cursor.execute(query)
    result = cursor.fetchall()

    res = []
    for r in result:
        res.append({
            "course_code": r[0],
            "course_name": r[1],
            "course_link": r[2],
            "course_image": r[3]
        })
    return res

@app.route("/upcoming-class", methods=['GET'])
def upcoming_class():
    # get the student_id from request parameters
    student_id = request.args.get('uid')
    if not student_id:
        return Response(status=400)
    # get the class info for the student    
    query = f'''
    SELECT c.course_code, c.course_name, l.start_time, l.end_time, l.classroom_address, l.zoom_link, m.content AS last_message
    FROM Course c
    JOIN Student_asoc_course sac ON sac.course_code = c.course_code
    JOIN Lesson l ON l.course_code = c.course_code
    LEFT JOIN (
        SELECT message_id, staff_id, content, course_code
        FROM Message
        WHERE message_id IN (
            SELECT MAX(message_id)
            FROM Message
            GROUP BY course_code
        )
    ) m ON m.course_code = c.course_code
    WHERE sac.student_id = {student_id}
    AND l.start_time BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 1 HOUR)
    ORDER BY ABS(TIMEDIFF(l.start_time, NOW()))
    LIMIT 1;
    '''
    cursor.execute(query)
    result = cursor.fetchall()
    if not result:
        return {"success": False}

    result = result[0] # only one result is returned
    response = {
        "success": True,
        "course_code": result[0],
        "course_name": result[1],
        "course_link": result[2],
        "start_time": result[3],
        "end_time": result[4],
        "venue": result[5],
        "zoom_link": result[6],
        "latest_announcement": result[7]
    }

    # JSONify the response
    response = Response(json.dumps(response, cls=CustomJSONEncoder), mimetype='application/json')

    return response

@app.route("/mail", methods=['GET'])
def mail():
    # get the student_id from request parameters
    student_id = request.args.get('uid')
    if not student_id:
        return Response(status=400)
    
    # get student name
    query = f"SELECT name FROM Student WHERE student_id = {student_id};"
    cursor.execute(query)
    values = cursor.fetchone()
    student_name = values[0]

    # get student email
    query = f"SELECT email FROM Student WHERE student_id = {student_id};"
    cursor.execute(query)
    values = cursor.fetchone()
    
    email_receiver = values[0]
    email_sender = "icms.noreply1@gmail.com"
    email_password = os.getenv('EMAIL_PASSWORD')

    # set up email information
    em = EmailMessage()
    em["From"] = email_sender
    em["To"] = email_receiver
    em["Subject"] = "ICMS Reminder"

    query = f'''
    SELECT c.course_code, c.course_name, l.start_time, l.end_time, l.classroom_address, l.zoom_link, m.content AS last_message
    FROM Course c
    JOIN Student_asoc_course sac ON sac.course_code = c.course_code
    JOIN Lesson l ON l.course_code = c.course_code
    LEFT JOIN (
        SELECT message_id, staff_id, content, course_code
        FROM Message
        WHERE message_id IN (
            SELECT MAX(message_id)
            FROM Message
            GROUP BY course_code
        )
    ) m ON m.course_code = c.course_code
    WHERE sac.student_id = {student_id}
    AND l.start_time BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 1 HOUR);
    '''
    cursor.execute(query)
    values = cursor.fetchall()

    email_body = f"Dear {student_name},\n\nHere is your upcoming schedule for the next hour:\n\n"
    for value in values:
        email_body += f"Course Code: {value[0]}\n"
        email_body += f"Course Name: {value[1]}\n"
        email_body += f"Start Time: {value[2]}\n"
        email_body += f"End Time: {value[3]}\n"
        email_body += f"Classroom Address: {value[4]}\n"
        email_body += f"Zoom Link: {value[5]}\n"
        email_body += f"Last Message: {value[6]}\n\n"

    email_body += "Please make sure to attend the scheduled sessions on time and utilize the provided resources effectively.\n\n"
    email_body += "Best regards,\nICMS"

    em.set_content(email_body)

    # send email
    context = ssl.create_default_context()
    ssl._create_default_https_context = ssl._create_unverified_context

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as smtp:
        smtp.login(email_sender, email_password)
        smtp.sendmail(email_sender, email_receiver, em.as_string())

    response = {
        "success": True
    }
    return jsonify(response)

@app.route("/messages", methods=['GET'])
def messages():
    # get the student_id from request parameter
    student_id = request.args.get('uid')
    if not student_id:
        return Response(status=400)

    # get the messages for the student
    query = f'''
    SELECT m.sent_time, m.content, m.course_code, t.name
    FROM Message as m
    INNER JOIN Teaching_Staff as t
    ON t.staff_id = m.staff_id
    INNER JOIN Student_asoc_course as s
    ON s.course_code = m.course_code
    WHERE s.student_id = '{student_id}'
    ORDER BY m.sent_time DESC;
    '''
    cursor.execute(query)
    result = cursor.fetchall()

    res = []
    for r in result:
        res.append({
            "time": r[0],
            "content": r[1],
            "course": r[2],
            "instructor": r[3]
        })
    return res


if __name__ == "__main__":
    app.run(debug=True)