import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector((store) => store.user);

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

export default Header;
