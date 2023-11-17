SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+08:00";
DROP TABLE IF EXISTS Message;
DROP TABLE IF EXISTS Tutor_asoc_tutorial;
DROP TABLE IF EXISTS Tutor;
DROP TABLE IF EXISTS Professor_asoc_lecture;
DROP TABLE IF EXISTS Professor;
DROP TABLE IF EXISTS Teaching_Staff;
DROP TABLE IF EXISTS Tutorial;
DROP TABLE IF EXISTS Lecture;
DROP TABLE IF EXISTS Student_asoc_course;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS Student;
CREATE TABLE Student (
    student_id VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    name VARCHAR(255),
    email VARCHAR(255),
    login_time DATETIME
);
CREATE TABLE Course (
    course_code VARCHAR(255) PRIMARY KEY,
    semester INT
);
CREATE TABLE Student_asoc_course (
    student_id VARCHAR(255),
    course_code VARCHAR(255),
    PRIMARY KEY (student_id, course_code),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (course_code) REFERENCES Course(course_code)
);
CREATE TABLE Lecture (
    sub_class VARCHAR(255) PRIMARY KEY,
    course_code VARCHAR(255),
    notes TEXT,
    classroom_address VARCHAR(255),
    start_time TIME,
    end_time TIME,
    FOREIGN KEY (course_code) REFERENCES Course(course_code)
);
CREATE TABLE Tutorial (
    tutorial_id INT PRIMARY KEY,
    course_code VARCHAR(255),
    notes TEXT,
    classroom_address VARCHAR(255),
    start_time TIME,
    end_time TIME,
    FOREIGN KEY (course_code) REFERENCES Course(course_code)
);
CREATE TABLE Teaching_Staff (
    staff_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255)
);
CREATE TABLE Professor (
    staff_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255)
);
CREATE TABLE Professor_asoc_lecture (
    staff_id VARCHAR(255),
    course_code VARCHAR(255),
    PRIMARY KEY (staff_id, course_code),
    FOREIGN KEY (staff_id) REFERENCES Professor(staff_id),
    FOREIGN KEY (course_code) REFERENCES Lecture(course_code)
);
CREATE TABLE Tutor (
    staff_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255)
);
CREATE TABLE Tutor_asoc_tutorial (
    staff_id VARCHAR(255),
    course_code VARCHAR(255),
    PRIMARY KEY (staff_id, course_code),
    FOREIGN KEY (staff_id) REFERENCES Tutor(staff_id),
    FOREIGN KEY (course_code) REFERENCES Tutorial(course_code)
);
CREATE TABLE Message (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    staff_id VARCHAR(255),
    content TEXT,
    FOREIGN KEY (staff_id) REFERENCES Teaching_Staff(staff_id)
);
INSERT INTO Student (
        student_id,
        password,
        name,
        email,
        login_time
    )
VALUES (
        '3035000001',
        '1234',
        'John Doe',
        'john.doe@gmail.com',
        '2023-10-01 09:00:00'
    ),
    (
        '3035000002',
        '1234',
        'Jane Smith',
        'jane.smith@gmail.com',
        '2023-10-02 14:30:00'
    ),
    (
        '3035000003',
        '1234',
        'Alice Johnson',
        'alice.johnson@gmail.com',
        '2023-10-03 10:15:00'
    );
INSERT INTO Course (course_code, semester)
VALUES ('CSE101', 1),
    ('MATH202', 2),
    ('PHYS101', 1);
INSERT INTO Student_asoc_course (student_id, course_code)
VALUES ('3035000001', 'CSE101'),
    ('3035000002', 'MATH202'),
    ('3035000002', 'PHYS101'),
    ('3035000003', 'CSE101'),
    ('3035000003', 'PHYS101');
INSERT INTO Lecture (
        sub_class,
        course_code,
        notes,
        classroom_address,
        start_time,
        end_time
    )
VALUES (
        'L01',
        'CSE101',
        'https://moodle.hku.hk/mod/resource/view.php?id=3081960',
        'Room A101',
        '09:00:00',
        '10:30:00'
    ),
    (
        'L02',
        'MATH202',
        'https://moodle.hku.hk/mod/resource/view.php?id=3088157',
        'Room B202',
        '11:00:00',
        '12:30:00'
    ),
    (
        'L03',
        'PHYS101',
        'https://moodle.hku.hk/mod/resource/view.php?id=3095353',
        'Room C303',
        '10:00:00',
        '11:30:00'
    );
INSERT INTO Tutorial (
        tutorial_id,
        course_code,
        notes,
        classroom_address,
        start_time,
        end_time
    )
VALUES (
        1,
        'CSE101',
        'https://moodle.hku.hk/mod/resource/view.php?id=3067672',
        'Lab A',
        '14:00:00',
        '16:00:00'
    ),
    (
        2,
        'MATH202',
        'https://moodle.hku.hk/mod/resource/view.php?id=3118496',
        'Room B101',
        '13:00:00',
        '15:00:00'
    ),
    (
        3,
        'PHYS101',
        'https://moodle.hku.hk/mod/resource/view.php?id=3081895',
        'Lab C',
        '15:00:00',
        '17:00:00'
    );
INSERT INTO Teaching_Staff (staff_id, name)
VALUES ('9035000001', 'Dr. Robert Johnson'),
    ('9035000002', 'Prof. Emily Wilson'),
    ('9035000003', 'Dr. Michael Thompson');
INSERT INTO Professor (staff_id, name)
VALUES ('9035000001', 'Dr. Robert Johnson'),
    ('9035000002', 'Prof. Emily Wilson');
INSERT INTO Professor_asoc_lecture (staff_id, course_code)
VALUES ('9035000001', 'CSE101'),
    ('9035000002', 'MATH202'),
    ('9035000002', 'PHYS101');
INSERT INTO Tutor (staff_id, name)
VALUES ('9035000003', 'Dr. Michael Thompson');
INSERT INTO Tutor_asoc_tutorial (staff_id, course_code)
VALUES ('9035000003', 'CSE101'),
    ('9035000003', 'PHYS101');
INSERT INTO Message (staff_id, content)
VALUES (
        '9035000001',
        'Reminder: Assignment submission due next week.'
    ),
    (
        '9035000002',
        'Today''s lecture has been canceled.'
    ),
    (
        '9035000003',
        'Tutorial rescheduled to tomorrow.'
    );