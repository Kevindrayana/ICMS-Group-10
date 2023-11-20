DROP TABLE IF EXISTS Message;
DROP TABLE IF EXISTS Teaching_Staff_asoc_lesson;
DROP TABLE IF EXISTS Student_asoc_course;
DROP TABLE IF EXISTS Teaching_Staff;
DROP TABLE IF EXISTS Lesson_Notes;
DROP TABLE IF EXISTS Lesson;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS Student;
CREATE TABLE Student (
    student_id INT PRIMARY KEY,
    name VARCHAR(255),
    login_time DATETIME,
    email VARCHAR(255),
    password VARCHAR(255)
);
CREATE TABLE Course (
    course_code VARCHAR(255) PRIMARY KEY,
    semester INT
);
CREATE TABLE Lesson (
    lesson_id VARCHAR(3),
    classroom_address VARCHAR(255),
    start_time TIME,
    end_time TIME,
    zoom_link VARCHAR(255),
    course_code VARCHAR(255),
    PRIMARY KEY (lesson_id, course_code),
    FOREIGN KEY (course_code) REFERENCES Course(course_code)
);
CREATE TABLE Lesson_Notes (
    lesson_id VARCHAR(3),
    notes VARCHAR(255),
    PRIMARY KEY (lesson_id, notes),
    FOREIGN KEY (lesson_id) REFERENCES Lesson(lesson_id)
);
CREATE TABLE Teaching_Staff (
    staff_id INT PRIMARY KEY,
    name VARCHAR(255)
);
CREATE TABLE Student_asoc_course (
    student_id INT,
    course_code VARCHAR(255),
    PRIMARY KEY (student_id, course_code),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (course_code) REFERENCES Course(course_code)
);
CREATE TABLE Teaching_Staff_asoc_lesson (
    staff_id INT,
    lesson_id VARCHAR(3),
    course_code VARCHAR(255),
    role VARCHAR(255),
    PRIMARY KEY (staff_id, lesson_id, course_code),
    FOREIGN KEY (staff_id) REFERENCES Teaching_Staff(staff_id),
    FOREIGN KEY (lesson_id, course_code) REFERENCES Lesson(lesson_id, course_code)
);
CREATE TABLE Message (
    message_id INT PRIMARY KEY,
    staff_id INT,
    content VARCHAR(255),
    course_code VARCHAR(255),
    FOREIGN KEY (staff_id) REFERENCES Teaching_Staff(staff_id),
    FOREIGN KEY (course_code) REFERENCES Course(course_code)
);

INSERT INTO Student (student_id, name, login_time, email, password)
VALUES (
        1,
        'John Chan',
        '2023-11-20 08:00:00',
        'johnchan@hku.hk',
        'password1'
    ),
    (
        2,
        'Emma Lee',
        '2023-11-20 09:30:00',
        'emmalee@hku.hk',
        'password2'
    ),
    (
        3,
        'Michael Wong',
        '2023-11-20 10:45:00',
        'michaelwong@hku.hk',
        'password3'
    ),
    (
        4,
        'Sophia Cheung',
        '2023-11-20 12:15:00',
        'sophiacheung@hku.hk',
        'password4'
    ),
    (
        5,
        'Daniel Ng',
        '2023-11-20 14:00:00',
        'danielng@hku.hk',
        'password5'
    );
INSERT INTO Course (course_code, semester)
VALUES ('COMP101', 1),
    ('MATH202', 1),
    ('PHYS301', 1),
    ('CHEM201', 1),
    ('ENGL101', 1);
INSERT INTO Lesson (
        lesson_id,
        classroom_address,
        start_time,
        end_time,
        zoom_link,
        course_code
    )
VALUES (
        'L01',
        'Room G01, Haking Wong Building',
        '09:00:00',
        '10:30:00',
        'https://zoom.us/comp101-lecture',
        'COMP101'
    ),
    (
        'L02',
        'Room 201, K.K. Leung Building',
        '11:00:00',
        '12:30:00',
        'https://zoom.us/math202-lecture',
        'MATH202'
    ),
    (
        'L03',
        'Room 301, Chong Yuet Ming Physics Building',
        '13:00:00',
        '14:30:00',
        'https://zoom.us/phys301-lecture',
        'PHYS301'
    ),
    (
        'T01',
        'Room G02, Haking Wong Building',
        '15:00:00',
        '16:30:00',
        'https://zoom.us/comp101-tutorial',
        'COMP101'
    ),
    (
        'T02',
        'Room 202, Knowles Building',
        '17:00:00',
        '18:30:00',
        'https://zoom.us/math202-tutorial',
        'MATH202'
    );
INSERT INTO Lesson_Notes (lesson_id, notes)
VALUES (
        'L01',
        'https://moodle.hku.hk/mod/resource/view.php?id=3067672'
    ),
    (
        'L02',
        'https://moodle.hku.hk/mod/resource/view.php?id=3067673'
    ),
    (
        'L03',
        'https://moodle.hku.hk/mod/resource/view.php?id=3067674'
    ),
    (
        'T01',
        'https://moodle.hku.hk/mod/resource/view.php?id=3067675'
    ),
    (
        'T02',
        'https://moodle.hku.hk/mod/resource/view.php?id=3067676'
    );
INSERT INTO Student_asoc_course (student_id, course_code)
VALUES (1, 'COMP101'),
    (1, 'MATH202'),
    (2, 'MATH202'),
    (2, 'PHYS301'),
    (2, 'COMP101'),
    (3, 'COMP101'),
    (3, 'MATH202'),
    (4, 'MATH202'),
    (4, 'PHYS301'),
    (5, 'COMP101'),
    (5, 'MATH202'),
    (5, 'PHYS301');
INSERT INTO Teaching_Staff (staff_id, name)
VALUES (1, 'Dr. Chan Tai Man'),
    (2, 'Prof. Emily Wong'),
    (3, 'Dr. Michael Li'),
    (4, 'Prof. Sophia Lam'),
    (5, 'Dr. Daniel Kwok');
INSERT INTO Teaching_Staff_asoc_lesson (staff_id, lesson_id, course_code, role)
VALUES (1, 'L01', 'COMP101', 'professor'),
    (2, 'L02', 'MATH202', 'professor'),
    (3, 'L03', 'PHYS301', 'professor'),
    (4, 'T01', 'COMP101', 'tutor'),
    (5, 'T02', 'MATH202', 'tutor');