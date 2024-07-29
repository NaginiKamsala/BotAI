import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const RatingsMenu = ({ value, handleValue }) => {
  const handleChange = (event) => {
    handleValue(event.target.value);
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      fullWidth
      label="Select on ratings based"
      placeholder="Select on ratings based"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={1}>1 Rating</MenuItem>
      <MenuItem value={2}>2 Ratings</MenuItem>
      <MenuItem value={3}>3 Ratings</MenuItem>
      <MenuItem value={4}>4 Ratings</MenuItem>
      <MenuItem value={5}>5 Ratings</MenuItem>
    </Select>
  );
};

export default RatingsMenu;
