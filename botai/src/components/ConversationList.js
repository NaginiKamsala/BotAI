import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const ConversationList = ({ conversations, onSelect }) => {
  return (
    <List>
      {conversations.map((conv, index) => (
        <ListItem button key={index} onClick={() => onSelect(index)}>
          <ListItemText primary={`Conversation ${index + 1}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default ConversationList;
