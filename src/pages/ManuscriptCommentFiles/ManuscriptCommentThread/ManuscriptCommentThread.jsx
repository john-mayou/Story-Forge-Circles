import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "../CommentForm/CommentForm";
// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronRight,
  faChevronDown,
  faReply,
} from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Divider,
  IconButton,
  Button,
  ButtonGroup,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import dayjs from "dayjs";

function ManuscriptCommentThread({ manuscript_id }) {
  const dispatch = useDispatch();
  const commentList = useSelector((store) => store.comments);
  const user = useSelector((store) => store.user);
  const manuscript = useSelector(
    (store) => store.manuscripts.manuscriptDetails
  );
  const [viewFeedback, setViewFeedback] = useState(false);
  const [addThread, setAddThread] = useState(false);
  const [expand, setExpand] = useState([]);
  const [replyId, setReplyId] = useState(-1);

  const handleAddThreadClick = () => {
    setAddThread(!addThread);
  };

  return (
    <>
      <div align="center">
        {/** COMMENT BUTTON **/}
        {/* if viewing own manuscript view feedback, else leave feedback */}
        {user.id == manuscript.user_id ? (
          <Button
            variant="contained"
            onClick={() => setViewFeedback(!viewFeedback)}
            sx={{ my: 1 }}
          >
            {!viewFeedback ? " View Feedback" : " Cancel"}
          </Button>
        ) : (
          <Button
            variant="contained"
              onClick={() => {
                setViewFeedback(!viewFeedback);
                handleAddThreadClick();
              }}
            sx={{ my: 1 }}
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
            {!viewFeedback ? " Leave Feedback" : " Cancel"}
          </Button>
        )}
        {viewFeedback ? (
          <>
            {/** BEGIN THREAD LIST **/}
            <div className="thread-container">
              <section className="comment-thread-cards">
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    overflow: "auto"
                  }}
                >
                  {addThread ? (
                    <CommentForm
                      manuscript_id={manuscript_id}
                      handleAddThreadClick={handleAddThreadClick}
                      setReplyId={setReplyId}
                    />
                  ) : (
                    ""
                  )}
                  <ListItem
                    alignItems="flex-start"
                    style={{ listStyle: "none", padding: 0 }}
                  ></ListItem>
                  {/** COMMENT DISPLAY LIST **/}
                  {commentList?.map((comment) => (
                    <ListItem
                      key={comment.id}
                      style={
                        comment.parent_id
                          ? {
                              // Adding indentation based on path length
                              marginLeft: `${
                                4 *
                                (comment?.path?.includes(".")
                                  ? comment?.path?.split(".").length
                                  : 1)
                              }rem`,
                            }
                          : {}
                      }
                    >
                      <div>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          {comment.has_children ? (
                            <Button
                              onClick={() => {
                                if (expand.includes(comment.id)) {
                                  setExpand(
                                    expand.filter((id) => {
                                      if (id != comment.id) {
                                        return id;
                                      }
                                    })
                                  );
                                  dispatch({
                                    type: "REMOVE_CHILDREN",
                                    payload: comment.id,
                                  });
                                } else {
                                  setExpand([...expand, comment.id]);
                                  dispatch({
                                    type: "FETCH_CHILDREN",
                                    payload: comment.id,
                                  });
                                }
                              }}
                            >
                              {" "}
                              {expand.includes(comment.id) ? (
                                <FontAwesomeIcon icon={faChevronDown} />
                              ) : (
                                <FontAwesomeIcon icon={faChevronRight} />
                              )}{" "}
                            </Button>
                          ) : (
                            ""
                          )}
                          {/** DYNAMIC AVATAR **/}
                          <Avatar
                            className="header-avatar-image"
                            src={comment.avatar_image}
                            alt="Draft Cat"
                            width="40"
                            height="49"
                          />
                          <ListItemText
                            sx={{
                              color:
                                comment.username == user.username
                                  ? "#21929F"
                                  : "#000000",
                              ml: "1rem",
                            }}
                            primary={
                              <Box
                                sx={{ display: "flex", flexDirection: "row" }}
                              >
                                {comment.username}
                                <Typography
                                  sx={{
                                    display: "inline",
                                    mx: "1rem",
                                    alignSelf: "center",
                                  }}
                                  component="span"
                                  variant="body2"
                                  color="primary.main"
                                >
                                  {dayjs(comment.created_at).format(
                                    "MMM D h:mmA"
                                  )}
                                </Typography>
                              </Box>
                            }
                            secondary={
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Box>{comment.comment}</Box>
                                {/* passing comment.id as parent_id prop to form component */}
                                {replyId == comment.id ? (
                                  <CommentForm
                                    manuscript_id={manuscript_id}
                                    parent_id={comment.id}
                                    setReplyId={setReplyId}
                                  />
                                ) : (
                                  <Button
                                    onClick={() => setReplyId(comment.id)}
                                  >
                                    <FontAwesomeIcon icon={faReply} /> Reply
                                  </Button>
                                )}
                              </Box>
                            }
                          />
                          <Divider
                            variant="inset"
                            // component="li"
                            sx={{ height: "100%", m: 0.3 }}
                            orientation="horizontal"
                          />
                        </Box>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </section>
              {/** END OF COMMENT LIST **/}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ManuscriptCommentThread;
