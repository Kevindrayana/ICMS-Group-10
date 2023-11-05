from flask import Flask

app = Flask(__name__)

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

@app.route("/class", methods=['GET'])
def class_():
    return "<p>Class</p>"

@app.route("/timetable", methods=['GET'])
def timetable():
    return "<p>Timetable</p>"

@app.route("/mail", methods=['POST'])
def mail():
    return "<p>Mail</p>"

if __name__ == "__main__":
    app.run(debug=True)