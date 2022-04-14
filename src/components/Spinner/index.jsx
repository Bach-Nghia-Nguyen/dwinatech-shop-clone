import React from "react";
import { CircularProgress } from "@mui/material";
import "./style.css";

const Spinner = () => {
  return (
    <div className="spinner">
      <CircularProgress />
    </div>
  );
};

export default Spinner;
