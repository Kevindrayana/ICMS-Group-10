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
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
export default function Dashboard() {
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
                        marginTop:"40px"
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
                </div>
            </div>
        </Template>
    );
}
