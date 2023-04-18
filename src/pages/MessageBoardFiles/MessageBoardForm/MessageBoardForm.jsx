import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@mui/material";

function MessageBoardForm({ parent_id, setReplyId }) {
  const { circle_id } = useParams();
  console.log("circle_id", circle_id);
  // getting user from store
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [message, setMessage] = useState({
    circle_id,
    parent_id,
    message: "",
  });

  const handleSubmitComment = (e) => {
    e.preventDefault();
    dispatch({
      type: "POST_MESSAGE",
      payload: message,
    });
    clearInput();
  };

  // clearing text input field
  const clearInput = () => {
    // spreading message object to preserve ids, clearing message input value
    setMessage({ ...message, message: "" });
  };

  return (
    <>
      <div className="messages-container">
        <form onSubmit={handleSubmitComment}>
          <input
            type="text"
            value={message.message}
            onChange={(e) =>
              setMessage({ ...message, message: e.target.value })
            }
            placeholder={parent_id ? "Reply" : "New Thread"}
            style={{ width: "40%", marginLeft: "5rem", marginRight: "0rem" }}
          />
          <Button type="submit">
            <FontAwesomeIcon icon={faReply} />
            {parent_id ? " Reply" : " Post New Thread"}
          </Button>
          {/* Conditionally rendering cancel button if parent id exists */}
          {parent_id ? (
            <Button onClick={() => setReplyId(-1)}> Cancel</Button>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
}

export default MessageBoardForm;
