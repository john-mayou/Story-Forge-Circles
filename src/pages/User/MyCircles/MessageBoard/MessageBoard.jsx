import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function MessageBoard() {
  return (
    <>
      <h3>Message Board</h3>
      <div align="center">
        <label htmlFor="message-board-search">Search the Message Board:</label>
        <input
          type="search"
          id="message-board-search"
          name="message-board-input"
        />
        <button>Search</button>
        <button>+Thread</button>
        <button>Dashboard</button>
        <p>Comments</p>
      </div>
    </>
  );
}

export default MessageBoard;
