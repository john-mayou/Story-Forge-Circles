import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function MessageBoardForm({ parent_id }) {
  const { circle_id } = useParams();
  console.log("circle_id", circle_id);
  // getting user from store
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [message, setMessage] = useState({
    circle_id,
    parent_id,
    message: '',
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
    setMessage({ ...message, message: '' });
  };

  return (
    <>
      <div className="messages-container" align="center">
        <form onSubmit={handleSubmitComment}>
          <input
            type="text"
            value={message.message}
            onChange={(e) => setMessage({ ...message, message: e.target.value })}
            placeholder="Add Comment"
            style={{ width: "80%", marginLeft: "5rem", marginRight: "0rem" }}
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </>
  );
}

export default MessageBoardForm;
