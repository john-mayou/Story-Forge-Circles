import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MessageBoardForm from "../MessageBoardForm/MessageBoardForm";

function MessageBoard({ commentsList, comment }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [comments, setComments] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [newComment, setNewComment] = useState({ body: { commentBody } });
  const [expand, setExpand] = useState(false);
  const [showMessageBoardForm, setShowMessageBoardForm] = useState(false);
  

  // fetch all comments on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_COMMENTS",
    });
  }, []);

  // const onComment = () => {
    // send input value to saga
  //   dispatch({
  //     type: "POST_COMMENT",
  //     payload: input,
  //   });
  //   newComment
  // };

  // setComments((prev) => [newComment, ...prev]);

  const handleAddThreadClick = () => {
    setExpand(!expand);
    setShowMessageBoardForm(true);
  };

  const goToDashboard = () => {
    history.push('/circle-dashboard/:circle_id"')
  };
  
  return (
    <>
      <h3 align="center">Message Board</h3>
      <div align="center">
        {/* Search bar for message board */}
        <label htmlFor="message-board-search">Search the Message Board:</label>
        <input
          type="search"
          id="message-board-search"
          name="message-board-input"
        />
        <button>Search</button>
        <div>
        <button onClick={handleAddThreadClick}>+Thread</button>
          <button onClick={goToDashboard}>Dashboard</button>
          <MessageBoardForm/>
        </div>
        </div>
    </>
  );
}

export default MessageBoard;
