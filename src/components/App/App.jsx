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

// Circles Pages
import MyCirclesPage from "../../pages/Circles/MyCirclesPage/MyCirclesPage";
import BrowserCirclePage from "../../pages/Circles/BrowserCirclePage/BrowserCirclePage";


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
                <Switch>
                    <Redirect exact from="/" to="/reading-list" />

                    <ProtectedRoute exact path="/reading-list">
                        <ReadingListPage />
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/manuscript-read">
                        <ReadManuscriptPage/>
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/writers-desk">
                        <WritersDeskPage />
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/circles">
                        <MyCirclesPage />
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/circles-browser">
                        <BrowserCirclePage />
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
