import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import { Container, Grid, Stack, Box, Typography } from "@mui/material";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [userAsked, setUserAsked] = useState("");
  const [chats, setChats] = useState([]);
  const [isAsk, setAsk] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState("");

  return (
    <Grid container>
      <Grid item xs={3}>
        <Navbar />
      </Grid>

      <Grid item xs={12} md={9}>
        <Container maxWidth="xl" position="relative">
          <Stack direction="column" justifyContent="space-between">
            <Box position="fixed" ml={10} width="100%">
              <Typography fontSize="28px" fontWeight="700" color="primary.main">
                Bot AI
              </Typography>
            </Box>
            <Box mt={5} mb={30}>
              <Outlet
                context={[
                  userAsked,
                  isAsk,
                  setAsk,
                  chats,
                  setChats,
                  selectedRatings,
                  setSelectedRatings,
                ]}
              />
            </Box>
            <Box
              style={{
                position: "fixed",
                bottom: "0",
                padding: "1rem auto",
                backgroundColor: "#FFFFFF",
                zIndex: 999,
              }}
              width={{ xs: "95%", md: "72%" }}
            >
              <ChatWindow
                value={userAsked}
                handleValue={setUserAsked}
                setAsk={setAsk}
                chats={chats}
              />
            </Box>
          </Stack>
        </Container>
      </Grid>
    </Grid>
  );
}

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          background: {
            default: "#FFFFFF",
          },
          text: {
            primary: "#AF9FCD",
          },
        }
      : {
          // palette values for dark mode
          background: {
            default: "#3C3C3C",
          },
          text: {
            primary: "linear-gradient(180deg, #FFFFFF 0%, #9785BA 100%)",
          },
        }),
  },
});

export default App;
