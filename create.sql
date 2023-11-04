SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+08:00";

-- CREATE TABLES --
DROP TABLE IF EXISTS Student;
CREATE TABLE Student (
    uid INT PRIMARY KEY,
    name VARCHAR(255),
    login_time TIME,
    login_date DATE
);
DROP TABLE IF EXISTS Student_asoc_course;
CREATE TABLE Student_asoc_course (
    uid INT,
    course_code VARCHAR(255),
    PRIMARY KEY (uid, course_code),
    FOREIGN KEY (uid) REFERENCES Student(uid),
    FOREIGN KEY (course_code) REFERENCES Course(course_code)
);
DROP TABLE IF EXISTS Course;
CREATE TABLE Course (
    course_code VARCHAR(255) PRIMARY KEY,
    semester INT
);
DROP TABLE IF EXISTS Lecture;
CREATE TABLE Lecture (
    sub_class VARCHAR(255) PRIMARY KEY,
    course_code VARCHAR(255),
    notes TEXT,
    classroom_address VARCHAR(255),
    timeslot VARCHAR(255),
    FOREIGN KEY (course_code) REFERENCES Course(course_code)
);
DROP TABLE IF EXISTS Tutorial;
CREATE TABLE Tutorial (
    tutorial_id INT PRIMARY KEY,
    course_code VARCHAR(255),
    notes TEXT,
    classroom_address VARCHAR(255),
    timeslot VARCHAR(255),
    FOREIGN KEY (course_code) REFERENCES Course(course_code)
);
DROP TABLE IF EXISTS Teaching_Staff;
CREATE TABLE Teaching_Staff (
    staff_id INT PRIMARY KEY,
    name VARCHAR(255)
);
DROP TABLE IF EXISTS Professor;
CREATE TABLE Professor (
    staff_id INT PRIMARY KEY,
    name VARCHAR(255)
);
DROP TABLE IF EXISTS Professor_asoc_lecture;
CREATE TABLE Professor_asoc_lecture (
    staff_id INT,
    course_code VARCHAR(255),
    PRIMARY KEY (staff_id, course_code),
    FOREIGN KEY (staff_id) REFERENCES Professor(staff_id),
    FOREIGN KEY (course_code) REFERENCES Lecture(course_code)
);
DROP TABLE IF EXISTS Tutor;
CREATE TABLE Tutor (
    staff_id INT PRIMARY KEY,
    name VARCHAR(255)
);
DROP TABLE IF EXISTS Tutor_asoc_tutorial;
CREATE TABLE Tutor_asoc_tutorial (
    staff_id INT,
    course_code VARCHAR(255),
    PRIMARY KEY (staff_id, course_code),
    FOREIGN KEY (staff_id) REFERENCES Tutor(staff_id),
    FOREIGN KEY (course_code) REFERENCES Tutorial(course_code)
);
DROP TABLE IF EXISTS Message;
CREATE TABLE Message (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    staff_id INT,
    content TEXT,
    FOREIGN KEY (staff_id) REFERENCES Teaching_Staff(staff_id)
);

--INSERT DATA--
-- Inserting data into the Student table
INSERT INTO Student (uid, name, login_time, login_date) VALUES
(1, 'John Doe', '09:00:00', '2023-10-01'),
(2, 'Jane Smith', '14:30:00', '2023-10-02'),
(3, 'Alice Johnson', '10:15:00', '2023-10-03');

-- Inserting data into the Student_asoc_course table
INSERT INTO Student_asoc_course (uid, course_code) VALUES
(1, 'CSE101'),
(2, 'MATH202'),
(2, 'PHYS101'),
(3, 'CSE101'),
(3, 'PHYS101');

-- Inserting data into the Course table
INSERT INTO Course (course_code, semester) VALUES
('CSE101', 1),
('MATH202', 2),
('PHYS101', 1);

-- Inserting data into the Lecture table
INSERT INTO Lecture (sub_class, course_code, notes, classroom_address, timeslot) VALUES
('L01', 'CSE101', 'Introduction to Computer Science', 'Room A101', '09:00-10:30'),
('L02', 'MATH202', 'Calculus II', 'Room B202', '11:00-12:30'),
('L03', 'PHYS101', 'Mechanics and Waves', 'Room C303', '10:00-11:30');

-- Inserting data into the Tutorial table
INSERT INTO Tutorial (tutorial_id, course_code, notes, classroom_address, timeslot) VALUES
(1, 'CSE101', 'Lab session for programming practice', 'Lab A', '14:00-16:00'),
(2, 'MATH202', 'Problem-solving session', 'Room B101', '13:00-15:00'),
(3, 'PHYS101', 'Experiment demonstration', 'Lab C', '15:00-17:00');

-- Inserting data into the Teaching_Staff table
INSERT INTO Teaching_Staff (staff_id, name) VALUES
(1, 'Dr. Robert Johnson'),
(2, 'Prof. Emily Wilson'),
(3, 'Dr. Michael Thompson');

-- Inserting data into the Professor table
INSERT INTO Professor (staff_id, name) VALUES
(1, 'Dr. Robert Johnson'),
(2, 'Prof. Emily Wilson');

-- Inserting data into the Professor_asoc_lecture table
INSERT INTO Professor_asoc_lecture (staff_id, course_code) VALUES
(1, 'CSE101'),
(2, 'MATH202'),
(2, 'PHYS101');

-- Inserting data into the Tutor table
INSERT INTO Tutor (staff_id, name) VALUES
(3, 'Dr. Michael Thompson');

-- Inserting data into the Tutor_asoc_tutorial table
INSERT INTO Tutor_asoc_tutorial (staff_id, course_code) VALUES
(3, 'CSE101'),
(3, 'PHYS101');

-- Inserting data into the Message table
INSERT INTO Message (staff_id, content) VALUES
(1, 'Reminder: Assignment submission due next week.'),
(2, 'Today''s lecture has been canceled.'),
(3, 'Tutorial rescheduled to tomorrow.');