import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import MessageBoardForm from "../MessageBoardForm/MessageBoardForm";
import SearchMessageBoard from "../SearchMessageBoard/SearchMessageBoard";
// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faChevronRight,
  faChevronDown,
  faReply,
} from "@fortawesome/free-solid-svg-icons";
import {
  Paper,
  InputBase,
  Divider,
  IconButton,
  Button,
  ButtonGroup,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import Header from "../../../layout/Header/Header";
import dayjs from "dayjs";

function MessageBoard() {
  const { circle_id, circleName } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const messageList = useSelector((store) => store.messages);
  const [addThread, setAddThread] = useState(false);
  const [expand, setExpand] = useState([]);
  const [replyId, setReplyId] = useState(-1);

  // fetch all base messages on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_BASE_MESSAGES",
    });
  }, []);

  const handleAddThreadClick = () => {
    setAddThread(!addThread);
  };

  const goToDashboard = () => {
    history.push(`/circle-dashboard/${circle_id}/${circleName}`);
  };

  return (
    <>
      <main className="content-main">
        <Header title={`${circleName} Message Board`} />
        <div align="center" style={{ backgroundColor: "#FCF5F0" }}>
          <SearchMessageBoard />
          <div>
            {/** +THREAD & DASHBOARD BUTTON **/}
            <ButtonGroup>
              <Button variant="contained" onClick={handleAddThreadClick}>
                <FontAwesomeIcon icon={faPlus} size="sm" />
                {!addThread ? " Thread" : " Cancel"}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={goToDashboard}
              >
                Dashboard
              </Button>
            </ButtonGroup>

            {/** BEGIN THREAD LIST **/}
            <React.Fragment className="thread-container" />
            <section className="comment-thread-cards">
              <List
                sx={{
                  width: "100%",
                  maxWidth: "80vw",
                  bgcolor: "background.paper",
                }}
              >
                {addThread ? <MessageBoardForm /> : ""}
                <ListItem
                  alignItems="flex-start"
                  style={{ listStyle: "none", padding: 0 }}
                >
                  {/** STATIC AVATAR **/}
                  <ListItemAvatar>
                    <Avatar
                      className="header-avatar-image"
                      src="/cat.svg"
                      alt="Draft Cat"
                      width="40"
                      height="49"
                    />
                  </ListItemAvatar>
                </ListItem>

                {/** MESSAGE DISPLAY LIST **/}
                {messageList?.map((message) => (
                  <ListItem
                    key={message.id}
                    style={
                      message.parent_id
                        ? {
                            // Adding indentation based on path length
                            marginLeft: `${
                              4 *
                              (message?.path?.includes(".")
                                ? message?.path?.split(".").length
                                : 1)
                            }rem`,
                          }
                        : {}
                    }
                  >
                    <div>
                      {/* <pre>{JSON.stringify(message)}</pre> */}
                      {message.has_children ? (
                        <Button
                          onClick={() => {
                            if (expand.includes(message.id)) {
                              setExpand(
                                expand.filter((id) => {
                                  if (id != message.id) {
                                    return id;
                                  }
                                })
                              );
                              dispatch({
                                type: "REMOVE_CHILDREN",
                                payload: message.id,
                              });
                            } else {
                              setExpand([...expand, message.id]);
                              dispatch({
                                type: "FETCH_CHILDREN",
                                payload: message.id,
                              });
                            }
                          }}
                        >
                          {expand.includes(message.id) ? (
                            <FontAwesomeIcon icon={faChevronDown} />
                          ) : (
                            <FontAwesomeIcon icon={faChevronRight} />
                          )}
                        </Button>
                      ) : (
                        ""
                      )}
                      <ListItemText
                        primary={`@${message.username}  `}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="primary.main"
                            >
                              {dayjs(message.created_at).format("MMM D h:mm A")}
                            </Typography>
                            {message.message}
                          </React.Fragment>
                        }
                      />
                      {/** passing message.id as parent_id prop to form component **/}
                      {replyId == message.id ? (
                        <MessageBoardForm
                          parent_id={message.id}
                          setReplyId={setReplyId}
                        />
                      ) : (
                        <Button onClick={() => setReplyId(message.id)}>
                          <FontAwesomeIcon icon={faReply} /> Reply
                        </Button>
                      )}
                      {/* TEMPORARY DIVIDER OPTIONS */}
                      {/* <Divider variant="inset" component="li" /> */}
                      <Divider
                        variant="inset"
                        component="li"
                        sx={{ height: "100%", m: 0.3 }}
                        orientation="horizontal"
                      />
                    </div>
                  </ListItem>
                ))}
              </List>
            </section>
            {/** END OF COMMENT LIST **/}
          </div>
        </div>
      </main>
    </>
  );
}

export default MessageBoard;
