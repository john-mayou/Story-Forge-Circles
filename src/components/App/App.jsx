import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ProtectedRoute from "../../utils/ProtectedRoute";

// Layout Components
import Sidebar from "../../layout/Sidebar/Sidebar";

// User / Admin Pages
import ReadingListPage from "../../pages/User/ReadingList/ReadingListPage/ReadingListPage";
import WritersDeskPage from "../../pages/User/WritersDesk/WritersDeskPage/WritersDeskPage";
import ReadManuscriptPage from "../../pages/User/ReadingList/ReadManuscriptPage/ReadManuscriptPage";
import WriteManuscriptPage from "../../pages/User/WritersDesk/WriteManuscriptPage/WriteManuscriptPage";

// Circles Pages
import MyCirclesPage from "../../pages/Circles/MyCirclesPage/MyCirclesPage";
import BrowserCirclePage from "../../pages/Circles/BrowserCirclePage/BrowserCirclePage";
import MembersPage from "../../pages/Circles/MembersPage/MembersPage";
import MessageBoard from "../../pages/MessageBoardFiles/MessageBoard/MessageBoard";
import CircleDashboard from "../../pages/Circles/CircleDashboard/CircleDashboard";
import ManuscriptCommentThread from "../../pages/ManuscriptCommentFiles/ManuscriptCommentThread/ManuscriptCommentThread";
// Login Pages
import LoginPage from "../../pages/Login/Login/LoginPage/LoginPage";
import RegisterPage from "../../pages/Login/Register/RegisterPage/RegisterPage";

//CSS
import "./App.css";

//MUI Theme
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const themeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#ffc15e",
      light: "#ffc15e",
      dark: "#ffda9a",
    },
    secondary: {
      main: "#ffffff",
      dark: "#fffaf2",
      contrastText: "#000000",
      light: "#fffbf2",
    },
    background: {
      default: "#fcf5f0",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 0,
  },
};

const theme = createTheme(themeOptions);

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          {user.id && <Sidebar />}
          <Switch>
            <Redirect exact from="/" to="/reading-list" />

            <ProtectedRoute exact path="/reading-list">
              <ReadingListPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/manuscript-read/:id">
              <ReadManuscriptPage />
            </ProtectedRoute>

            {/* Keep until comment thread functionality is complete */}
            <ProtectedRoute exact path="/manuscript-comment-thread">
              <ManuscriptCommentThread />
            </ProtectedRoute>

            <ProtectedRoute exact path="/writers-desk">
              <WritersDeskPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/manuscript-write/:id">
              <WriteManuscriptPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/circles">
              <MyCirclesPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/circles/:id/members">
              <MembersPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/message-board/:circle_id/:circleName">
              <MessageBoard />
            </ProtectedRoute>

            <ProtectedRoute exact path="/circles-browser">
              <BrowserCirclePage />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/circle-dashboard/:circle_id/:circleName"
            >
              <CircleDashboard />
            </ProtectedRoute>

            <Route exact path="/login">
              {user.id ? (
                // If the user is already logged in
                <Redirect to="/reading-list" />
              ) : (
                // Otherwise, show the login page
                <LoginPage />
              )}
            </Route>

            <Route exact path="/login">
              {user.id ? (
                // If the user is already logged in
                <Redirect to="/reading-list" />
              ) : (
                // Otherwise, show the login page
                <LoginPage />
              )}
            </Route>

            <Route exact path="/registration">
              {user.id ? (
                // If the user is already logged in
                <Redirect to="/reading-list" />
              ) : (
                // Otherwise, show the registration page
                <RegisterPage />
              )}
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
