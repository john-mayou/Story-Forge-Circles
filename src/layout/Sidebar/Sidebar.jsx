import "./Sidebar.scss";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookOpen,
    faAnglesRight,
    faPenNib,
    faCircleNotch,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
    const history = useHistory();
    const dispatch = useDispatch();

    // Put whatever inside these to remove for mobile
    // <span className="remove-for-mobile"></span>

    return (
        <nav className="navbar">
            <ul className="navbar__nav">
                <li className="navbar__logo">
                    <a className="navbar__link">
                        <span className="logo-text link-text">
                            <span className="logo-text-top">Story</span>
                            <span className="logo-text-bottom">Forge</span>
                        </span>
                        <FontAwesomeIcon
                            icon={faAnglesRight}
                            className="logo-icon link-icon"
                        />
                    </a>
                </li>
                <li
                    className="navbar__item"
                    onClick={() => history.push("/reading-list")}
                >
                    <a className="navbar__link">
                        <FontAwesomeIcon
                            icon={faBookOpen}
                            className="link-icon"
                        />
                        <span className="link-text">
                            Reading{" "}
                            <span className="remove-for-mobile">List</span>
                        </span>
                    </a>
                </li>
                <li
                    className="navbar__item"
                    onClick={() => history.push("/writers-desk")}
                >
                    <a className="navbar__link">
                        <FontAwesomeIcon
                            icon={faPenNib}
                            className="link-icon"
                        />
                        <span className="link-text">
                            Writers{" "}
                            <span className="remove-for-mobile">Desk</span>
                        </span>
                    </a>
                </li>
                <li
                    className="navbar__item"
                    onClick={() => history.push("/circles")}
                >
                    <a className="navbar__link">
                        <FontAwesomeIcon
                            icon={faCircleNotch}
                            className="link-icon"
                        />
                        <span className="link-text">Circles</span>
                    </a>
                </li>
                <li
                    className="navbar__item"
                    onClick={() => dispatch({ type: "LOGOUT" })}
                >
                    <a className="navbar__link">
                        <FontAwesomeIcon
                            icon={faRightFromBracket}
                            className="link-icon"
                        />
                        <span className="link-text">Logout</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;
