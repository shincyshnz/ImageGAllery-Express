import React from "react";
import "./modal.css";

export const Modal = ({ handleClick, modalImagePath }) => {
  return (
    <>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleClick}>
            &times;
          </span>
          <img src={modalImagePath} />
        </div>
      </div>
    </>
  );
};
