import "./Header.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faTrashCan,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import notificationsObject from "../../utils/notifications";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

// base style for modals
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: "5px",
};

function Header({ title }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_NOTIFICATIONS" });
  }, []);

  return (
    <header id="content-header">
      <div className="header-empty-div"></div>
      <div className="header-title-box">
        <h1 className="header-title">{title}</h1>
      </div>
      <div className="header-right-end-container">
        <NestedModal />
        <div className="header-profile-container">
          <img
            className="header-avatar-image"
            src="/cat.svg"
            width="40"
            height="49"
          />
          <p className="header-username">{user?.username}</p>
        </div>
      </div>
    </header>
  );
}

function NestedModal() {
  const notifications = useSelector((store) => store.notifications);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <FontAwesomeIcon
        icon={faBell}
        className="header-notification-bell"
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Notifications</h2>
          <p id="parent-modal-description"></p>
          <div>
            {notifications.map((notification) => {
              const attributes = notificationsObject[notification.type];

              return (
                <div
                  className="notification-container"
                  key={notification.notification_id}
                >
                  <p className="notification-text">
                    {attributes?.messageConstructor(notification)}
                  </p>
                  {attributes.next_actions ? (
                    <ChildModal notification={notification} />
                  ) : (
                    <FontAwesomeIcon
                      className="complete-notification-btn"
                      icon={faTrashCan}
                      onClick={() =>
                        dispatch({
                          type: "COMPLETE_NOTIFICATION",
                          payload: notification.notification_id,
                        })
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

function ChildModal({ notification }) {
  const [open, setOpen] = React.useState(false);
  const attributes = notificationsObject[notification.type];
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const executeNextActions = (buttonType, notification) => {
    // dispatch all actions of the array for the given type
    notificationsObject[notification.type].next_actions[
      buttonType
    ].dispatch_actions.map((paramConstructor) => {
      dispatch(paramConstructor(notification));
    });
  };

  return (
    <React.Fragment>
      <FontAwesomeIcon
        onClick={handleOpen}
        icon={faArrowRight}
        className="notification-handle-actions-btn"
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <h2 id="child-modal-title">Actions</h2>
          <p id="child-modal-description"></p>
          <p className="notification-action-text">
            {attributes?.messageConstructor(notification)}
          </p>
          <div className="notification-action-buttons-box">
            <button
              className="notification-accept-btn"
              onClick={() => {
                executeNextActions("accept", notification);
                handleClose();
              }}
            >
              {attributes.next_actions.accept.button_text}
            </button>
            <button
              className="notification-reject-btn"
              onClick={() => {
                executeNextActions("reject", notification);
                handleClose();
              }}
            >
              {attributes.next_actions.reject.button_text}
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default Header;
