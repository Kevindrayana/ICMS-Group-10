import { Box, Button, Container } from "@mui/material";
import React, { useEffect } from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import EventIcon from "@mui/icons-material/Event";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Icon } from "@mui/material";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
//import { uid } from "@/app/page";
import axios from "axios";

export default function Template({ sidebar_index, children }) {
  const [hide, setHide] = useState(true);
  const [uid, setUid] = useState("");

  const [active, setActive] = useState(sidebar_index);
  useEffect(() => {
    setActive(sidebar_index);
  }, [sidebar_index]);

  const [person, setPerson] = useState({
    name: "Your Name",
    position: "Student",
    year: "Year 3",
    major: "BEng CompSc",
  });
  const [loginHistory, setLoginHistory] = useState([]);
  const [latestAnnouncement, setLatestAnnouncement] = useState([
    {
      time: "2021-10-03 09:00:00",
      content:
        "This is the first announcementhud saihasiudhsua hdauihduiahdu iadhuashuasihdiusad dsahudiahud haud shduisa hduiash duisahd uiadh uasidh uaid huaihd uahduaisdh i",
      course: "COMP 3278",
      instructor: "Dr. Luo Ping",
    },
    {
      time: "2021-10-03 09:00:00",
      content: "This is the first announcement",
      course: "COMP 3278",
      instructor: "Dr. Luo Ping",
    },
    {
      time: "2021-10-03 09:00:00",
      content: "This is the first announcement",
      course: "COMP 3278",
      instructor: "Dr. Luo Ping",
    },
    {
      time: "2021-10-03 09:00:00",
      content: "This is the first announcement",
      course: "COMP 3278",
      instructor: "Dr. Luo Ping",
    },
    {
      time: "2021-10-03 09:00:00",
      content: "This is the first announcement",
      course: "COMP 3278",
      instructor: "Dr. Luo Ping",
    },
    {
      time: "2021-10-03 09:00:00",
      content: "This is the first announcement",
      course: "COMP 3278",
      instructor: "Dr. Luo Ping",
    },
    {
      time: "2021-10-03 09:00:00",
      content: "This is the first announcement",
      course: "COMP 3278",
      instructor: "Dr. Luo Ping",
    },
  ]);
  useEffect(() => {
    // Perform localStorage action
    if (sessionStorage.getItem("uid") === null) {
      window.location.href = "/";
    }
    setUid(sessionStorage.getItem("uid"));
    setLoginHistory([
      sessionStorage.getItem("latest-login").slice(0, 10),
      sessionStorage.getItem("latest-login").slice(11),
    ]);
    setPerson({
      name: sessionStorage.getItem("name"),
      position: "Student",
      year: sessionStorage.getItem("year"),
      major: sessionStorage.getItem("program"),
    });
  }, []);
  const handleClick = (index) => {
    setActive(index);
    if (index === 0) {
      window.location.href = "/dashboard";
    } else if (index === 1) {
      window.location.href = "/course";
    } else if (index === 2) {
      window.location.href = "/announcement";
    }
  };
  const handleLogout = () => {
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("latest-login");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("year");
    sessionStorage.removeItem("program");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
      <div
        style={{
          // width: "17%",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // minHeight: "90vh",
          height: "0px",
          minHeight: "100vh",
          maxWidth: "250px",
          minWidth: "250px",
          overflow: "auto !important",
          // alignItems: "left",
        }}>
        <div
          style={
            {
              // marginBottom: "20px",
            }
          }>
          <img
            src="image/logo.png"
            alt="logo"
            width="200px"
            height="45"
            style={{
              marginBottom: "40px",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              // justifyContent: "space-between",
              padding: "10px",
              color: active === 0 ? "#48A8BC" : "#BCBCBC",
              backgroundColor: active === 0 ? "#78C2D21A" : "#FFFFFF",
              cursor: "pointer",
              borderRadius: "10px",
            }}
            onClick={() => handleClick(0)}>
            <DashboardOutlinedIcon sx={{ fontSize: 22, marginRight: "15px" }} />
            <div>Dashboard</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              padding: "10px",
              color: sidebar_index === 1 ? "#48A8BC" : "#BCBCBC",
              backgroundColor: active === 1 ? "#78C2D21A" : "#FFFFFF",
              cursor: "pointer",
              borderRadius: "10px",
              marginTop: "5px",
            }}
            onClick={() => handleClick(1)}>
            <CollectionsBookmarkOutlinedIcon
              sx={{ fontSize: 25, marginRight: "15px" }}
            />
            <div>Course</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              padding: "10px",
              color: active === 2 ? "#48A8BC" : "#BCBCBC",
              backgroundColor: active === 2 ? "#78C2D21A" : "#FFFFFF",
              cursor: "pointer",
              borderRadius: "10px",
              marginTop: "5px",
            }}
            onClick={() => handleClick(2)}>
            <ChatBubbleOutlineOutlinedIcon
              sx={{ fontSize: 25, marginRight: "15px" }}
            />
            <div>Announcement</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "285px",
            alignItems: "left",
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <img
              src="image/random.png"
              alt="avatar"
              width="80"
              height="80"
              style={{
                borderRadius: "50%",
                marginBottom: "20px",
              }}
            />
            <div
              style={{
                fontSize: "20px",
                color: "#48A8BC",
                marginBottom: "5px",
                textAlign: "center",
              }}>
              {person.name}
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#48A8BC",
              }}>
              {person.position} - Year {person.year}
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#48A8BC",
              }}>
              {person.major}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              padding: "10px",
              color: "#1C6D7E",
              cursor: "pointer",
              borderRadius: "10px",
            }}
            onClick={() => handleLogout()}>
            <LogoutIcon sx={{ fontSize: 25, marginRight: "15px" }} />
            <div>Logout</div>
          </div>
        </div>
      </div>
      <div
        className="content"
        style={{
          padding: "32px",
          width: "58%",
          overflow: "auto",
          height: "0px",
          minHeight: "100vh",
          minWidth: "400px",
        }}>
        {children}
      </div>
      {/* right sidebar */}

      <div
        style={{
          width: "25%",
          minWidth: "380px",
          maxWidth: "380px",
          padding: "32px",
          height: "0px",
          minHeight: "100vh",
          overflow: "auto !important",
        }}
        className="right-sidebar">
        <div>
          <div
            style={{
              fontSize: "24px",
              color: "#48A8BC",
              marginBottom: "10px",
            }}>
            Latest Announcement
          </div>
          <Box
            sx={{
              boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.1)",
              borderRadius: 2,
              padding: "20px",
              minWidth: "320px",
            }}>
            {hide ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                  paddingBottom: "5px",
                }}>
                <div
                  style={{
                    fontSize: "17px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    color: "#BCBCBC",
                    alignItems: "center",
                  }}>
                  <div
                    style={{
                      width: "120px",
                      color: "#76989F",
                    }}>
                    {latestAnnouncement[0].course}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                    }}>
                    {latestAnnouncement[0].time.split(" ")[0]}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "17px",
                    color: "#78C2D2",
                  }}>
                  {latestAnnouncement[0].instructor} - Course Instructor
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#BCBCBC",
                    marginTop: "10px",
                    maxWidth: "300px",
                    //make the gap between the two lines smaller
                    lineHeight: "1.2",
                  }}>
                  {latestAnnouncement[0].content}
                </div>
              </div>
            ) : (
              <>
                {latestAnnouncement.slice(0, 7).map((item, index) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                      paddingBottom: "10px",
                      borderBottom:
                        index === latestAnnouncement.length - 1
                          ? "none"
                          : "1px solid #E9E9E9",
                    }}>
                    <div
                      style={{
                        fontSize: "17px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        color: "#BCBCBC",
                      }}>
                      <div
                        style={{
                          width: "120px",
                          color: "#76989F",
                        }}>
                        {item.course}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                        }}>
                        {item.time.split(" ")[0]}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "17px",
                        color: "#78C2D2",
                      }}>
                      {item.instructor} - Course Instructor
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
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
            )}
          </Box>
          <div
            style={{
              fontSize: "14px",
              color: "#48A8BC",
              cursor: "pointer",
              marginTop: "10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            onClick={() => setHide(!hide)}>
            {hide ? (
              "See More ->"
            ) : (
              <>
                <div>&lt;- See Less</div>
                <div
                  onClick={() => {
                    window.location.href = "/announcement";
                  }}>
                  See More
                </div>
              </>
            )}
          </div>
        </div>
        {hide ? (
          <>
            <div
              style={{
                marginTop: "20px",
              }}>
              <div
                style={{
                  fontSize: "24px",
                  color: "#48A8BC",
                  marginBottom: "10px",
                }}>
                Calendar
              </div>
              <Box
                sx={{
                  //use shadow
                  boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                  minWidth: "320px",
                }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    sx={{
                      color: "#2B7099",
                      maxWidth: "320px",
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </div>
            <div
              style={{
                marginTop: "20px",
              }}>
              <div
                style={{
                  fontSize: "24px",
                  color: "#48A8BC",
                  marginBottom: "10px",
                }}>
                Last Login
              </div>
              {loginHistory && (
                <Box
                  sx={{
                    //use shadow
                    boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.1)",
                    borderRadius: 2,
                    padding: "20px",
                    minWidth: "320px",
                    fontSize: "14px",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "left",
                      color: "#BCBCBC",
                    }}>
                    <div
                      style={{
                        width: "120px",
                        color: "#76989F",
                      }}>
                      Date
                    </div>
                    <div>{loginHistory[0]}</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "left",
                      color: "#BCBCBC",
                    }}>
                    <div
                      style={{
                        width: "120px",
                        color: "#76989F",
                      }}>
                      Login Time
                    </div>
                    <div>{loginHistory[1]}</div>
                  </div>
                </Box>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
