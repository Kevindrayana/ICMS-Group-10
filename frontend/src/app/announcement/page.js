"use client";

import { Template } from "src/components/template";
import { useEffect, useState } from "react";
import useSWR from "swr";

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
  10: "October",
  11: "November",
  12: "December",
};


export default function Course() {
  const uid = sessionStorage.getItem("uid");

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    `http://127.0.0.1:5000/messages?uid=${uid}`,
    fetcher
  );

  const [message, setMessage] = useState(data);

  const searchMessage = (keyword) => {
    // fetch the message from backend
    const uid = sessionStorage.getItem("uid");

    fetch(`http://127.0.0.1:5000/search-messages?uid=${uid}&keyword=${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        // // filter the data
        // let temp = data.filter((item) => {
        //   return (
        //     item.content.toLowerCase().includes(keyword.toLowerCase()) ||
        //     item.course.toLowerCase().includes(keyword.toLowerCase()) ||
        //     item.instructor.toLowerCase().includes(keyword.toLowerCase())
        //   );
        // });
        setMessage(data);
      });
  };

  useEffect(() => {
    setMessage(data);
  }, [data]);

  const getMonthArray = (message = []) => {
    let result = [];
    let temp = message;
    for (let i = 0; i < temp.length; i++) {
      // check if the same no need
      let d = new Date(temp[i].time);
      let m = d.getMonth() + 1;
      if (result.includes(m)) {
        continue;
      }
      result.push(m);
    }
    return result;
  };

  const getMonth = (datetime) => {
    let d = new Date(datetime);
    let m = d.getMonth() + 1;
    return m;
  };

  return (
    <Template sidebar_index={2}>
      <div
        style={{
          marginBottom: "30px",
          color: "#1C6D7E",
          fontWeight: "500",
          fontSize: "28px",
        }}>
        Message Board
      </div>
      {/* create an input box for searching message */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}>
        <input
          style={{
            width: "500px",
            height: "40px",
            borderRadius: "5px",
            border: "1px solid #E9E9E9",
            paddingLeft: "10px",
          }}
          placeholder="Search"
          onChange={(e) => searchMessage(e.target.value)}
        />
      </div>

      {getMonthArray(message).map((m, i) => (
        <>
          <div
            style={{
              fontSize: "20px",
              color: "#7EBCE6",
              marginBottom: "20px",
              fontWeight: "600",
              marginTop: "20px",
            }}>
            {data_month[m]}
          </div>
          {message?.map((item, index) => (
            <>
              {getMonth(message[i].time) === m && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    paddingBottom: "10px",
                    borderBottom:
                      index === message.length - 1 ? "none" : "1px solid #E9E9E9",
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
                        width: "300px",
                        color: "#76989F",
                        fontWeight: "500",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}>
                      <div
                        style={{
                          marginRight: "15px",
                        }}>
                        {" "}
                        {item.instructor}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#D9D9D9",
                        }}>
                        {item.time.split(" ")[4]}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#BCBCBC",
                      }}>
                      {item.time.split(" ").slice(0, 4).join(" ")}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "17px",
                      color: "#78C2D2",
                      fontWeight: "500",
                    }}>
                    {item.course}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#5E7380",
                      marginTop: "10px",
                      fontWeight: "500",
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
