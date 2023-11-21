"use client";

import { Template } from "src/components/template";
import { Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Course() {
  let uid = sessionStorage.getItem("uid");

  const { data, error } = useSWR(
    `http://127.0.0.1:5000/courses?uid=${uid}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Template sidebar_index={1}>
      <div
        style={{
          marginBottom: "20px",
          color: "#1C6D7E",
          fontWeight: "500",
          fontSize: "28px",
        }}>
        Courses
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}>
        {data.map((course) => (
          <Box
            sx={{
              boxShadow: 1,
              borderRadius: 2,
              padding: "20px",
              height: "336px",
              width: "344px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              margin: "10px",
              alignItems: "left",
            }}>
            <div>
              <img
                src={course.course_image}
                alt="logo"
                width="304px"
                height="160px"
              />
              <div
                style={{
                  color: "#1C6D7E",
                  fontWeight: "500",
                  fontSize: "16px",
                }}>
                {course.course_code}
              </div>
            </div>
            <div
              style={{
                color: "#78C2D2",
                fontWeight: "500",
                fontSize: "14px",
              }}>
              {course.course_name}
            </div>
            <div>
              <Button
                onClick={() => {
                  window.open(course.course_link, "_blank");
                }}>
                View Course
              </Button>
            </div>
          </Box>
        ))}
      </div>
    </Template>
  );
}
