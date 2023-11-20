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
  const [courses, setCourses] = useState(null);
  useEffect(() => {
    fetchCourseData(); // Call the function to fetch the data when the component mounts
  }, []);

  const fetchCourseData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/courses");
      const data = await response.json();
      console.log('data', data)
      setCourses(data); // Set the fetched data to the component state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return (
    <Template sidebar_index={1}>
      <div
        style={{
          marginBottom: "20px",
          color: "#1C6D7E",
          fontWeight: "500",
          fontSize: "28px",
        }}>
        Courses
      </div>
      {courses ? (
        <div
          style={{
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
                <img
                  src={course.course_image}
                  alt="logo"
                  width="304px"
                  height="160px"
                />
                <div
                  style={{
                    color: "#1C6D7E",
                    fontWeight: "500",
                    fontSize: "16px",
                  }}>
                  {course.course_code}
                </div>
              </div>
              <div
                style={{
                  color: "#78C2D2",
                  fontWeight: "500",
                  fontSize: "14px",
                }}>
                {course.course_name}
              </div>
              <div>
                <Button
                  onClick={() => {
                    window.open(course.course_link, "_blank");
                  }}>
                  View Course
                </Button>
              </div>
            </Box>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Template>
  );
}
