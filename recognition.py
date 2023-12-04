from flask import jsonify
import cv2          
import pickle
import mysql.connector
import os
import sys
import time


# Create connection to MySQL database
config = {
    'user': 'root',
    'password': os.getenv('SQL_PASSWORD'),
    'host': '127.0.0.1',
    'port': 3306,
    'database': 'icms',
    'ssl_disabled': True  # Disable SSL/TLS to enable email sending
}
conn = mysql.connector.connect(**config) # Connect to MySQL database
cursor = conn.cursor()

def start_face_recognition_process():
    # Load recognize and read label from model 
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read("train.yml")
    labels = {"person_name": 1}
    with open("labels.pickle", "rb") as f:
        labels = pickle.load(f)
        labels = {v: k for k, v in labels.items()}
    
    # Define camera and detect face
    face_cascade = cv2.CascadeClassifier('haarcascade/haarcascade_frontalface_default.xml')
    cap = cv2.VideoCapture(1)

    #Open the camera and start face recognition for one minute
    start_time = time.time() # get the current time
    while True:
        if time.time() - start_time >= 60: break
        _, frame = cap.read()
        if frame is None:
            print("Error reading frame from camera")
            continue  # Skip the current iteration and move to the next one
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY) # Convert to grayscale
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.5, minNeighbors=5)

        for (x, y, w, h) in faces:
            roi_gray = gray[y:y + h, x:x + w]
            # predict the id and confidence for faces
            id_, conf = recognizer.predict(roi_gray)
            # If the face is recognized with more than 35% confidence
            if conf >= 35:
                student_id = labels[id_]

                # Find the student's information in the database.
                cursor.execute("SELECT * FROM Student WHERE student_id = %s", (student_id,))
                values = cursor.fetchone()

                if values:
                    cursor.execute("UPDATE Student SET login_time = NOW() WHERE student_id = %s;", (student_id,))
                    conn.commit()
                    res = {
                        'uid': values[0],
                        'name': values[1],
                        'year': values[2],
                        'program': values[3],
                        'latest-login': str(values[4]),
                        'email': values[5]
                    }
                    return jsonify(res)