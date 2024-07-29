import React from "react";
import { Box, Typography } from "@mui/material";
import AIImage from "../assets/logo.png";
import Cards from "./Cards";

const InitialQuestions = [
  {
    question: "Hi, what is the weather",
    response: "Get immediate AI generated response",
  },
  {
    question: "Hi, what is my location",
    response: "Get immediate AI generated response",
  },
  {
    question: "Hi, what is the temperature",
    response: "Get immediate AI generated response",
  },
  {
    question: "Hi, how are you",
    response: "Get immediate AI generated response",
  },
];

const Chat = ({ handleChats, chats }) => {
  return (
    <Box
      height={600}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-end"
      gap={5}
      p={2}
    >
      <Typography variant="h2" component="h2" fontFamily="Ubuntu">
        How Can I Help You Today?
      </Typography>
      <img src={AIImage} alt="ai logo" width={65.3} height={65.3} />
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
        {InitialQuestions.map((item, idx) => {
          const data = {
            question: item["question"],
            response: item["response"],
          };
          return (
            <Cards
              data={data}
              key={idx}
              handleChats={() => handleChats(data)}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Chat;
