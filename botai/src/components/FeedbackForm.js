import React, { useState } from "react";
import { Button, TextField, Box, Rating } from "@mui/material";

const FeedbackForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onSubmit({ rating, feedback });
    setRating(0);
    setFeedback("");
  };

  return (
    <Box>
      <Rating
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
      />
      <TextField
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write your feedback"
        multiline
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

export default FeedbackForm;
