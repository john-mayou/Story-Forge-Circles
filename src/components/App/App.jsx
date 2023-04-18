import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ProtectedRoute from "../../utils/ProtectedRoute";

// Notification Actions (REMOVE LATER)
import NotificationActionsPage from "../../utils/NotificationActionsPage";

// Layout Components
import Sidebar from "../../layout/Sidebar/Sidebar";
import Header from "../../layout/Header/Header";

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
import MessageBoardForm from "../../pages/MessageBoardFiles/MessageBoardForm/MessageBoardForm";
import SearchPage from "../../pages/Search/SearchPage";
import CircleDashboard from "../../pages/Circles/CircleDashboard/CircleDashboard";

// Login Pages
import LoginPage from "../../pages/Login/Login/LoginPage/LoginPage";
import RegisterPage from "../../pages/Login/Register/RegisterPage/RegisterPage";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        {user.id && <Sidebar />}
        {user.id && <Header />}
        <Switch>
          <Redirect exact from="/" to="/reading-list" />

          <ProtectedRoute exact path="/reading-list">
            <ReadingListPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/manuscript-read/:id">
            <ReadManuscriptPage />
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

          {/*KEEP THIS UNTIL NOTIFICATIONS ARE IMPLEMENTED FULLY*/}
          <ProtectedRoute exact path="/notification-actions">
            <NotificationActionsPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/message-board-form">
            <MessageBoardForm />
          </ProtectedRoute>

          {/*KEEP THIS UNTIL NOTIFICATIONS ARE IMPLEMENTED FULLY*/}
          <ProtectedRoute exact path="/notification-actions">
            <NotificationActionsPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/circles-browser">
            <BrowserCirclePage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/search/:content/:type">
            <SearchPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/circle-dashboard/:circle_id/:circleName">
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
  );
}

export default App;
