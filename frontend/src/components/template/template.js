import { Box, Button, Container, IconButton, TextField } from "@mui/material";
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
import SendRoundedIcon from '@mui/icons-material/SendRounded';
//import { uid } from "@/app/page";
import axios from "axios";

export default function Template({ sidebar_index, children }) {
  const [hide, setHide] = useState(true);
  const [uid, setUid] = useState("");
  const [input, setInput] = useState("");
  const [active, setActive] = useState(sidebar_index);
  const [isLoading, setIsLoading] = useState(false);
  const [announcementLoading, setAnnouncementLoading] = useState(false);
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
  const [chat, setChat] = useState(["Hi, how can I help you?"]);
  const [latestAnnouncement, setLatestAnnouncement] = useState([]);
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
  useEffect(() => {
    var objDiv = document.getElementById("chat-history");
    if (objDiv) {
      if (objDiv != null) {
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    }
  });

  useEffect(() => {
    setAnnouncementLoading(true);
    try {
      if (uid !== "") {
        setTimeout(() => {
        axios.get(`http://127.0.0.1:5000/messages?uid=${uid}`).then((res) => {
          if (res.data != null) {
            setLatestAnnouncement(res.data);
            setAnnouncementLoading(false);
          } else {
            alert("An error occurred.");
          }
        })
      }, 3000);
      }

    }
    catch (error) {
      console.error(error);
      setIsLoading(false);
      alert("An error occurred.");
    }

  }, [uid])



  const handleSend = () => {
    setIsLoading(true);
    // send the message to backend
    //sleep 3 s
    let temp = chat;
    temp.push(input);
    setInput("");
    setChat(temp);
    try {
      axios
        .post("http://127.0.0.1:5000/chatbot", {
          uid: uid,
          message: input,
        })
        .then((res) => {
          if (res.data != null) {
            let temp = chat;
            temp.push(res.data.reply);
            setInput("");
            setChat(temp);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            alert("An error occurred.");
          }
        });

    }
    catch (error) {
      console.error(error);
      setIsLoading(false);
      alert("An error occurred.");
    }

    // setTimeout(() => {
    //   temp.push("I am a bot");
    //   setIsLoading(false);
    // }, 3000);
    // let temp = chat;
    // temp.push(input);
    // setInput("");
    // setChat(temp);
    // setIsLoading(false);
  };
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
                color: "#1C6D7E",
                fontWeight: "600",
                marginBottom: "8px",
                textAlign: "center",
                lineHeight: "1.3",
              }}
            >
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
          {announcementLoading && (
            <Box
              sx={{
                boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.1)",
                borderRadius: 2,
                padding: "20px",
                minWidth: "320px",
              }}>

                <div
                  style={{
                    color: "#76989F",
                  }}>
                  Fetching data...
                </div>
            </Box>
          )
          }
          {latestAnnouncement.length !== 0 && (
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
                      {latestAnnouncement[0].time.split(" ")[0].substring(0, 3)}

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
                          {item.time.split(" ")[0].substring(0, 3)}

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
          )}
          {announcementLoading ? (
            <></>): (
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
          )}
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
                }}
              >
                Chat Bot
              </div>
              <Box
                sx={{
                  //use shadow
                  boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                  minWidth: "320px",
                  height: "320px",
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  justifyContent: "space-between",
                }}
              >
                <div
                  id="chat-history"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    maxHeight: "220px",
                    overflowY: "scroll"

                  }}>
                  <div></div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      // justifyContent: "space-between",
                    }}>
                    {chat.map((item, index) => (
                      <>
                        {index % 2 === 1 ? (
                          <div
                            style={{
                              fontSize: "14px",
                              color: "#BCBCBC",
                              marginTop: "5px",
                              //make the gap between the two lines smaller
                              lineHeight: "1.2",
                              marginLeft: "auto",
                              backgroundColor: "#EFF8FB",
                              padding: "10px",
                              paddingLeft: "15px",
                              paddingRight: "15px",
                              color: "#5D97BD",
                              borderRadius: "20px",
                              borderTopRightRadius: "0px",
                              maxWidth: "220px",
                              marginTop: "15px",
                            }}
                          >
                            {item}
                          </div>) : (
                          <div
                            style={{
                              fontSize: "14px",
                              color: "#BCBCBC",
                              lineHeight: "1.2",
                              backgroundColor: "#78C2D2",
                              marginRight: "auto",
                              padding: "10px",
                              paddingLeft: "15px",
                              paddingRight: "15px",
                              color: "#FFFFFF",
                              borderRadius: "20px",
                              borderTopLeftRadius: "0px",
                              marginTop: "15px",
                              maxWidth: "220px",
                            }}
                          >
                            {item}
                          </div>
                        )}
                        {isLoading && index === chat.length - 1 && (
                          <div
                            style={{
                              fontSize: "14px",
                              color: "#BCBCBC",
                              lineHeight: "1.2",
                              backgroundColor: "#78C2D2",
                              marginRight: "auto",
                              padding: "10px",
                              paddingLeft: "15px",
                              paddingRight: "15px",
                              color: "#FFFFFF",
                              borderRadius: "20px",
                              borderTopLeftRadius: "0px",
                              marginTop: "15px",
                              maxWidth: "220px",
                              position: "relative",
                            }}
                          >
                            <span className="loadingDots"></span>
                          </div>
                        )}

                      </>
                    ))
                    }
                  </div>
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderTop: "1px solid #E9E9E9",
                  paddingTop: "15px",
                }}
                  className="chatbot"
                >
                  <TextField
                    id="outlined-multiline-flexible"
                    placeholder="Ask anything ..."
                    multiline
                    size="small"
                    maxRows={2}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault(); // Prevents the addition of a new line in the text field
                        handleSend();
                      }
                    }}
                    sx={(theme) => {
                      return {
                        backgroundColor: "#EFF8FB",
                        '& .MuiInputBase-root': {
                          color: "#5D97BD"
                        },
                        borderRadius: "20px",
                      }
                    }}
                  />
                  <div style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}>
                    <IconButton
                      disabled={isLoading}
                      onClick={() => {
                        handleSend();
                      }} sx={{
                        color: "#ffffff",
                        backgroundColor: "#48A8BC",

                      }}><SendRoundedIcon sx={{
                        fontSize: "20px",
                      }} /></IconButton></div>
                </div>
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
