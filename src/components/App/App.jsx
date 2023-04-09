import React, { useEffect } from "react";
import {
    HashRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ProtectedRoute from "../../utils/ProtectedRoute";

import UserPage from "../UserPage/UserPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

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
                <Switch>
                    <Redirect exact from="/" to="/user" />

                    <ProtectedRoute exact path="/user">
                        <UserPage />
                    </ProtectedRoute>

                    <Route exact path="/login">
                        {user.id ? (
                            // If the user is already logged in
                            <Redirect to="/user" />
                        ) : (
                            // Otherwise, show the login page
                            <LoginPage />
                        )}
                    </Route>

                    <Route exact path="/registration">
                        {user.id ? (
                            // If the user is already logged in
                            <Redirect to="/user" />
                        ) : (
                            // Otherwise, show the registration page
                            <RegisterPage />
                        )}
                    </Route>

                    {/* <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route> */}

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
