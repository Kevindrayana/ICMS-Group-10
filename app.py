from flask import Flask, jsonify, request, Response
import mysql.connector
from mysql.connector import errorcode
import os
from dotenv import load_dotenv
from flask_cors import CORS
from email.message import EmailMessage
import ssl
import smtplib
import openai
from recognition import start_face_recognition_process
import sys

app = Flask(__name__)
app.secret_key = "Hello"

# Enable CORS
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Load environment variables from .env file
load_dotenv() 

# Create connection to MySQL database
config = {
    'user': 'root',
    'password': os.getenv('SQL_PASSWORD'),
    'host': '127.0.0.1',
    'port': 3306,
    'database': 'icms',
}
try:
    conn = mysql.connector.connect(**config) # Connect to MySQL database
    cursor = conn.cursor()
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your username or password.")
        sys.exit(1)
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist.")
        sys.exit(1)
    else:
        print(err)
        sys.exit(1)

# OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

# ***** API Endpoints *****
@app.route('/chatbot', methods=['POST'])
def chatbot():
    # Retrieve the user's message from the request
    message = request.json['message']

    # handle the case where the user's message is empty
    if not message:
        return jsonify({'reply': 'Sorry, I did not understand your question. Please try again.'})

    # Feed the data (table) to the prompt
    with open('data.txt', 'r') as file:
        data = file.read()

    # Give static prompt
    prompt = f"Given the data from {data}, what is the answer to this question: {message}. If the answer is not available, just answer the prompt casually, forget about the data."

    # Call the OpenAI API to generate a response
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.5,
    )

    # Extract the response text from the API response
    reply = response.choices[0].text.strip()

    # Return the response as a JSON object
    return jsonify({'reply': reply})

@app.route("/start-face-recognition", methods=['GET'])
def start_face_recognition():
    return start_face_recognition_process()

@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    student_id = data['username']
    password = data['password']

    if request.method == 'POST':
        cursor.execute("SELECT * FROM Student WHERE student_id = %s AND password = %s;", (student_id, password))
        values = cursor.fetchone()
        if values:
            cursor.execute("UPDATE Student SET login_time = NOW() WHERE student_id = %s;", (student_id,))
            conn.commit()

    # JSONify the response
    values = {
        'uid': values[0],
        'name': values[1],
        'year': values[2],
        'program': values[3],
        'latest-login': str(values[4]),
        'email': values[5]
    }
    return jsonify(values)

@app.route("/timetable", methods=['GET'])
def timetable():
    # get the student_id from request parameter
    student_id = request.args.get('uid') if request.args.get('uid') else "0000000000"
    
    query = f"SELECT * FROM Lesson WHERE course_code IN (\
    SELECT course_code FROM Student_asoc_course\
    WHERE student_id = '{student_id}');"
    
    cursor.execute(query)
    values = cursor.fetchall()

    res = []
    for r in values:
        res.append({
            "lesson_id": r[0],
            "classroom_address": r[1],
            "start_time": r[2].isoformat(),
            "end_time": r[3].isoformat(),
            "zoom_link": r[4],
            "course_code": r[5]
        })
    return jsonify(res)

@app.route("/latest-login", methods=['GET'])
def latest_login():
    # get the student_id from request parameter
    student_id = request.args.get('uid') if request.args.get('uid') else "0000000000"

    query = f"SELECT student_id, login_time FROM Student WHERE student_id = {student_id};"
    cursor.execute(query)
    values = cursor.fetchone()

    if values:
        response = {
            'student_id': values[0],
            'login_time': values[1].isoformat()
        }

    return jsonify(response)

@app.route("/courses", methods=['GET'])
def get_courses():
    # get the student_id from request parameter
    student_id = request.args.get('uid') if request.args.get('uid') else "0000000000"

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
    return jsonify(res)

@app.route("/upcoming-class", methods=['GET'])
def upcoming_class():
    # get the student_id from request parameters
    student_id = request.args.get('uid') if request.args.get('uid') else "0000000000"

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
    WHERE sac.student_id = "{student_id}"
    AND l.start_time BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 1 HOUR)
    ORDER BY ABS(TIMEDIFF(l.start_time, NOW()))
    LIMIT 1;
    '''
    cursor.execute(query)
    result = cursor.fetchone()
    
    if not result:
        response = {
            "success": False,
        }
    else:
        response = {
            "success": True,
            "course_code": result[0],
            "course_name": result[1],
            "start_time": str(result[2]),
            "end_time": str(result[3]),
            "venue": result[4],
            "zoom_link": result[5],
            "latest_announcement": result[6]
        }

    return jsonify(response)

@app.route("/mail", methods=['GET'])
def mail():
    # get the student_id from request parameters
    student_id = request.args.get('uid') if request.args.get('uid') else "0000000000"
    
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
    WHERE sac.student_id = "{student_id}"
    AND l.start_time BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 1 HOUR)
    ORDER BY ABS(TIMEDIFF(l.start_time, NOW()))
    LIMIT 1;
    '''
    cursor.execute(query)
    value = cursor.fetchone()

    email_body = f"Dear {student_name},\n\nHere is your upcoming schedule for the next hour:\n\n"
    email_body += f"Course Code: {value[0]}\n"
    email_body += f"Course Name: {value[1]}\n"
    email_body += f"Start Time: {value[2]}\n"
    email_body += f"End Time: {value[3]}\n"
    email_body += f"Classroom Address: {value[4]}\n"
    email_body += f"Zoom Link: {value[5]}\n\n"

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
    student_id = request.args.get('uid') if request.args.get('uid') else "0000000000"

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
    return jsonify(res)

@app.route("/search-messages", methods=['GET'])
def search_messages():
    # get the student_id from request parameter
    student_id = request.args.get('uid') if request.args.get('uid') else "0000000000"

    # get the search keyword from request parameter
    keyword = request.args.get('keyword') if request.args.get('keyword') else ""

    # get the messages for the student that contains the keyword
    query = f'''
    SELECT m.sent_time, m.content, m.course_code, t.name
    FROM Message as m
    INNER JOIN Teaching_Staff as t
    ON t.staff_id = m.staff_id
    INNER JOIN Student_asoc_course as s
    ON s.course_code = m.course_code
    WHERE s.student_id = '{student_id}'
    AND (m.content LIKE '%{keyword}%' OR t.name LIKE '%{keyword}%' OR m.course_code LIKE '%{keyword}%')
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
    return jsonify(res)


if __name__ == "__main__":
    app.run(debug=True)