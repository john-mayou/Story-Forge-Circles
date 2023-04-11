import axios from "axios";
import { useState } from "react";

function NotificationActionsPage() {
    // CIRCLE DUMMY DATA
    const circle = {
        id: 1,
        name: "CircleTestName",
        description: "CircleTestDescription",
        owner_id: 1,
    };

    const [notifications, setNotifications] = useState([]);

    const getNotifications = () => {
        axios
            .get("/api/notification")
            .then((result) => {
                setNotifications(result.data);
            })
            .catch((error) => {
                console.log("Error getting notifications", error);
            });
    };

    // BUTTON
    const RequestToJoin = () => {
        const params = {
            circle_id: circle.id,
            type: "request to join - leader action",
            recipient_id: circle.owner_id,
            nomination: null,
        };

        axios
            .post("/api/notification/new", params)
            .then(() => {
                getNotifications();
            })
            .catch((error) => {
                console.log("Error with RequestToJoin", error);
            });
    };

    const MemberNomination = () => {
        const params = {
            circle_id: circle.id,
            type: "member nomination - leader action",
            recipient_id: circle.owner_id,
            nomination: 2, // from new user search (id)
        };

        axios
            .post("/api/notification/new", params)
            .then(() => {
                getNotifications();
            })
            .catch((error) => {
                console.log("Error with RequestToJoin", error);
            });
    };

    const LeaderAddMember = () => {
        const params = {
            circle_id: circle.id,
            type: "leader invite member - user action",
            recipient_id: 3, // from new user search (id)
            nomination: null,
        };

        axios
            .post("/api/notification/new", params)
            .then(() => {
                getNotifications();
            })
            .catch((error) => {
                console.log("Error with RequestToJoin", error);
            });
    };

    const LeaderNominateLeader = () => {
        const params = {
            circle_id: circle.id,
            type: "leader nominate leader - user action",
            recipient_id: 4, // from member management card (id)
            nomination: null,
        };

        axios
            .post("/api/notification/new", params)
            .then(() => {
                getNotifications();
            })
            .catch((error) => {
                console.log("Error with RequestToJoin", error);
            });
    };

    return (
        <main class="content-main">
            <div>
                <button onClick={RequestToJoin}>REQUEST TO JOIN</button>
            </div>
            <div>
                <button onClick={MemberNomination}>MEMBER NOMINATION</button>
            </div>
            <div>
                <button onClick={LeaderAddMember}>LEADER ADD MEMBER</button>
            </div>
            <div>
                <button onClick={LeaderNominateLeader}>
                    LEADER NOMINATE LEADER
                </button>
            </div>
            <div>
                {notifications.map((n) => {
                    return <p>{JSON.stringify(n)}</p>;
                })}
            </div>
        </main>
    );
}

export default NotificationActionsPage;
