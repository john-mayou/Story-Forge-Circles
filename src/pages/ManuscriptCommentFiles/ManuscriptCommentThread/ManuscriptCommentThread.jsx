// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
// import CommentForm from "../CommentForm/CommentForm";
// // font-awesome
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faChevronRight, faChevronDown, faReply } from '@fortawesome/free-solid-svg-icons';
// import { Button , Divider } from "@mui/material";
// import dayjs from 'dayjs';


// function ManuscriptCommentThread() {
//   const { circle_id, circleName } = useParams();
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const messageList = useSelector(store => store.messages);
//   const [addThread, setAddThread] = useState(false);
//   const [expand, setExpand] = useState([]);
//   const [replyId, setReplyId] = useState(-1);

//   // fetch all base messages on page load
//   useEffect(() => {
//     dispatch({
//       type: "FETCH_BASE_MESSAGES",
//     });
//   }, []);

//   const handleAddThreadClick = () => {
//     setAddThread(!addThread);
//   };

//   const goToDashboard = () => {
//     history.push(`/circle-dashboard/${circle_id}/${circleName}`);
//   };

//   return (
//     <>
//       <h3 align="center">Comment Thread</h3>
//       <div align="center" style={{backgroundColor: '#FCF5F0'}}>
//           <Button variant="contained" onClick={handleAddThreadClick}><FontAwesomeIcon icon={faPlus} size="sm" />{!addThread ? ' Thread' : ' Cancel' }</Button>
//           <Button variant="contained" color="secondary" onClick={goToDashboard}>Dashboard</Button>
//           <div className="thread-container">
//             { addThread ? <CommentForm /> : ''}
//             <ul align="left" style={{ listStyle: "none", marginLeft: "20%" }}>
//             {messageList?.map((comment) => (
//               <li key={comment.id}
//                 style={comment.parent_id ?
//                   { // Adding indentation based on path length
//                     marginLeft: `${4 * (comment?.path?.includes('.') ?
//                       comment?.path?.split('.').length : 1)}rem`
//                   }
//                   : {}
//                 }>
//                 <div>
//                   {/* <pre>{JSON.stringify(comment)}</pre> */}
//                   {comment.has_children
//                     ? <Button onClick={() => {
//                     if (expand.includes(comment.id)) {
//                       setExpand(expand.filter((id) => {
//                         if (id != comment.id) {
//                           return id
//                         }
//                       }));
//                       dispatch({ type: 'REMOVE_CHILDREN', payload: comment.id })
//                     } else {
//                       setExpand([...expand, comment.id])
//                       dispatch({ type: 'FETCH_CHILDREN', payload: comment.id })
//                     }
//                   }}
//                   > {
//                       expand.includes(comment.id) ?
//                         <FontAwesomeIcon icon={faChevronDown} />
//                       : <FontAwesomeIcon icon={faChevronRight} />
//                       }  </Button>
//                     : ''} 
//                   <span><strong>{`@${comment.username}  `}</strong>{dayjs(comment.created_at).format('MMM D h:mm A')}</span>
//                   {comment.comment}
//                   {/* TEMPORARY DIVIDER OPTIONS */}
//                   <div style={{ width: "100%", height: "1px", backgroundColor: "black", maxWidth: "90%"}}></div>
//                   {/* <Divider variant="inset" component="li" /> */}
//                   {/* passing comment.id as parent_id prop to form component */}
//                   {replyId == comment.id ? <CommentForm parent_id={comment.id} setReplyId={setReplyId} />
//                    : <Button onClick={() => (setReplyId(comment.id))}><FontAwesomeIcon icon={faReply} /> Reply</Button> 
//                   }
//                 </div>
//               </li>
//             ))}
//             </ul>
//           </div>
//         </div>
//     </>
//   );
// }

// export default ManuscriptCommentThread;
