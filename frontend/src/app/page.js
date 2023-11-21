"use client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState } from "react";
export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [uid, setUid] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      axios
        .post("http://127.0.0.1:5000/login", {
          username: data.get("uid"),
          password: data.get("password"),
        })
        .then((res) => {
          if (res.data!= null) {
            sessionStorage.setItem("uid", uid);
            sessionStorage.setItem("latest-login", res.data[2]);
            window.location.href = "/dashboard";
          } else {
            setUid("");
          }
        });
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
    // console.log({
    //   uid: data.get("uid"),
    //   password: data.get("password"),
    // });
  };
  const handleFaceRecognition = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/start-face-recognition"
      );
      if (response.data.signin) {
        window.location.href = "/dashboard";
      } else {
        alert("Face recognition failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while trying to login via face recognition.");
    }
    // setIsLoading(false);
  };

  const handleLatestLogin = async () => {
    fetch(`http://http://127.0.0.1:5000/latest-login?uid=${data.get("uid")}`)
      .then((response) => {
        setLoginHistory([
          response.data.login_time.slice(0, 10),
          response.data.login_time.slice(11),
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
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
        }}>
        <img src="image/logo.png" alt="logo" width="350" height="70" />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <Button
            type="submit"
            fullWidth
            style={{
              marginTop: "20px",
            }}
            onClick={() => {
              handleLatestLogin();
            }}>
            Sign In
          </Button>
        </Box>
        <Button
          onClick={() => {
            handleFaceRecognition();
          }}
          sx={{
            mt: 2,
          }}
          disabled={isLoading}
          fullWidth>
          Login Via Face Recognition
        </Button>
      </Box>
    </Container>
  );
}
