import React from "react";
import Rating from "@mui/material/Rating";
import { useLocation } from "react-router-dom";

const SubmitFeedback = ({ value, handleValue }) => {
  const location = useLocation();
  return (
    <Rating
      value={value}
      readOnly={location.pathname === "/history"}
      onChange={(event, newValue) => {
        handleValue(newValue);
      }}
    />
  );
};

export default SubmitFeedback;
