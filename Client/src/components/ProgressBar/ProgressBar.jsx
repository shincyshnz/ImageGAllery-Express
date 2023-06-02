import React from "react";
import "./progressBar.css";

export const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div
        className="filler"
        style={{ width: `${progress}%`, height: "12px" }}
      ></div>
    </div>
  );
};
