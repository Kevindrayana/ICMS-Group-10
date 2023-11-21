DROP TABLE IF EXISTS Message;
DROP TABLE IF EXISTS Teaching_Staff_asoc_lesson;
DROP TABLE IF EXISTS Student_asoc_course;
DROP TABLE IF EXISTS Teaching_Staff;
DROP TABLE IF EXISTS Lesson_Notes;
DROP TABLE IF EXISTS Lesson;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS Student;
CREATE TABLE Student (
    student_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255),
    year INT,
    program VARCHAR(255),
    login_time DATETIME,
    email VARCHAR(255),
    password VARCHAR(255)
);
CREATE TABLE Course (
    course_code VARCHAR(255) PRIMARY KEY,
    semester INT,
    course_link VARCHAR(255),
    course_name VARCHAR(255),
    course_image VARCHAR(255)
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
    staff_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255)
);
CREATE TABLE Student_asoc_course (
    student_id VARCHAR(10),
    course_code VARCHAR(255),
    PRIMARY KEY (student_id, course_code),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (course_code) REFERENCES Course(course_code)
);
CREATE TABLE Teaching_Staff_asoc_lesson (
    staff_id VARCHAR(10),
    lesson_id VARCHAR(3),
    course_code VARCHAR(255),
    role VARCHAR(255),
    PRIMARY KEY (staff_id, lesson_id, course_code),
    FOREIGN KEY (staff_id) REFERENCES Teaching_Staff(staff_id),
    FOREIGN KEY (lesson_id, course_code) REFERENCES Lesson(lesson_id, course_code)
);
CREATE TABLE Message (
    message_id INT PRIMARY KEY,
    staff_id VARCHAR(10),
    content VARCHAR(255),
    course_code VARCHAR(255),
    sent_time DATETIME,
    FOREIGN KEY (staff_id) REFERENCES Teaching_Staff(staff_id),
    FOREIGN KEY (course_code) REFERENCES Course(course_code)
);
INSERT INTO Student (student_id, name, year, program, login_time, email, password)
VALUES (
        '3035000001',
        'John Chan',
        3, 
        'BEng(CompSc)',
        '2023-11-20 08:00:00',
        'johnchan@hku.hk',
        'password1'
    ),
    (
        '3035000002',
        'Emma Lee',
        2,
        'BAsc',
        '2023-11-20 09:30:00',
        'emmalee@hku.hk',
        'password2'
    ),
    (
        '3035000003',
        'Michael Wong',
        2,
        'BSc',
        '2023-11-20 10:45:00',
        'michaelwong@hku.hk',
        'password3'
    ),
    (
        '3035000004',
        'Sophia Cheung',
        4,
        'MBBS',
        '2023-11-20 12:15:00',
        'sophiacheung@hku.hk',
        'password4'
    ),
    (
        '3035000005',
        'Daniel Ng',
        5,
        'BDS',
        '2023-11-20 14:00:00',
        'danielng@hku.hk',
        'password5'
    ),
    (
        '3035000000',
        'Davinne Valeria',
        3,
        'BEng(CivE)',
        '2023-11-20 15:30:00',
        'dapinnlol25@gmail.com',
        -- 'indrayana.kevin@gmail.com',
        'password'
        );
INSERT INTO Course (
        course_code,
        semester,
        course_link,
        course_name,
        course_image
    )
VALUES (
        'COMP101',
        1,
        'https://moodle.hku.hk/course/view.php?id=98713',
        'Introduction to Computer Science',
        'https://img.freepik.com/free-vector/blue-copy-space-digital-background_23-2148821698.jpg?w=1480&t=st=1700509392~exp=1700509992~hmac=b72a7d7ea0baf5c88e0257b42bbe615bdf7171d26e8434daa1be8c1b806b58fc'
    ),
    (
        'MATH202',
        1,
        'https://moodle.hku.hk/course/view.php?id=90458',
        'Calculus and Linear Algebra II',
        'https://img.freepik.com/free-vector/blue-copy-space-digital-background_23-2148821698.jpg?w=1480&t=st=1700509392~exp=1700509992~hmac=b72a7d7ea0baf5c88e0257b42bbe615bdf7171d26e8434daa1be8c1b806b58fc'
    ),
    (
        'PHYS301',
        1,
        'https://moodle.hku.hk/course/view.php?id=85655',
        'Electricity and Magnetism',
        'https://img.freepik.com/free-vector/blue-copy-space-digital-background_23-2148821698.jpg?w=1480&t=st=1700509392~exp=1700509992~hmac=b72a7d7ea0baf5c88e0257b42bbe615bdf7171d26e8434daa1be8c1b806b58fc'
    ),
    (
        'CHEM201',
        1,
        'https://moodle.hku.hk/course/view.php?id=86603',
        'General Chemistry',
        'https://img.freepik.com/free-vector/blue-copy-space-digital-background_23-2148821698.jpg?w=1480&t=st=1700509392~exp=1700509992~hmac=b72a7d7ea0baf5c88e0257b42bbe615bdf7171d26e8434daa1be8c1b806b58fc'
    ),
    (
        'ENGL101',
        1,
        'https://moodle.hku.hk/course/view.php?id=91913',
        'English for Academic Purposes',
        'https://img.freepik.com/free-vector/blue-copy-space-digital-background_23-2148821698.jpg?w=1480&t=st=1700509392~exp=1700509992~hmac=b72a7d7ea0baf5c88e0257b42bbe615bdf7171d26e8434daa1be8c1b806b58fc'
    );
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
VALUES ('3035000001', 'COMP101'),
    ('3035000001', 'MATH202'),
    ('3035000002', 'MATH202'),
    ('3035000002', 'PHYS301'),
    ('3035000002', 'COMP101'),
    ('3035000003', 'COMP101'),
    ('3035000003', 'MATH202'),
    ('3035000004', 'MATH202'),
    ('3035000004', 'PHYS301'),
    ('3035000005', 'COMP101'),
    ('3035000005', 'MATH202'),
    ('3035000005', 'PHYS301'),
    ('3035000000', 'COMP101'),
    ('3035000000', 'MATH202'),
    ('3035000000', 'PHYS301');
INSERT INTO Teaching_Staff (staff_id, name)
VALUES ('9999000001', 'Dr. Chan Tai Man'),
    ('9999000002', 'Prof. Emily Wong'),
    ('9999000003', 'Dr. Michael Li'),
    ('9999000004', 'Prof. Sophia Lam'),
    ('9999000005', 'Dr. Daniel Kwok');
INSERT INTO Teaching_Staff_asoc_lesson (staff_id, lesson_id, course_code, role)
VALUES ('9999000001', 'L01', 'COMP101', 'professor'),
    ('9999000002', 'L02', 'MATH202', 'professor'),
    ('9999000003', 'L03', 'PHYS301', 'professor'),
    ('9999000004', 'T01', 'COMP101', 'tutor');
INSERT INTO Message (
        message_id,
        staff_id,
        content,
        course_code,
        sent_time
    )
VALUES (
        1,
        '9999000001',
        'Welcome to COMP101!',
        'COMP101',
        '2020-11-20 09:00:00'
    ),
    (
        2,
        '9999000002',
        'Welcome to MATH202!',
        'MATH202',
        '2020-11-20 11:00:00'
    ),
    (
        3,
        '9999000003',
        'Welcome to PHYS301!',
        'PHYS301',
        '2020-11-20 13:00:00'
    ),
    (
        4,
        '9999000004',
        'Welcome to COMP101!',
        'COMP101',
        '2020-11-20 15:00:00'
    );