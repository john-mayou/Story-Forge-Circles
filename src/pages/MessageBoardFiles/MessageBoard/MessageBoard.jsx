import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MessageBoardForm from "../MessageBoardForm/MessageBoardForm";

function MessageBoard({ commentsList, comment }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [expand, setExpand] = useState(false);

  // fetch all comments on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_COMMENTS",
    });
  }, []);


  const handleAddThreadClick = () => {
    setExpand(!expand);
  };

  const goToDashboard = () => {
    history.push(`/circle-dashboard/${circle_id}`);
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
          <div className="flex flex-col gap-4 mt-10">
          <ul>
            {commentsList?.map((comment) => (
              <li key={comment.id} className="border-[1px] border-zinc-500 rounded-md">
                <div>
                  {JSON.stringify(comment)}
                  {/* <MessageBoardForm comment={comment} />  */}
                </div>
              </li>
          ))}
            </ul>
            <MessageBoardForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageBoard;
