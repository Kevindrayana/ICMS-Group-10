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
import { useRouter } from 'next/navigation'
import axios from "axios";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      uid: data.get("uid"),
      password: data.get("password"),
    });
    router.push('/dashboard')

  };
  const handleFaceRecognition = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:5000/start-face-recognition');
      if (response.data.signin) {
        router.push('/dashboard');
      } else {
        alert('Face recognition failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while trying to login via face recognition.');
    }
    // setIsLoading(false);
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
          >
            Sign In
          </Button>
        </Box>
        <Button
          onClick={()=> {
            handleFaceRecognition()
          }}
          sx={{
            mt: 2,
          }}
          disabled={isLoading}
          fullWidth
          >Login Via Face Recognition</Button>
      </Box>
    </Container>
  );
}