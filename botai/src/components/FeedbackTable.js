import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const FeedbackTable = ({ feedbacks }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Conversation</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Feedback</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedbacks.map((feedback, index) => (
            <TableRow key={index}>
              <TableCell>{feedback.conversation}</TableCell>
              <TableCell>{feedback.rating}</TableCell>
              <TableCell>{feedback.feedback}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FeedbackTable;
