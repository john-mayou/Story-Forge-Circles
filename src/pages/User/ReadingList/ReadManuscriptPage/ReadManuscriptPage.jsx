import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import Comment from "../../../CommentFiles/Comment/Comment";

function ReadManuscriptPage() {
    const history = useHistory();
    const [comment, setComment] = useState('');

  
    // const addComment = (parentId, newCommentText) => {
    //     let newComment = null;
    //     if (parentId) {
    //         newComment = getNewComment(newCommentText, false, parentId);
    //         setComment((comments) => ({
    //             ...comments,
    //             [parentId]: {
    //                 ...comments[parentId],
    //                 childComments: [...comments[parentId].childComments, newComment.id],
    //             },
    //         }));
    //     } else {
    //         newComment = getNewComment(newCommentText, true, null);
    //     }
    //     setComments((comments) => ({ ...comments, [newComment.id]: newComment }));
    // };
   
    // const Comment = ({ comment, addComment }) => {
    //     const { commentText, childComments, id } = comment;
    //     const [childComment, setChildComment] = useState("");
    //     const [show, setShow] = useState(true);
    //     const [showAddComponent, setShowAddComponent] = useState(false);
    //     const onAdd = () => {
    //         addComment(id, childComment);
    //         setChildComment("");
    //         setShowAddComponent(false);
    //     };

        // * Comment Thread passing comments prop 
        // export default function CommentThread({ comments }) {
        //     return (
        //       <ul>
        //         {comments.map((comment) => (
        //           <li key={comment.id}>
        //             <div>{comment.text}</div>
        //             {comment.replies && <CommentThread comments={comment.replies} />}
        //           </li>
        //         ))}
        //       </ul>
        //     );
        // };
        return (
            <>
                <div align="center">
                    <h3>Manuscript View</h3>
                    <button onClick={history.goBack}>Back</button>
                    <h4>Comments</h4>
                    <button>+Comment</button>
                </div>
                <div className="comments-container" align="center">
                    <input
                        type="text"
                        value={Comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="add comment"
                        style={{ width: "80%", marginRight: "1rem" }}
                    />
                    <button onClick>Add</button>
                </div>
            </>
        );
    }
// }

export default ReadManuscriptPage;
