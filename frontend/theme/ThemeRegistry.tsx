"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import React from "react";

const theme = createTheme({
    palette: {
        primary: {
        main: "#556cd6",
        },
        secondary: {
        main: "#19857b",
        },
    },
    });

export default function ThemeRegistry(props) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    );
}