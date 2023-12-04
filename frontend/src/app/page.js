"use client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import Container from "@mui/material/Container";
import { useState } from "react";
export default function SignIn() {
  const [isLoadingFace, setisLoadingFace] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [uid, setUid] = useState("");

  const handleSubmit = async (event) => {
    setisLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.get("uid"),
          password: data.get("password"),
        }),
      });

      const res = await response.json();

      if (res == null) {
        throw new Error("Login failed");
      }

      sessionStorage.setItem("uid", res["uid"]);
      sessionStorage.setItem("name", res["name"]);
      sessionStorage.setItem("year", res["year"]);
      sessionStorage.setItem("program", res["program"]);
      sessionStorage.setItem("latest-login", res["latest-login"]);
      setisLoading(false);
      setLoginFailed(false);
      window.location.href = "/dashboard";
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
      const response = await fetch(
        "http://127.0.0.1:5000/face-recognition"
      );
      const res = await response.json();

      if (res == null) {
        throw new Error("Login failed");
      }

      sessionStorage.setItem("uid", res["uid"]);
      sessionStorage.setItem("name", res["name"]);
      sessionStorage.setItem("year", res["year"]);
      sessionStorage.setItem("program", res["program"]);
      sessionStorage.setItem("latest-login", res["latest-login"]);
      setisLoading(false);
      setLoginFailed(false);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      setisLoading(false);
      setLoginFailed(true);
      alert("An error occurred.");
    }
    setisLoadingFace(false);
  };

  return (
    <div
      style={{
        height: "100vh",
      }}
      className="home-bg">
      <div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <Container
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        maxWidth="sm">
        <Box
          sx={{
            boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.1)",
            borderRadius: 2,
            padding: "40px",
            marginTop: 8,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}>
          <img src="image/logo.png" alt="logo" width="350" height="70" />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 4 }}>
            {/* login failed */}
            {loginFailed && (
              <Typography
                sx={{
                  color: "#ff0000",
                  fontSize: "14px",
                  marginTop: "10px",
                }}>
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
                fullWidth>
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
                }}>
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
              fullWidth>
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
              fullWidth>
              Login Via Face Recognition
            </Button>
          )}
        </Box>
      </Container>
    </div>
  );
}
