import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import MessageBoardForm from "../MessageBoardForm/MessageBoardForm";
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

function MessageBoard() {
  const { circle_id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const messageList = useSelector(store => store.messages);
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
          <button onClick={handleAddThreadClick}>{!addThread ? '+Thread' : 'Cancel' }</button>
          <button onClick={goToDashboard}>Dashboard</button>
          <div className="thread-container">
            { addThread ? <MessageBoardForm /> : ''}
            <ul align="left" style={{ listStyle: "none", marginLeft: "5rem" }}>
            {messageList?.map((message) => (
              <li key={message.id}
                style={message.parent_id ?
                  { // Adding indentation based on path length
                    marginLeft: `${4 * (message.path.includes('.') ?
                      message.path.split('.').length : 1)}rem`
                  }
                  : {}
                }>
                <div>
                  <pre>{JSON.stringify(message)}</pre>
                  {message.has_children
                    ? <button onClick={() => {
                    if (expand.includes(message.id)) {
                      setExpand(expand.filter((id) => {
                        if (id != message.id) {
                          return id
                        }
                      }));
                      dispatch({ type: 'REMOVE_CHILDREN', payload: message.id })
                    } else {
                      setExpand([...expand, message.id])
                      dispatch({ type: 'FETCH_CHILDREN', payload: message.id })
                    }
                  }}
                  > {
                      expand.includes(message.id) ?
                        <FontAwesomeIcon icon={faChevronDown} />
                      : <FontAwesomeIcon icon={faChevronRight} />
                      }  </button>
                    : ''} 
                  {`@${message.username}: `}
                  {`${message.message} `}
                  {/* passing message.id as parent_id prop to form component */}
                  {replyId == message.id ? <MessageBoardForm parent_id={message.id} setReplyId={setReplyId} />
                   : <button onClick={() => (setReplyId(message.id))}>Reply</button> 
                  }
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
