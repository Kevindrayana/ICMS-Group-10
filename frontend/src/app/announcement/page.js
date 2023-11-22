"use client";

import { Template } from "src/components/template";
import { useState } from "react";
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
  //   const uid = sessionStorage.getItem("uid");
  const uid = "3035000001";

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    `http://127.0.0.1:5000/messages?uid=${uid}`,
    fetcher
  );

  const getMonthArray = (data = []) => {
    let result = [];
    let temp = data;
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
      {getMonthArray(data).map((m, i) => (
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
          {data?.map((item, index) => (
            <>
              {getMonth(data[i].time) === m && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    paddingBottom: "10px",
                    borderBottom:
                      index === data.length - 1 ? "none" : "1px solid #E9E9E9",
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
