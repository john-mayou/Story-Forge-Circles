import "./Header.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import notificationsObject from "../../utils/notifications";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function Header() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const notifications = useSelector((store) => store.notifications);

  useEffect(() => {
    dispatch({ type: "FETCH_NOTIFICATIONS" });
  }, []);

  const executeNextActions = (buttonType, notification) => {
    // dispatch all actions of the array for the given type
    notificationsObject[notification.type].next_actions[
      buttonType
    ].dispatch_actions.map((paramConstructor) => {
      console.log("param constructor", paramConstructor);
      dispatch(paramConstructor(notification));
    });
  };

  return (
    <header id="content-header">
      <div className="header-empty-div"></div>
      <div className="header-title-box">
        <h1 className="header-title">Header Title</h1>
      </div>
      <div className="header-right-end-container">
        <FontAwesomeIcon icon={faBell} className="header-notification-bell" />
        <div className="header-profile-container">
          <img
            src="https://loremflickr.com/40/40"
            className="header-avatar-image"
          />
          <p className="header-username">{user?.username}</p>
        </div>
      </div>
      <NestedModal />
    </header>
  );
}

function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default Header;
