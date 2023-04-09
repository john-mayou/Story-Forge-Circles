import React from "react";
import Sidebar from "../../layout/Sidebar/Sidebar";
import { useSelector } from "react-redux";

function UserPage() {
    // this component doesn't do much to start, just renders some user reducer info to the DOM
    const user = useSelector((store) => store.user);
    return (
        <div>
            <Sidebar />
            <main className="content-main">
                <h2>Welcome, {user.username}!</h2>
                <p>Your ID is: {user.id}</p>
            </main>
        </div>
    );
}

// this allows us to use <App /> in index.js
export default UserPage;
