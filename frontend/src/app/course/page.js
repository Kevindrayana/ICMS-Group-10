"use client";
// CREATE TABLE Lecture (
//     sub_class VARCHAR(255) PRIMARY KEY,
//     course_code VARCHAR(255),
//     notes TEXT,
//     classroom_address VARCHAR(255),
//     start_time TIME,
//     end_time TIME,
//     FOREIGN KEY (course_code) REFERENCES Course(course_code)
// );
import { Template } from "src/components/template";
import { Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
export default function Course() {
    const [courses, setCourses] = useState([{
        course_code: "COMP3278",
        course_name: "Introduction to Database Management System",
        course_url: "https://moodle.hku.hk/course/view.php?id=106523",
        course_img: "image/course_img.jpg"
    }, {
        course_code: "COMP3230",
        course_name: "Principal of Operating System",
        course_url: "https://moodle.hku.hk/course/view.php?id=106523",
        course_img: "image/course_img.jpg"
    }, {
        course_code: "COMP3314",
        course_name: "Machine Learning",
        course_url: "https://moodle.hku.hk/course/view.php?id=106523",
        course_img: "image/course_img.jpg"
    }, {
        course_code: "COMP2501",
        course_name: "Introduction to Data Science",
        course_url: "https://moodle.hku.hk/course/view.php?id=106523",
        course_img: "image/course_img.jpg"
    }, {
        course_code: "COMP2121",
        course_name: "Discrete Mathematics",
        course_url: "https://moodle.hku.hk/course/view.php?id=106523",
        course_img: "image/course_img.jpg"
    }, {
        course_code: "COMP2119",
        course_name: "Introduction to Data Structure and Algorithm",
        course_url: "https://moodle.hku.hk/course/view.php?id=106523",
        course_img: "image/course_img.jpg"
    }, {
        course_code: "COMP3297",
        course_name: "Software Engineering",
        course_url: "https://moodle.hku.hk/course/view.php?id=106523",
        course_img: "image/course_img.jpg"
    }, {
        course_code: "COMP2120",
        course_name: "Computer Organization",
        course_url: "https://moodle.hku.hk/course/view.php?id=106523",
        course_img: "image/course_img.jpg"
    }
    ]);
    return (
        <Template sidebar_index={1}>
            <div style={{
                marginBottom: "20px",
                color: "#1C6D7E",
                fontWeight: "500",
                fontSize: "28px"
            }}>Courses</div>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
            }}>
                {courses.map((course) => (

                    <Box 
                    sx={{
                        boxShadow: 1,
                        borderRadius: 2,
                        padding: "20px",
                        height: "336px",
                        width: "344px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        margin: "10px",
                        alignItems: "left",
                      }}>
                        <div>
                        <img src={course.course_img} alt="logo" width="304px" height="160px" />
                        <div style={{
                            color: "#1C6D7E",
                            fontWeight: "500",
                            fontSize: "16px"
                        }}>{course.course_code}</div>
                        </div>
                        <div style={{
                            color: "#78C2D2",
                            fontWeight: "500",
                            fontSize: "14px"
                        }}>{course.course_name}</div>
                        <div>
                        <Button onClick={()=> {
                            window.open(course.course_url, "_blank")
                        }}>View Course</Button>
                        </div>
                      </Box>
                )
                )}
</div>
        </Template>
    );
}
