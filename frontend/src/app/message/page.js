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

// add the hour and minute 20.15

// create a function to change from 10 to November
const data_month = {
    "01": "January",
    "02": "Feburary",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "Auguest",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
}
export default function Course() {
    const [latestAnnouncement, setLatestAnnouncement] = useState([
        {
            time: "2021-11-03 20:15",
            content: "This is the first announcementhud saihasiudhsua hdauihduiahdu iadhuashuasihdiusad dsahudiahud haud shduisa hduiash duisahd uiadh uasidh uaid huaihd uahduaisdh i",
            course: "COMP3278",
            instructor: "Dr. Luo Ping"
        },
        {
            time: "2021-10-03 20:15",
            content: "This is the first announcement",
            course: "COMP3278",
            instructor: "Dr. Luo Ping"
        },
        {
            time: "2021-10-03 20:15",
            content: "This is the first announcement",
            course: "COMP3278",
            instructor: "Dr. Luo Ping"
        },
        {
            time: "2021-10-03 20:15",
            content: "This is the first announcement",
            course: "COMP3278",
            instructor: "Dr. Luo Ping"
        },
        {
            time: "2021-10-03 20:15",
            content: "This is the first announcement",
            course: "COMP3278",
            instructor: "Dr. Luo Ping"
        },
        {
            time: "2021-10-03 20:15",
            content: "This is the first announcement",
            course: "COMP3278",
            instructor: "Dr. Luo Ping"
        },
        {
            time: "2021-10-03 20:15",
            content: "This is the first announcement",
            course: "COMP3278",
            instructor: "Dr. Luo Ping"
        },
        {
            time: "2021-10-03 20:15",
            content: "This is the first announcement",
            course: "COMP3278",
            instructor: "Dr. Luo Ping"
        },
        {
            time: "2021-10-03 20:15",
            content: "This is the first announcement",
            course: "COMP3278",
            instructor: "Dr. Luo Ping"
        },
        {
            time: "2021-10-03 20:15",
            content: "This is the first announcement",
            course: "COMP3278",
            instructor: "Dr. Luo Ping"
        },
    ]
    );
    // create an array that only contains the month of the announcement
    const [month, setMonth] = useState([]);
    for (let i = 0; i < latestAnnouncement.length; i++) {
        // check if the same no need
        if (month.includes(latestAnnouncement[i].time.split("-")[1])) {
            continue;
        }
        month.push(latestAnnouncement[i].time.split("-")[1]);
    }
    console.log(month)
    return (
        <Template sidebar_index={3}>
            <div style={{
                marginBottom: "20px",
                color: "#1C6D7E",
                fontWeight: "500",
                fontSize: "28px"
            }}>Message Board</div>
            {month.map((m, i) => (
                <>
                    <div style={{
                        fontSize: "16px",
                        color: "#7EBCE6",
                        marginBottom: "20px",
                fontWeight: "500",

                        marginTop: "20px"
                    }}>{data_month[m]}</div>
            {latestAnnouncement.map((item, index) => (
                <>
                {latestAnnouncement[index].time.split("-")[1] === m && (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    paddingBottom: "10px",
                    borderBottom: index === latestAnnouncement.length - 1 ? "none" : "1px solid #E9E9E9",
                }}>
                    <div style={{
                        fontSize: "17px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        color: "#BCBCBC",


                    }}><div style={{
                        width: "120px",
                        color: "#76989F",
                    fontWeight: "500",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                    }}>
                        <div style={{
                            marginRight: "15px"
                        }}>
                            {item.course}
                            </div>
                            <div style={{
                                fontSize: "12px",
                                color: "#D9D9D9"
                            }}>
                                {item.time.split(" ")[1]}
                            </div>
                        </div>
                        <div style={{
                            fontSize: "12px",
                            color: "#BCBCBC"
                        }}>
                        {/* only the date */}
                        {item.time.split(" ")[0]}

                        </div></div>
                    <div style={{
                        fontSize: "17px",
                        color: "#78C2D2",
                        fontWeight: "500",

                    }}>
                        {item.instructor} - Course Instructor
                    </div>
                    <div style={{
                        fontSize: "14px",
                        color: "#5E7380",
                        marginTop: "10px",
                    fontWeight: "500",

                        //make the gap between the two lines smaller
                        lineHeight: "1.2",
                    }}>
                        {item.content}
                    </div>
                </div>
                )}
                </>
                
            ))}
                </>
            ))}
        </Template>
    );
}
