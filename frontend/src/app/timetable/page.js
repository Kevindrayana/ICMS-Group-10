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
// [
//     [
//         "L01",
//         "Room G01, Haking Wong Building",
//         "9:00:00",
//         "10:30:00",
//         "https://zoom.us/comp101-lecture",
//         "COMP101"
//     ],
//     [
//         "T01",
//         "Room G02, Haking Wong Building",
//         "15:00:00",
//         "16:30:00",
//         "https://zoom.us/comp101-tutorial",
//         "COMP101"
//     ],
//     [
//         "L02",
//         "Room 201, K.K. Leung Building",
//         "11:00:00",
//         "12:30:00",
//         "https://zoom.us/math202-lecture",
//         "MATH202"
//     ],
//     [
//         "T02",
//         "Room 202, Knowles Building",
//         "17:00:00",
//         "18:30:00",
//         "https://zoom.us/math202-tutorial",
//         "MATH202"
//     ]
// ]
// create a converter from temp to temp2
const convert = (temp) => {
    let result = []
    for (let i = 0; i < temp.length; i++) {
        result.push({
            title: temp[i][5],
            start: new Date(temp[i][6] + " " + temp[i][2]),
            end: new Date(temp[i][6] + " " + temp[i][3]),

        })
    }
    return result
}

import { Template } from "src/components/template";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
export default function Dashboard() {
    const [timetable_schedule, setTimetable_schedule] = useState([
        [
            "L01",
            "Room G01, Haking Wong Building",
            "9:00:00",
            "10:30:00",
            "https://zoom.us/comp101-lecture",
            "COMP101",
            "2023/11/20"
        ],
        [
            "T01",
            "Room G02, Haking Wong Building",
            "15:00:00",
            "17:20:00",
            "https://zoom.us/comp101-tutorial",
            "COMP101",
            "2023/11/20"

        ],
        [
            "L02",
            "Room 201, K.K. Leung Building",
            "11:00:00",
            "12:30:00",
            "https://zoom.us/math202-lecture",
            "MATH202",
            "2023/11/19"
        ],
        [
            "T02",
            "Room 202, Knowles Building",
            "17:30:00",
            "18:30:00",
            "https://zoom.us/math202-tutorial",
            "MATH202",
            "2023/11/20"

        ]
    ]);
    const [upComingClass, setUpComingClass] = useState({
        name: "Introduction to Database Management System",
        course_code: "COMP3278",
        venue: "MWT 1",
        start_time: "13:30",
        end_time: "15:20",
        latest_announcement: "The order of the group project presentation will be randomly generated. Each group has 5 minutes to present.",
        zoom_link: "https://hku.zoom.us/j/98307568693?pwd=QmlqZERWeDdWRVZ",

    });
    return (
        <Template sidebar_index={2}>
            <div style={{
                marginBottom: "20px",
                color: "#1C6D7E",
                fontWeight: "500",
                fontSize: "28px"
            }}>Calendar
            </div>
            <div style={{
                color: "#48A8BC",
                fontWeight: "500",
                fontSize: "24px"
            }}>Class Timetable</div>
            <div style={{
                marginTop: "20px"
            }}
                className="timetable"
            >
                <Scheduler
                    view="week"
                    height={600}
                    events={convert(timetable_schedule)}
                    deletable={false}
                    week={{
                        weekDays: [0, 1, 2, 3, 4, 5, 6],
                        weekStartOn: 6,
                        startHour: 9,
                        endHour: 21,
                        step: 60,
                    }}
                    day={{
                        startHour: 9,
                        endHour: 21,
                        step: 60,
                    }}
                    editable={false}
                />
            </div>
        </Template>
    );
}
