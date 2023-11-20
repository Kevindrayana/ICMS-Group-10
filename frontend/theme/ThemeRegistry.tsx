"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import React from "react";


const theme = createTheme({
    palette: {
        primary: {
            main: "#78C2D2",
        },
        secondary: {
            main: "#19857b",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                    backgroundColor: '#78C2D2',
                    borderRadius: "8px",
                    paddingTop: "8px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingBottom: "8px",
                    fontSize: "16px !important",
                    fontWeight: 500,
                    textTransform: "inherit",
                    border: "2px solid transparent",

                    '&:hover': {
                        backgroundColor: "#FFFFFF",
                        border: "2px solid #48A8BC",
                        color: "#48A8BC"
                    },
                },
            },
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