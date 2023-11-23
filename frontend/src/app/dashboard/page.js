"use client";
import { Template } from "src/components/template";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import {CircularProgress} from "@mui/material";
import useSWR from "swr";
import {
  Scheduler,
  AgendaView,
  TimelineView,
  DayView,
  WeekView,
  MonthView,
} from "@progress/kendo-react-scheduler";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const tbFetcher = (...args) => fetch(...args).then((res) => res.json());
const currentYear = new Date().getFullYear();
const parseAdjust = (eventDate) => {
  const date = new Date(eventDate);
  date.setFullYear(currentYear);
  return date;
};
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const displayDate = new Date(Date.now());
const converter = (baseData) => {
  const temp = baseData.map((dataItem) => ({
    id: 1,
    start: parseAdjust(dataItem.Start),
    startTimezone: null,
    end: parseAdjust(dataItem.End),
    endTimezone: null,
    isAllDay: false,
    title: dataItem.Title,
    description: "",
    recurrenceRule: "FREQ=WEEKLY",
    recurrenceId: null,
    recurrenceExceptions: null,
    roomId: "MWT",
    ownerID: null,
    personId: null,
  }));
  return temp;
};

import "@progress/kendo-theme-default/dist/all.css";
export default function Dashboard() {
  const [uid, setUid] = useState("");
  const [baseData, setBaseData] = useState([]);
  const [schedule, setSchedule] = useState(converter(baseData));
  const [isEmailLoading, setIsEmailLoading] = useState(false);
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

  // useEffect(() => {
  //   // Perform localStorage action
  //   setUid(sessionStorage.getItem("uid"));
  // }, []);

  // const { data: data, error: error } = useSWR(
  //   `http://127.0.0.1:5000/upcoming-class?uid=${uid}`,
  //   fetcher
  // );

  // const { data: tbData, error: tbError } = useSWR(
  //   `http://127.0.0.1:5000/timetable?uid=${uid}`,
  //   tbFetcher
  // );
  const [data, setData] = useState(null);
  const [tbData, setTbData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setUid(sessionStorage.getItem("uid"));
    dataFetcher();
  }, []);

  const dataFetcher = async () => {
    try {
      if(data!=null) return;
      setIsLoading(true);
      const response = await fetch(
        `http://127.0.0.1:5000/upcoming-class?uid=${sessionStorage.getItem(
          "uid"
        )}`
      );
      const datas = await response.json();
      setIsLoading(false);
      setData(datas);

    } catch (error) {
      setData([]);
    }
  };
  useEffect(() => {
    if (data!=null && schedule!=null &&!isLoading) {
      fetch(
        `http://127.0.0.1:5000/timetable?uid=${sessionStorage.getItem("uid")}`
      )
        .then((response) => response.json())
        .then((data) => {
          setTbData(data);
          const temp = formatter(data);
          setSchedule(converter(temp));
        });
    }
  }, [data]);
  const formatter = (data) => {
    let tempBaseData = [];
    data.forEach((item) => {
      const temp = {
        Title: item[5] + " " + item[0],
        Start: item[2],
        End: item[3],
      };
      tempBaseData.push(temp);
    });
    // print tempBaseData
    setBaseData(tempBaseData);
    setSchedule(converter(tempBaseData));
    return tempBaseData;
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
            {data?.success ? (
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
                        <div>
                          {data.start_time.split(":").slice(0, 2).join(":")}
                        </div>
                        <div
                          style={{
                            width: "1px",
                            height: "4px",
                            backgroundColor: "black",
                          }}></div>
                        <div>
                          {data.end_time.split(":").slice(0, 2).join(":")}
                        </div>
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
                          {data.course_code}
                        </div>
                        <a
                          href={data.course_link}
                          style={{ textDecoration: "none" }}>
                          <div
                            style={{
                              color: "#2B7099",
                            }}>
                            {data.course_name}
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
                        {data.venue}
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
                        <a href={data.zoom_link}>{data.zoom_link}</a>
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
                      {data.latest_announcement}
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
          {/* timetable */}
          {/* <div
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
          </div> */}
          <div className="timetable">
            <Scheduler
              data={schedule}
              defaultDate={displayDate}
              defaultView="week">
              {/* <AgendaView /> */}
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
