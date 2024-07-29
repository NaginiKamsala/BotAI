import { Stack } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ChatWindow = ({ value, handleValue, setAsk, chats }) => {
  const handleInput = (newValue) => {
    handleValue(newValue);
  };

  const handleSave = () => {
    localStorage.setItem("prevChats", JSON.stringify(chats));
    handleInput("");
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      gap={2}
    >
      <TextField
        id="outlined-basic"
        label="Let's chat"
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => handleInput(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => {
          setAsk(true);
          handleInput("");
        }}
      >
        Ask
      </Button>
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
    </Stack>
  );
};

export default ChatWindow;
