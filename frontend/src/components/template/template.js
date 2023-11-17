import { Box, Button, Container } from "@mui/material";
import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import EventIcon from '@mui/icons-material/Event';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Icon } from "@mui/material";
import { useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
export default function Template({ children }) {
    const [hide, setHide] = useState(true);
    const [active, setActive] = useState(0);
    // i want to create something to store name, position, year, major and put it in the data structure, which data structure is the best
    const [person, setPerson] = useState({
        name: 'Your Name',
        position: 'Student',
        year: "Year 3",
        major: 'BEng CompSc'
    });
    const [loginHistory, setLoginHistory] = useState(
        {
            date: "2021-10-03",
            loginTime: "10:00",
            logoutTime: "12:00",
            Duration: "2 hours",
        }
    );
    const [latestAnnouncement, setLatestAnnouncement] = useState([
        {
            time: "2021-10-03",
            content: "This is the first announcementhud saihasiudhsua hdauihduiahdu iadhuashuasihdiusad dsahudiahud haud shduisa hduiash duisahd uiadh uasidh uaid huaihd uahduaisdh i",
            course: "COMP 3278",
            instructor: "Dr. Luo Ping"
        },
        {
            time: "2021-10-03",
            content: "This is the first announcement",
            course: "COMP 3278",
            instructor: "Dr. Luo Ping"
        },
        {
            time: "2021-10-03",
            content: "This is the first announcement",
            course: "COMP 3278",
            instructor: "Dr. Luo Ping"
        },
        {
            time: "2021-10-03",
            content: "This is the first announcement",
            course: "COMP 3278",
            instructor: "Dr. Luo Ping"
        },
        {
            time: "2021-10-03",
            content: "This is the first announcement",
            course: "COMP 3278",
            instructor: "Dr. Luo Ping"
        },
        {
            time: "2021-10-03",
            content: "This is the first announcement",
            course: "COMP 3278",
            instructor: "Dr. Luo Ping"
        },
        {
            time: "2021-10-03",
            content: "This is the first announcement",
            course: "COMP 3278",
            instructor: "Dr. Luo Ping"
        },
    ]
    );
    const handleClick = (index) => {
        setActive(index);
    }
    const handleLogout = () => {
        //logout
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",

        }}>
            <div style={{
                width: "265px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "100vh",
                overflow: "auto !important",
                // alignItems: "left",
            }}
            >
                <div style={{
                    // marginBottom: "20px",
                }}>
                    <img src="image/logo.png" alt="logo" width="200" height="45" style={{
                        marginBottom: "20px",
                    }} />

                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        // justifyContent: "space-between",
                        padding: "10px",
                        color: active === 0 ? "#48A8BC" : "#BCBCBC",
                        backgroundColor: active === 0 ? "#78C2D21A" : "#FFFFFF",
                        cursor: "pointer",
                        borderRadius: "10px",
                    }}
                        onClick={() => handleClick(0)}
                    >
                        <DashboardIcon sx={{ fontSize: 22, marginRight: "15px" }} />
                        <div>Dashboard</div>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        padding: "10px",
                        color: active === 1 ? "#48A8BC" : "#BCBCBC",
                        backgroundColor: active === 1 ? "#78C2D21A" : "#FFFFFF",
                        cursor: "pointer",
                        borderRadius: "10px",
                    }}
                        onClick={() => handleClick(1)}
                    >
                        <CollectionsBookmarkIcon sx={{ fontSize: 25, marginRight: "15px" }} />
                        <div>Course</div>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        padding: "10px",
                        color: active === 2 ? "#48A8BC" : "#BCBCBC",
                        backgroundColor: active === 2 ? "#78C2D21A" : "#FFFFFF",
                        cursor: "pointer",
                        borderRadius: "10px",

                    }}
                        onClick={() => handleClick(2)}
                    >
                        <EventIcon sx={{ fontSize: 25, marginRight: "15px" }} />
                        <div>Timetable</div>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        padding: "10px",
                        color: active === 3 ? "#48A8BC" : "#BCBCBC",
                        backgroundColor: active === 3 ? "#78C2D21A" : "#FFFFFF",
                        cursor: "pointer",
                        borderRadius: "10px",

                    }}
                        onClick={() => handleClick(3)}
                    >
                        <ChatBubbleIcon sx={{ fontSize: 25, marginRight: "15px" }} />
                        <div>Message</div>
                    </div>


                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minHeight: "341px",
                        alignItems: "left",
                    }}
                >
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                        <img src="image/random.png" alt="avatar" width="80" height="80" style={{
                            //make it circle
                            borderRadius: "50%",
                            marginBottom: "20px",
                        }} />
                        <div style={{
                            fontSize: "20px",
                            color: "#48A8BC",
                            marginBottom: "5px",
                        }}>{person.name}</div>
                        <div style={{
                            fontSize: "14px",
                            color: "#48A8BC",
                        }}>{person.position}-{person.year}</div>
                        <div style={{
                            fontSize: "14px",
                            color: "#48A8BC",
                        }}>{person.major}</div>
                        <Button variant="contained" sx={{
                            marginTop: "15px",
                        }}>
                            View Profile
                        </Button>

                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        padding: "10px",
                        color: "#1C6D7E",
                        cursor: "pointer",
                        borderRadius: "10px",

                    }}
                        onClick={() => handleLogout()}
                    >
                        <LogoutIcon sx={{ fontSize: 25, marginRight: "15px" }} />
                        <div>Logout</div>
                    </div>
                </div>

            </div>
            {/* sidebar */}
            <div style={{
                padding: "32px",
                overflow: "hidden"

            }}>
                {children}
            </div>
            <div style={{
                width: "382px",
                padding: "32px",
                overflow: "auto !important",

            }}>
                <div>
                    <div style={{
                        fontSize: "24px",
                        color: "#48A8BC",
                        marginBottom: "10px",
                    }}>Latest Announcement</div>
                    <Box sx={{
                        boxShadow: 1,
                        borderRadius: 2,
                        padding: "20px",
                    }}>
                            {hide?
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                marginBottom: "5px",
                                paddingBottom: "5px",
                            }}>
                                <div style={{
                                    fontSize: "17px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    color: "#BCBCBC"


                                }}><div style={{
                                    width: "120px",
                                    color: "#76989F"
                                }}>
                                        {latestAnnouncement[0].course}
                                    </div>
                                    <div>
                                        {latestAnnouncement[0].time}
                                    </div></div>
                                <div style={{
                                    fontSize: "17px",
                                    color: "#78C2D2",

                                }}>
                                        {latestAnnouncement[0].instructor} - Course Instructor
                                </div>
                                <div style={{
                                    fontSize: "17px",
                                    color: "#BCBCBC",
                                    marginTop: "10px",
                                    maxWidth: "300px",
                                    //make the gap between the two lines smaller
                                    lineHeight: "1.2",
                                }}>
                                        {latestAnnouncement[0].content}
                                        </div>
                            </div> : <>
                        {latestAnnouncement.map((item, index) => (

                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                marginBottom: "5px",
                                paddingBottom: "5px",
                                borderBottom: index === latestAnnouncement.length - 1 ? "none" : "1px solid #E9E9E9",
                            }}>
                                <div style={{
                                    fontSize: "17px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    color: "#BCBCBC"


                                }}><div style={{
                                    width: "120px",
                                    color: "#76989F"
                                }}>
                                        {item.course}
                                    </div>
                                    <div>
                                        {item.time}
                                    </div></div>
                                <div style={{
                                    fontSize: "17px",
                                    color: "#78C2D2"

                                }}>
                                        {item.instructor} - Course Instructor
                                </div>
                                <div style={{
                                    fontSize: "17px",
                                    color: "#BCBCBC",
                                    marginTop: "10px",
                                    maxWidth: "300px",
                                    //make the gap between the two lines smaller
                                    lineHeight: "1.2",
                                }}>
                                        {item.content}
                                        </div>
                            </div>
                        ))}
                        </>
                        }
                    </Box>
                    <div style={{
                        fontSize: "14px",
                        color: "#48A8BC",
                        cursor: "pointer",
                        marginTop: "10px",
                    }}
                        onClick={() => setHide(!hide)}
                    >{hide ? "See More ->" : "<- See Less"}</div>

                </div>
                {hide ?
                <>
                <div style={{
                    marginTop: "20px",
                }}>
                    <div style={{
                        fontSize: "24px",
                        color: "#48A8BC",
                        marginBottom: "10px",
                    }}>Calendar</div>
                    <Box sx={{
                        //use shadow
                        boxShadow: 1,
                        borderRadius: 2,

                    }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar sx={{
                                color: "#2B7099",
                            }} />
                        </LocalizationProvider>
                    </Box>
                </div>
                <div style={{
                    marginTop: "20px",
                }}>
                    <div style={{
                        fontSize: "24px",
                        color: "#48A8BC",
                        marginBottom: "10px",
                    }}>Last Login</div>
                    <Box sx={{
                        //use shadow
                        boxShadow: 1,
                        borderRadius: 2,
                        padding: "20px",
                    }}>
                        <div style={{
                            fontSize: "17px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "left",
                            color: "#BCBCBC"


                        }}><div style={{
                            width: "120px",
                            color: "#76989F"
                        }}>
                                Date
                            </div>
                            <div>
                                {loginHistory.date}
                            </div></div>
                        <div style={{
                            fontSize: "17px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "left",
                            color: "#BCBCBC"


                        }}><div style={{
                            width: "120px",
                            color: "#76989F"
                        }}>
                                Login Time
                            </div>
                            <div>
                                {loginHistory.loginTime}
                            </div></div>
                    </Box>
                </div>
                </>
                : <></>}
            </div>
        </div>)
}

