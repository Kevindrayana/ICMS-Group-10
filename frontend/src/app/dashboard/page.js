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
  let result = [];
  for (let i = 0; i < temp.length; i++) {
    result.push({
      title: temp[i][5],
      start: new Date(temp[i][6] + " " + temp[i][2]),
      end: new Date(temp[i][6] + " " + temp[i][3]),
    });
  }
  return result;
};
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
      "2023/11/20",
    ],
    [
      "T01",
      "Room G02, Haking Wong Building",
      "15:00:00",
      "16:30:00",
      "https://zoom.us/comp101-tutorial",
      "COMP101",
      "2023/11/20",
    ],
    [
      "L02",
      "Room 201, K.K. Leung Building",
      "11:00:00",
      "12:30:00",
      "https://zoom.us/math202-lecture",
      "MATH202",
      "2023/11/19",
    ],
    [
      "T02",
      "Room 202, Knowles Building",
      "17:00:00",
      "18:30:00",
      "https://zoom.us/math202-tutorial",
      "MATH202",
      "2023/11/20",
    ],
  ]);
  const [upComingClass, setUpComingClass] = useState({ success: false });

  useEffect(() => {
    fetchData(); // Call the function to fetch the data when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/class");
      const data = await response.json();
      setUpComingClass(data); // Set the fetched data to the component state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSendEmail = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/mail");
      const data = await response.json();
      if (data.success) {
        alert("Email sent successfully.");
      } else {
        throw new Error();
      }
    } catch {
      alert("Failed to send email.");
    }
  };

  return (
    <Template sidebar_index={0}>
      <div
        style={{
          marginBottom: "20px",
          color: "#1C6D7E",
          fontWeight: "500",
          fontSize: "28px",
        }}>
        Student Dashboard
      </div>
      <div>
        <div>
          {upComingClass.success && (
            <div>
              <div
                style={{
                  color: "#48A8BC",
                  fontWeight: "500",
                  fontSize: "24px",
                }}>
                {" "}
                Upcoming Class
              </div>
              <div
                style={{
                  backgroundColor: "#78C2D20D",
                  marginTop: "20px",
                  padding: "20px",
                  justifyContent: "space-between",
                  borderRadius: "16px",
                }}>
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "left",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#1C6D7E",
                    }}>
                    <div>{upComingClass.start_time.split(':').slice(0, 2).join(':')}</div>
                    <div
                      style={{
                        width: "1px",
                        height: "4px",
                        backgroundColor: "black",
                      }}></div>
                    <div>{upComingClass.end_time.split(':').slice(0, 2).join(':')}</div>

                  </div>
                  <div
                    style={{
                      width: "1px",
                      margin: "5px 15px 5px 15px",
                      backgroundColor: "#78C2D2",
                    }}></div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}>
                    <div
                      style={{
                        color: "#7EBCE6",
                      }}>
                      {upComingClass.course_code}
                    </div>
                    <a
                      href={upComingClass.course_link}
                      style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          color: "#2B7099",
                        }}>
                        {upComingClass.course_name}
                      </div>
                    </a>
                  </div>
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px",
                }}>
                  <Button
                  onClick={() => {
                    handleSendEmail();
                  }}>Send To Email</Button>
                </div>
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    marginTop: "20px",
                    color: "#78C2D2",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}>
                    <div
                      style={{
                        marginRight: "12px",
                        width: "80px",
                      }}>
                      Venue
                    </div>
                    <div
                      style={{
                        color: "#48A8BC",
                      }}>
                      {upComingClass.venue}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}>
                    <div
                      style={{
                        marginRight: "12px",
                        width: "80px",
                      }}>
                      Zoom
                    </div>
                    <div
                      style={{
                        color: "#48A8BC",
                        // make the link no underline
                        style: "none",
                        textDecoration: "none",
                      }}>
                      <a href={upComingClass.zoom_link}>
                        {upComingClass.zoom_link}
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "#78C2D240",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}></div>
                <div>
                  <div
                    style={{
                      color: "#78C2D2",
                    }}>
                    Teacher's Message
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#BCBCBC",
                    }}>
                    {upComingClass.latest_announcement}
                  </div>
                </div>
              </div>

            </div>
          )}

          <div
            style={{
              color: "#48A8BC",
              fontWeight: "500",
              fontSize: "24px",
              marginTop: "40px",
            }}>
            Class Timetable
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "20px",
            }}>
            <Button
              style={{
                marginRight: "20px",
              }}>
              Add Reminder
            </Button>
            <Button>Edit Reminder</Button>
          </div>
          {/* timetable */}
          <div
            style={{
              marginTop: "20px",
            }}
            className="timetable">
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
