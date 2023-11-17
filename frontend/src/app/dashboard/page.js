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
import {Button} from "@mui/material";
export default function Dashboard() {
    return (
        <Template>
            <div>Student Dashboard</div>
            <div>
            <div> Upcoming Class</div>
            <div></div>
            <Button variant="contained">Send to Email</Button>
            </div>
        </Template>
    );
}
