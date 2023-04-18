import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import MessageBoardForm from "../MessageBoardForm/MessageBoardForm";
// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faChevronRight,
  faChevronDown,
  faReply,
} from "@fortawesome/free-solid-svg-icons";
import { Divider } from "@mui/material";
import Header from "../../../layout/Header/Header";
import dayjs from "dayjs";

import { Button } from "@mui/material";

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
        {/* Search bar for message board */}
        <input
          type="search"
          id="message-board-search"
          name="message-board-input"
          placeholder="Search..."
        />
        <Button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
        </Button>
        <div>
          <Button variant="contained" onClick={handleAddThreadClick}>
            <FontAwesomeIcon icon={faPlus} size="sm" />
            {!addThread ? " Thread" : " Cancel"}
          </Button>
          <Button variant="contained" color="secondary" onClick={goToDashboard}>
            Dashboard
          </Button>
          <div className="thread-container">
            {addThread ? <MessageBoardForm /> : ""}
            <ul align="left" style={{ listStyle: "none", marginLeft: "10%" }}>
              {messageList?.map((message) => (
                <li
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
                        {" "}
                        {expand.includes(message.id) ? (
                          <FontAwesomeIcon icon={faChevronDown} />
                        ) : (
                          <FontAwesomeIcon icon={faChevronRight} />
                        )}{" "}
                      </Button>
                    ) : (
                      ""
                    )}
                    <span>
                      <strong>{`@${message.username}  `}</strong>
                      {dayjs(message.created_at).format("MMM D h:mm A")}
                    </span>
                    {message.message}
                    {/* TEMPORARY DIVIDER OPTIONS */}
                    <Divider variant="inset" component="li" />
                    {/* passing message.id as parent_id prop to form component */}
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
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageBoard;
