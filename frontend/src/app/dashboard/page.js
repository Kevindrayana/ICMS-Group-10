"use client";
import { Template } from "src/components/template";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import {
  Scheduler,
  AgendaView,
  TimelineView,
  DayView,
  WeekView,
  MonthView,
} from "@progress/kendo-react-scheduler";
import "@progress/kendo-theme-default/dist/all.css";

const currentYear = new Date().getFullYear();
const now = new Date(Date.now());

const parseAdjust = (eventDate) => {
  const date = new Date(eventDate);
  date.setFullYear(currentYear);
  return date;
};

const schedulerConverter = (data) =>
  data.map((item, id) => ({
    id: id,
    start: parseAdjust(item["start_time"]),
    startTimezone: null,
    end: parseAdjust(item["end_time"]),
    endTimezone: null,
    isAllDay: false,
    title: item["course_code"] + " " + item["lesson_id"],
    description: "",
    recurrenceRule: "FREQ=WEEKLY",
    recurrenceId: null,
    recurrenceExceptions: null,
    roomId: item["classroom_address"],
    ownerID: null,
    personId: null,
  }));


export default function Dashboard() {
  const [uid, setUid] = useState("");
  const [schedule, setSchedule] = useState(schedulerConverter([]));
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [upcomingClass, setUpcomingClass] = useState(null);

  useEffect(() => {
    setUid(sessionStorage.getItem("uid"));
    getUpcomingClassAndTimetable();
  }, []);

  const getUpcomingClassAndTimetable = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/upcoming-class?uid=${sessionStorage.getItem(
          "uid"
        )}`
      );
      const res = await response.json();
      setUpcomingClass(res);

      const response2 = await fetch(
        `http://127.0.0.1:5000/timetable?uid=${sessionStorage.getItem("uid")}`
      );
      const data = await response2.json();
      setSchedule(schedulerConverter(data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendEmail = async () => {
    setIsEmailLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/mail?uid=${uid}`);
      const email = await response.json();
      if (email.success) {
        alert("Email sent successfully.");
      } else {
        throw new Error();
      }
      setIsEmailLoading(false);
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
          <div
            style={{
              color: "#48A8BC",
              fontWeight: "500",
              fontSize: "24px",
            }}>
            {" "}
            Upcoming Class
          </div>
          <div>
            {upcomingClass?.success ? (
              <>
                <div
                  style={{
                    backgroundColor: "#78C2D20D",
                    marginTop: "20px",
                    padding: "20px",
                    justifyContent: "space-between",
                    borderRadius: "16px",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
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
                        <div>{upcomingClass.start_time.slice(11, 16)}</div>
                        <div
                          style={{
                            width: "1px",
                            height: "4px",
                            backgroundColor: "black",
                          }}></div>
                        <div>{upcomingClass.end_time.slice(11, 16)}</div>
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
                          {upcomingClass.course_code}
                        </div>
                        <a
                          href={upcomingClass.course_link}
                          style={{ textDecoration: "none" }}>
                          <div
                            style={{
                              color: "#2B7099",
                            }}>
                            {upcomingClass.course_name}
                          </div>
                        </a>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: "auto",
                      }}>
                      {isEmailLoading ? (
                        <Button>
                          <CircularProgress
                            style={{
                              color: "#ffffff",
                              height: "28px",
                              width: "28px",
                            }}
                          />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            handleSendEmail();
                          }}>
                          Send to Email
                        </Button>
                      )}
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
                        {upcomingClass.venue}
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
                        <a href={upcomingClass.zoom_link}>
                          {upcomingClass.zoom_link}
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
                      {upcomingClass.latest_announcement}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div
                style={{
                  padding: "20px",
                  marginTop: "20px",
                  backgroundColor: "#78C2D20D",
                  borderRadius: "8px",
                  color: "#7EBCE6",
                  fontWeight: "500",
                }}>
                You don’t have any upcoming class at the moment
              </div>
            )}
          </div>
          <div
            style={{
              color: "#48A8BC",
              fontWeight: "500",
              fontSize: "24px",
              marginTop: "40px",
              marginBottom: "20px",
            }}>
            Class Timetable
          </div>
          <div className="timetable">
            <Scheduler data={schedule} defaultDate={now} defaultView="week">
              <DayView />
              <WeekView />
              <MonthView />
            </Scheduler>
          </div>
        </div>
      </div>
    </Template>
  );
}
