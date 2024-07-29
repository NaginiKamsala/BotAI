import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewConversationPage from "./pages/ChatPage";
import PastConversationPage from "./pages/PastConversations";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <NewConversationPage />,
      },
      {
        path: "/history",
        element: <PastConversationPage />,
      },
    ],
  },
]);

export const theme = createTheme({
  typography: {
    fontFamily: "Ubuntu",
  },
  palette: {
    primary: {
      main: "#9785BA",
      light: "#F9FAFA",
      dark: "#AF9FCD",
    },
    secondary: {
      main: "#D7C7F4",
      light: "#FFFFFF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
          textTransform: "none",
          backgroundColor: "#D7C7F4",
          "&:hover": {
            backgroundColor: "#AF9FCD",
          },
        },
        contained: {
          color: "#000000",
        },
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      h1: {
        fontSize: "32px",
        fontWeight: "700",
        lineHeight: "36.77px",
      },
      h2: {
        fontWeight: "400",
        fontSize: "28px",
        lineHeight: "32.17px",
      },
      h3: {
        fontSize: "24px",
        fontWeight: "400",
        lineHeight: "27.58px",
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        background: "#FAFBFE",
        borderRadius: "8px",
        color: "#D7C7F4",
        "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "#D7C7F4",
          },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        background: "#FFFFFF",
        borderRadius: "5px",
        color: "#D7C7F4",
        "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "#00000073",
          },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

theme.typography.h2 = {
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
  },
};

theme.typography.h1 = {
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
};

theme.typography.h3 = {
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes} />
    </ThemeProvider>
  </React.StrictMode>
);
