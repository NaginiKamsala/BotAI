import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Cards from "../components/Cards";
import { Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import RatingsMenu from "../components/RatingsMenu";

const PastConversationPage = () => {
  const [
    userAsked,
    isAsk,
    setAsk,
    chats,
    setChats,
    selectedRatings,
    setSelectedRatings,
  ] = useOutletContext();

  const [filteredChats, setFilteredChats] = useState(
    JSON.parse(localStorage.getItem("prevChats")) || []
  );

  const chatsArr = JSON.parse(localStorage.getItem("prevChats"));

  const formatDate = (dateInput) => {
    if (dateInput.getDate() === new Date().getDate()) {
      return "Today's";
    } else if (new Date().getDate() - dateInput.getDate() === 1) {
      return "Yesterday's";
    }
    return dateInput.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleFilteredChats = (value) => {
    setSelectedRatings(value);
    const filterdChatsArr = chatsArr.reduce((acc, item) => {
      const filteredChatsList = item["chatsList"].filter(
        (singleChat) => singleChat["aiResponse"]["ratings"] === value
      );

      return [...acc, { ...item, chatsList: filteredChatsList }];
    }, []);
    setFilteredChats(filterdChatsArr);
  };

  return (
    <Stack direction="column" spacing={5}>
      <Box display="flex" justifyContent="center">
        <Typography
          variant="h3"
          component="h3"
          style={{
            fontFamily: "Ubuntu",
            lineHeight: "32.17px",
          }}
        >
          Conversation History
        </Typography>
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <RatingsMenu
          value={selectedRatings}
          handleValue={(value) => handleFilteredChats(value)}
        />
      </Box>
      <Stack direction="column">
        {filteredChats.map((item, idx) => {
          const { datetime, chatsList } = item;
          return (
            <Stack direction="column" spacing={2}>
              <Typography>{formatDate(new Date(datetime))} chats</Typography>
              <Stack direction="column" spacing={2}>
                {chatsList.map((item) => {
                  return (
                    <Stack
                      p={1}
                      style={{
                        background:
                          "linear-gradient(90deg, #BFACE2 0%, #D7C7F4 100%)",
                        borderRadius: "20px",
                      }}
                    >
                      <Cards data={item} curUser="human" />
                      <Cards
                        data={item}
                        curUser="ai"
                        star_ratings={item["aiResponse"]["ratings"]}
                      />
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default PastConversationPage;
