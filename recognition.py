from flask import jsonify
import cv2          
import pickle
import mysql.connector
import os

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
    #Load recognize and read label from model 
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read("train.yml")
    labels = {"person_name": 1}
    with open("labels.pickle", "rb") as f:
        labels = pickle.load(f)
        labels = {v: k for k, v in labels.items()}
    
    # Define camera and detect face
    face_cascade = cv2.CascadeClassifier('haarcascade/haarcascade_frontalface_default.xml')
    cap = cv2.VideoCapture(1)

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
            if conf >= 60:
                font = cv2.QT_FONT_NORMAL
                student_id = labels[id_]
                color = (255, 0, 0)
                stroke = 2
                cv2.putText(frame, student_id, (x, y), font, 1, color, stroke, cv2.LINE_AA)
                cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), (2))

                # Find the student's information in the database.
                cursor.execute("SELECT * FROM Student WHERE student_id = %s", (student_id,))
                values = cursor.fetchone()
                print(values)

                if values:
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
        cv2.setWindowProperty("Attendance System", cv2.WND_PROP_TOPMOST, 1)

        k = cv2.waitKey(100) & 0xff
        if k == ord('q') or flag:
            break
                
    cap.release()
    cv2.destroyAllWindows()
 
    if response['signin'] == True:
        cursor.execute("UPDATE Student SET login_time = NOW() WHERE student_id = %s;", (student_id,))
        conn.commit()
        cursor.execute("SELECT * FROM Student WHERE student_id = %s;", (student_id,))
        values = cursor.fetchone()

    # return the response
    return jsonify(response)
