import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function MessageBoardForm() {
  const { circle_id } = useParams();
  console.log("circle_id", circle_id);
  const dispatch = useDispatch();
  const history = useHistory();
  const [comments, setComments] = useState('');
  const [newComment, setNewComment] = useState('');
  const [commentBody, setCommentBody]  = useState({
    // created_at: "",
    // manuscript_id: "",
    // circle_id: "",
    // user_id: "",
    // parent_id: "",
    comment: "",
  });

  const handleSubmitComment = (e) => {
    e.preventDefault();
    dispatch({
      type: "POST_COMMENT",
      payload: {message : commentBody.comment, circle_id }
    });
    clearInput();
  };

  const clearInput = () => {
    setCommentBody({
      created_at: "",
      manuscript_id: "",
      circle_id: "",
      user_id: "",
      parent_id: "",
      comment: "",
    });
  };

  const handleChange = (e, key) => {
    setInput({ ...input, [key]: e.target.value });
  };

  return (
    <>
      <h2 align="center">Message Board Form</h2>
      <div className="comments-container" align="center">
        <form onSubmit={handleSubmitComment}>
        <input
          type="text"
          value={commentBody.comment}
            onChange={(e) => setCommentBody({ comment: e.target.value })}
          placeholder="add comment"
          style={{ width: "80%", marginRight: "1rem"}}
        />
        <button type="submit"
        >Add Comment
        </button>
        <div className="flex flex-col gap-4 mt-10">
          {/* <ul>
            {commentsList.map((comment) => (
              <li key={comment.id} className="border-[1px] border-zinc-500 rounded-md">
                <div>
                  {comment.body}
                </div>
              </li>
          ))}
            </ul> */}
          </div>
          </form>
        </div>
    </>
  );
};

export default MessageBoardForm;
