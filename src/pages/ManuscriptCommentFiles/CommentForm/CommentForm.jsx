import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// font-awesome / mui
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { TextField, Button } from "@mui/material";

function CommentForm({
  manuscript_id,
  parent_id,
  setReplyId,
  handleAddThreadClick,
}) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({
    manuscript_id,
    parent_id,
    comment: "",
  });

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.comment === "") {
      return;
    }
    dispatch({
      type: "POST_COMMENT",
      payload: comment,
    });
    clearInput();
    setReplyId(-1);
  };

  // clearing text input field
  const clearInput = () => {
    // spreading comment object to preserve ids, clearing comment input value
    setComment({ ...comment, comment: "" });
  };

  return (
    <>
      <div className="comments-container">
        <form onSubmit={handleSubmitComment}>
          <TextField
            onClick={() => {
              setComment({ ...comment, comment: `Wow that was great work! I appreciate your style! Please, don't hesitate to take the user on a journey! Don’t be afraid to be more descriptive!`});
            }}
            type="text"
            value={comment.comment}
            onChange={(e) =>
              setComment({ ...comment, comment: e.target.value })
            }
            placeholder={parent_id ? "Reply" : "New Feedback"}
            style={{ width: "40%", marginLeft: "5rem", marginRight: "0rem" }}
          />
          <Button type="submit">
            <FontAwesomeIcon icon={faReply} />
            {parent_id ? " Reply" : " Post"}
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

export default CommentForm;
