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
    course_image VARCHAR(511)
);
CREATE TABLE Lesson (
    lesson_id VARCHAR(3),
    classroom_address VARCHAR(255),
    start_time DATETIME,
    end_time DATETIME,
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
INSERT INTO Student (
        student_id,
        name,
        year,
        program,
        login_time,
        email,
        password
    )
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
        3,
        'BDS',
        '2023-11-20 14:00:00',
        'danielng@hku.hk',
        'password5'
    ),
    (
        '3035000006',
        'Jenny Chan',
        3,
        'BEng(EEE)',
        '2023-11-20 14:20:00',
        'jennychan@hku.hk',
        'password6'
    ),
    (
        '3035000007',
        'Jason Wong',
        3,
        'BAsc',
        '2023-11-20 14:30:00',
        'jasonwong@hku.hk',
        'password7'
    ),
    (
        '3035000008',
        'Mike Lee',
        3,
        'BSc',
        '2023-11-20 14:35:00',
        'mikelee@hku.hk',
        'password8'
    ),
    (
        '3035000009',
        'Lesley Smith',
        3,
        'MBBS',
        '2023-11-20 14:40:00',
        'lesleysmith@hku.hk',
        'password5'
    ),
    (
        '3035902570',
        'Grizelda',
        3,
        'BEng',
        '2023-11-20 14:45:00',
        'griz@hku.hk',
        'password10'
    ),
    (
        '3035000000',
        'Davinne Valeria',
        3,
        'BEng(CivE)',
        '2023-11-20 15:30:00',
        'dapinnlol25@gmail.com',
        'password'
    ),
    (
        '3035918701',
        'Kevin Indrayana Istimur',
        3,
        'BEng(CompSc)',
        '2023-11-20 15:30:00',
        'indrayana.kevin@gmail.com',
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
        'https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg?w=1480&t=st=1700639967~exp=1700640567~hmac=a0bca512bf5fe8a483a048e5a38304017af2810568ec23acf023dbb0ceaf3d18'
    ),
    (
        'MATH202',
        1,
        'https://moodle.hku.hk/course/view.php?id=90458',
        'Calculus and Linear Algebra II',
        'https://img.freepik.com/free-vector/realistic-math-chalkboard-background_23-2148158749.jpg?w=996&t=st=1700640085~exp=1700640685~hmac=f4a0327cde26d6f068f8ca7c9fcb2fcb5900dad9852f29892339f54100248cc4'
    ),
    (
        'BIOC101',
        1,
        'https://moodle.hku.hk/course/view.php?id=96516',
        'Introduction to Biochemistry',
        'https://img.freepik.com/free-photo/equipment-researchers_23-2148824239.jpg?w=1480&t=st=1700639908~exp=1700640508~hmac=8a4026cb9d0e3f531d9b4dae24bff495f9be23393ac0869efb3a0cf36efd086c'
    ),
    (
        'BIOL201',
        1,
        'https://moodle.hku.hk/course/view.php?id=95900',
        'Microbiology',
        'https://img.freepik.com/free-photo/virolog-coducting-experiment-course-coronavirus-pandemic-with-micropipette-chemist-modern-laboratory-doing-research-using-dispenser-during-global-epidemic-with-covid-19_482257-5737.jpg?w=1480&t=st=1700640128~exp=1700640728~hmac=f674ad85bd07f84117edf96d85c73df3f40df2eac995c262de397dfb0171b6ec'
    ),
    (
        'PHYS301',
        1,
        'https://moodle.hku.hk/course/view.php?id=85655',
        'Electricity and Magnetism',
        'https://img.freepik.com/free-photo/smart-microchip-background-motherboard-closeup-technology-remix_53876-104233.jpg?w=1480&t=st=1700640422~exp=1700641022~hmac=5b9f919fca74df59afe5174d9b2d713b683bfa7eaac06f2164a3f2e9507f6a8f'
    ),
    (
        'CHEM201',
        1,
        'https://moodle.hku.hk/course/view.php?id=86603',
        'General Chemistry',
        'https://img.freepik.com/free-vector/science-doodle-pattern_23-2147492328.jpg?1&w=996&t=st=1700640210~exp=1700640810~hmac=0610032771c72b0f943f4c9bcdab31df1ba64c17fc30442e955f00273f515229'
    ),
    (
        'FINA101',
        1,
        'https://moodle.hku.hk/course/view.php?id=105820',
        'Introductory Finance',
        'https://img.freepik.com/free-photo/screen-with-graph-it-that-says-word-financial-it_188544-27324.jpg?t=st=1700638747~exp=1700642347~hmac=da993edc383fc7759c85e2ce721c7d06bbee94ef213525f2e971e32dcf516eb2&w=1800'
    ),
    (
        'ECON102',
        1,
        'https://moodle.hku.hk/course/view.php?id=98043',
        'Microeconomics',
        'https://img.freepik.com/free-photo/golden-abacus-with-chinese-rmb-gold-coins-as-background_1387-145.jpg?w=1480&t=st=1700640297~exp=1700640897~hmac=efa7a548a3c2a2faf0a233684805254b6dbbc906ff2fd73bd8bf74ec65df0dcd'
    ),
    (
        'ENGL101',
        1,
        'https://moodle.hku.hk/course/view.php?id=91913',
        'English for Academic Purposes',
        'https://img.freepik.com/free-photo/young-student-looking-book-library_23-2149215403.jpg?w=1480&t=st=1700640371~exp=1700640971~hmac=bd52c20ec77667fcafc53d4a0e907bd7bb1a66d516429492eed6494beddc7c3d'
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
        '2023-09-04 09:30:00',
        '2023-09-04 12:30:00',
        'https://zoom.us/comp101-lecture',
        'COMP101'
    ),
    (
        'L02',
        'Room 201, K.K. Leung Building',
        '2023-09-05 09:30:00',
        '2023-09-05 11:30:00',
        'https://zoom.us/math202-lecture',
        'MATH202'
    ),
    (
        'L03',
        'Room 301, Kadoorie Biological Sciences Building',
        '2023-09-07 10:30:00',
        '2023-09-07 13:30:00',
        'https://zoom.us/bioc101-lecture',
        'BIOC101'
    ),
    (
        'L04',
        'Room 401, Kadoorie Biological Sciences Building',
        '2023-09-07 14:30:00',
        '2023-09-07 17:30:00',
        'https://zoom.us/biol201-lecture',
        'BIOL201'
    ),
    (
        'L05',
        'Room 501, Chong Yuet Ming Physics Building',
        '2023-09-08 14:30:00',
        '2023-09-08 15:30:00',
        'https://zoom.us/phys301-lecture',
        'PHYS301'
    ),
    (
        'L06',
        'Room 101, K.K. Leung Building',
        '2023-09-06 09:30:00',
        '2023-09-06 12:30:00',
        'https://zoom.us/fina101-lecture',
        'FINA101'
    ),
    (
        'L07',
        'Room 701, K.K. Leung Building',
        '2023-09-05 16:30:00',
        '2023-09-05 17:30:00',
        'https://zoom.us/econ102-lecture',
        'ECON102'
    ),
    (
        'L08',
        'Room 701, Centennial Campus',
        '2023-09-06 09:30:00',
        '2023-09-06 12:30:00',
        'https://zoom.us/engl101-lecture',
        'ENGL101'
    ),
    (
        'T01',
        'Room G02, Haking Wong Building',
        '2023-09-05 16:30:00',
        '2023-09-05 17:30:00',
        'https://zoom.us/comp101-tutorial',
        'COMP101'
    ),
    (
        'T02',
        'Room 202, Knowles Building',
        '2023-09-07 16:30:00',
        '2023-09-07 17:30:00',
        'https://zoom.us/math202-tutorial',
        'MATH202'
    ),
    (
        'T03',
        'Room 302, Centennial Campus',
        '2023-09-08 10:30:00',
        '2023-09-08 11:30:00',
        'https://zoom.us/phys301-tutorial',
        'PHYS301'
    ),
    (
        'T04',
        'Room 402, Meng Wah Complex',
        '2023-09-08 09:30:00',
        '2023-09-08 10:30:00',
        'https://zoom.us/fina101-tutorial',
        'FINA101'
    ),
    (
        'T05',
        'Room 402, Knowles Building',
        '2023-09-06 12:30:00',
        '2023-09-06 13:30:00',
        'https://zoom.us/econ102-tutorial',
        'ECON102'
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
        'L04',
        'https://moodle.hku.hk/mod/resource/view.php?id=3067675'
    ),
    (
        'L05',
        'https://moodle.hku.hk/mod/resource/view.php?id=3067676'
    ),
    (
        'L06',
        'https://moodle.hku.hk/mod/resource/view.php?id=3067677'
    ),
    (
        'L07',
        'https://moodle.hku.hk/mod/resource/view.php?id=3067678'
    ),
    (
        'L08',
        'https://moodle.hku.hk/mod/resource/view.php?id=3067679'
    ),
    (
        'T01',
        'https://moodle.hku.hk/mod/resource/view.php?id=3067675'
    ),
    (
        'T02',
        'https://moodle.hku.hk/mod/resource/view.php?id=3067676'
    ),
    (
        'T03',
        'https://moodle.hku.hk/mod/resource/view.php?id=3067677'
    ),
    (
        'T04',
        'https://moodle.hku.hk/mod/resource/view.php?id=3067678'
    ),
    (
        'T05',
        'https://moodle.hku.hk/mod/resource/view.php?id=3067679'
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
    ('3035000000', 'PHYS301'),
    ('3035918701', 'COMP101'),
    ('3035918701', 'MATH202'),
    ('3035918701', 'BIOC101'),
    ('3035918701', 'BIOL201'),
    ('3035918701', 'PHYS301'),
    ('3035918701', 'CHEM201'),
    ('3035918701', 'FINA101'),
    ('3035918701', 'ECON102'),
    ('3035918701', 'ENGL101');
INSERT INTO Teaching_Staff (staff_id, name)
VALUES ('9999000001', 'Dr. Chan Tai Man'),
    ('9999000002', 'Prof. Emily Wong'),
    ('9999000003', 'Dr. Michael Li'),
    ('9999000004', 'Prof. Sophia Lam'),
    ('9999000005', 'Dr. Daniel Kwok'),
    ('9999000006', 'Dr. Kevin Tong'),
    ('9999000007', 'Dr. Grace Hui'),
    ('9999000008', 'Dr. Bryan Lam');
INSERT INTO Teaching_Staff_asoc_lesson (staff_id, lesson_id, course_code, role)
VALUES ('9999000001', 'L01', 'COMP101', 'professor'),
    ('9999000002', 'L02', 'MATH202', 'professor'),
    ('9999000003', 'L05', 'PHYS301', 'professor'),
    ('9999000004', 'T01', 'COMP101', 'tutor'),
    ('9999000005', 'T03', 'PHYS301', 'tutor'),
    ('9999000006', 'T04', 'FINA101', 'tutor'),
    ('9999000007', 'L07', 'ECON102', 'tutor'),
    ('9999000008', 'L08', 'ENGL101', 'professor');
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
        'Welcome to COMP101! We are excited to have you in this course. In COMP101, we will cover the fundamentals of computer science and programming. Get ready for an exciting journey!',
        'COMP101',
        '2020-11-20 09:00:00'
    ),
    (
        2,
        '9999000001',
        'Reminder: Assignment 1 is due next week. Make sure to complete the programming tasks and submit your code by November 27th, 2020.',
        'COMP101',
        '2020-11-22 15:30:00'
    ),
    (
        3,
        '9999000002',
        'Welcome to MATH202! This course will delve into advanced mathematical concepts and their applications. Prepare to expand your problem-solving skills and explore the beauty of mathematics.',
        'MATH202',
        '2020-11-20 11:00:00'
    ),
    (
        4,
        '9999000002',
        'Attention students: The deadline for the first problem set has been extended to December 3rd, 2020. Take this opportunity to ensure your solutions are accurate and well-presented.',
        'MATH202',
        '2020-11-23 09:45:00'
    ),
    (
        5,
        '9999000003',
        'Welcome to PHYS301! In this course, we will explore the fascinating world of physics and delve into various laws and theories. Get ready for mind-boggling experiments and captivating discussions!',
        'PHYS301',
        '2020-11-20 12:00:00'
    ),
    (
        6,
        '9999000003',
        'Important Announcement: The deadline for the research paper has been rescheduled. The final submission is now due on December 10th, 2020. Make sure to allocate enough time for thorough research and polished writing.',
        'PHYS301',
        '2020-11-25 16:20:00'
    ),
    (
        7,
        '9999000004',
        'Welcome to COMP101! We are thrilled to have you join this course. COMP101 is all about building a strong foundation in computer science and programming concepts. Brace yourself for an enriching learning experience!',
        'COMP101',
        '2020-11-20 14:00:00'
    ),
    (
        8,
        '9999000004',
        'Attention students: Remember to submit your group project proposals by November 30th, 2020. Collaborate with your team members and come up with innovative ideas for your project.',
        'COMP101',
        '2020-11-24 10:15:00'
    ),
    (
        9,
        '9999000005',
        'Welcome to PHYS301! Prepare to embark on a thrilling journey through the realms of physics. We will dive deep into the mysteries of the universe and uncover the fundamental laws that govern it.',
        'PHYS301',
        '2020-11-20 13:00:00'
    ),
    (
        10,
        '9999000005',
        'Reminder: The lab report for Experiment 2 is due this Friday. Make sure to include detailed observations, calculations, and analysis. Submit your reports by November 27th, 2020.',
        'PHYS301',
        '2020-11-22 18:30:00'
    ),
    (
        11,
        '9999000006',
        'Welcome to FINA101! Get ready to explore the exciting world of finance and economics. In this course, we will analyze markets, investments, and financial instruments. Let the adventure begin!',
        'FINA101',
        '2020-11-20 17:00:00'
    ),
    (
        12,
        '9999000006',
        'Attention students: The midterm exam has been scheduled for December 5th, 2020. Start preparing early and make use of the study materials provided. Good luck!',
        'FINA101',
        '2020-11-24 14:55:00'
    ),
    (
        13,
        '9999000007',
        'Welcome to ECON102! This course will take you on a journey through the principles of economics. We will examine various economic systems, policies, and their impact on society. Get ready to broaden your economic perspective!',
        'ECON102',
        '2020-11-20 18:00:00'
    ),
    (
        14,
        '9999000007',
        'Reminder: The deadline for the research essay is approaching. Submit your well-researched and properly cited essays by November 29th, 2020. Reach out if you need any guidance.',
        'ECON102',
        '2020-11-23 11:30:00'
    ),
    (
        15,
        '9999000008',
        'Welcome to ENGL101! In this course, we will explore the world of literature and enhance our communication skills. Get ready toexplore captivating stories, analyze literary techniques, and express your thoughts eloquently!',
        'ENGL101',
        '2020-11-20 12:00:00'
    ),
    (
        16,
        '9999000008',
        'Important Announcement: The due date for the final essay has been extended to December 7th, 2020. Take this opportunity to refine your analysis and ensure your arguments are well-supported.',
        'ENGL101',
        '2020-11-25 09:10:00'
    );