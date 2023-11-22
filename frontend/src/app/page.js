"use client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState } from "react";
export default function SignIn() {
  const [isLoadingFace, setisLoadingFace] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [uid, setUid] = useState("");
  const handleSubmit = (event) => {
    setisLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      axios
        .post("http://127.0.0.1:5000/login", {
          username: data.get("uid"),
          password: data.get("password"),
        })
        .then((res) => {
          if (res.data != null) {
            sessionStorage.setItem("uid", uid);
            sessionStorage.setItem("name", res.data[1]);
            sessionStorage.setItem("year", res.data[2]);
            sessionStorage.setItem("program", res.data[3]);
            sessionStorage.setItem("latest-login", res.data[4]);
            setisLoading(false);
            setLoginFailed(false);
            window.location.href = "/dashboard";
          } else {
            setisLoading(false);
            setLoginFailed(true);
            setUid("");
          }
        });
    } catch (error) {
      console.error(error);
      setisLoading(false);
      setLoginFailed(true);
      alert("An error occurred.");
    }
  };
  const handleFaceRecognition = async () => {
    setisLoadingFace(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/start-face-recognition"
      );
      if (res.data) {
        sessionStorage.setItem("uid", res.data[0]);
        sessionStorage.setItem("name", res.data[1]);
        sessionStorage.setItem("year", res.data[2]);
        sessionStorage.setItem("program", res.data[3]);
        sessionStorage.setItem("latest-login", res.data[4]);
        setisLoadingFace(false);
        setLoginFailed(false);
        window.location.href = "/dashboard";
      } else {
        setisLoadingFace(false);
        setLoginFailed(true);
        alert("Face recognition failed. Please try again.");
      }
    } catch (error) {
      setLoginFailed(true);
      console.error(error);
      alert("An error occurred while trying to login via face recognition.");
    }
    setisLoadingFace(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          padding: "40px",
          marginTop: 8,
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src="image/logo.png" alt="logo" width="350" height="70" />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* login failed */}
          {loginFailed && (
            <Typography
              sx={{
                color: "#ff0000",
                fontSize: "14px",
                marginTop: "10px",
              }}
            >
              Login failed. Please try again.
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="uid"
            label="University ID"
            name="uid"
            autoComplete="uid"
            autoFocus
            value={uid}
            onChange={(e) => {
              setUid(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {isLoading ? (
            <Button
              sx={{
                mt: 2,
              }}
              disabled
              fullWidth
            >
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
              type="submit"
              fullWidth
              style={{
                marginTop: "20px",
              }}
            >
              Login
            </Button>
          )}
        </Box>
        {isLoadingFace ? (
          <Button
            sx={{
              mt: 2,
            }}
            disabled
            fullWidth
          >
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
              handleFaceRecognition();
            }}
            sx={{
              mt: 2,
            }}
            disabled={isLoadingFace}
            fullWidth
          >
            Login Via Face Recognition
          </Button>
        )}
      </Box>
    </Container>
  );
}
