import React, { useState, useEffect} from "react";

let Message = ({message}) => {
  return (
    <div className="message">
      <p>{message}</p>
    </div>
  );
};

export default Message