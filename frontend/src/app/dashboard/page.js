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
            "16:30:00",
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
            "17:00:00",
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
        <Template sidebar_index={0}>
            <div style={{
                marginBottom: "20px",
                color: "#1C6D7E",
                fontWeight: "500",
                fontSize: "28px"
            }}>Student Dashboard</div>
            <div>
                <div>
                    <div style={{
                        color: "#48A8BC",
                        fontWeight: "500",
                        fontSize: "24px"
                    }}> Upcoming Class</div>
                    <div style={{
                        backgroundColor: "#78C2D20D",
                        marginTop: "20px",
                        padding: "20px",
                        justifyContent: "space-between",
                        borderRadius: "16px",
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "left",
                            fontSize: "20px",
                            fontWeight: "500"
                        }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#1C6D7E"
                            }}>
                                <div>{upComingClass.start_time}</div>
                                <div style={{
                                    width: "1px",
                                    height: "4px",
                                    backgroundColor: "black"
                                }}></div>
                                <div>{upComingClass.end_time}</div>
                            </div>
                            <div style={{
                                width: "1px",
                                margin: "5px 15px 5px 15px",
                                backgroundColor: "#78C2D2"
                            }}></div>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between"
                            }}>
                                <div style={{
                                    color: "#7EBCE6"
                                }}>{upComingClass.course_code}</div>
                                <div style={{
                                    color: "#2B7099"
                                }}>{upComingClass.name}</div>
                            </div>
                        </div>
                        <div style={{
                            fontSize: "14px",
                            marginTop: "20px",
                            color: "#78C2D2"
                        }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                <div style={{
                                    marginRight: "12px",
                                    width: "80px"
                                }}>
                                    Venue
                                </div>
                                <div style={{
                                    color: "#48A8BC"
                                }}>
                                    {upComingClass.venue}
                                </div>
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                <div style={{
                                    marginRight: "12px",
                                    width: "80px"

                                }}>
                                    Zoom
                                </div>
                                <div style={{
                                    color: "#48A8BC"
                                }}>
                                    {upComingClass.zoom_link}
                                </div>
                            </div>
                        </div>
                        <div style={{
                            height: "1px",
                            backgroundColor: "#78C2D240",
                            marginTop: "20px",
                            marginBottom: "20px"
                        }}></div>
                        <div>
                            <div style={{
                                color: "#78C2D2"
                            }}>Teacher's Message</div>
                            <div style={{
                                fontSize: "14px",
                                color: "#BCBCBC"
                            }}>{upComingClass.latest_announcement}</div>
                        </div>

                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "20px",
                    }}>

                        <Button style={{
                            marginRight: "20px"
                        }}>Go to Course</Button>
                        <Button >Send to Email</Button>
                    </div>
                    <div style={{
                        color: "#48A8BC",
                        fontWeight: "500",
                        fontSize: "24px",
                        marginTop: "40px"
                    }}>Class Timetable</div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "20px",
                    }}>

                        <Button style={{
                            marginRight: "20px"
                        }}>Add Reminder</Button>
                        <Button >Edit Reminder</Button>

                    </div>
                    {/* timetable */}
                    <div style={{
                        marginTop: "20px"
                    }}
                    className="timetable"
                    >
                    <Scheduler
                        view="week"
                        style={{ height: "500px" }}
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
                    />
                </div>
                </div>
            </div>
        </Template>
    );
}
