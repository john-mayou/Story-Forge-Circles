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
import { Paper, InputBase, Divider, IconButton, Button, ButtonGroup, Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar } from "@mui/material";
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
      <Header title={`${circleName} Message Board`} />
      <div align="center" style={{ backgroundColor: "#FCF5F0" }}>
        <>
          <SearchMessageBoard />
          <div>
            {/** NEW THREAD BUTTON **/}
            <ButtonGroup >
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

            {/** THREAD LIST **/}
            <React.Fragment className="thread-container" />
            <section className="comment-thread-cards" >
              <List sx={{ width: "100%", maxWidth: 500, bgcolor: 'background.paper'}}>
              {addThread ? <MessageBoardForm /> : ''}
                <ListItem alignItems="flex-start" style={{ listStyle: "none", padding: 0 }}></ListItem>
                {/* AVATAR HERE */}

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
                      ) : ('')
                      }
                      <span>
                        <ListItemText primary={<strong>{`@${message.username}  `}</strong>}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {dayjs(message.created_at).format("MMM D h:mm A")}
                                </Typography>
                              {" — details…"}
                              {message.message}
                            </React.Fragment>
                        }
                        />
                      </span>
                      
    
                      <></>
                      
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
                  sx={{ height: 10, m: 0.3 }}
                  orientation="horizontal"
                />
                    </div>
                  </ListItem>
                ))}
                {/* </div> */}
                </List>
            </section> 
            {/** END OF COMMENT LIST **/}
          </div>
          {/* </Paper> */}
        </>
      </div>
    </>
  );
}

export default MessageBoard;
