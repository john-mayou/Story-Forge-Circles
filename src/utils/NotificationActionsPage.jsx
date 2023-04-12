import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import notificationsObject from "../utils/notifications";

function NotificationActionsPage() {
    const dispatch = useDispatch();

    // CIRCLE DUMMY DATA
    const circle = {
        id: 1,
        name: "CircleTestName",
        description: "CircleTestDescription",
        owner_id: 1,
    };

    const notifications = useSelector((store) => store.notifications);

    useEffect(() => {
        dispatch({ type: "FETCH_NOTIFICATIONS" });
    }, []);

    const RequestToJoin = () => {
        dispatch({
            type: "CREATE_NEW_NOTIFICATION",
            payload: {
                circle_id: circle.id,
                recipient_id: circle.owner_id, // DUMMY DATA FROM UP ABOVE
                type: "request to join - leader action",
            },
        });
    };

    const MemberNomination = () => {
        dispatch({
            type: "CREATE_NEW_NOTIFICATION",
            payload: {
                circle_id: circle.id,
                recipient_id: circle.owner_id,
                type: "member nomination - leader action",
                new_nomination: 4, // DUMMY DATA HARDCODED
            },
        });
    };

    const LeaderAddMember = () => {
        dispatch({
            type: "CREATE_NEW_NOTIFICATION",
            payload: {
                circle_id: circle.id,
                recipient_id: 3, // DUMMY DATA HARDCODED
                type: "leader invite member - user action",
            },
        });
    };

    const LeaderNominateLeader = () => {
        dispatch({
            type: "CREATE_NEW_NOTIFICATION",
            payload: {
                circle_id: circle.id,
                recipient_id: 3, // DUMMY DATA HARDCODED
                type: "leader nominate leader - user action",
            },
        });
    };

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
        <main className="content-main">
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
                {notifications.map((notification) => {
                    const attributes = notificationsObject[notification.type];

                    return (
                        <div key={notification.notification_id}>
                            <p>
                                {attributes?.messageConstructor(notification)}
                            </p>
                            {attributes.next_actions ? (
                                <div>
                                    <button
                                        onClick={() =>
                                            executeNextActions(
                                                "accept",
                                                notification
                                            )
                                        }
                                    >
                                        {
                                            attributes.next_actions.accept
                                                .button_text
                                        }
                                    </button>
                                    <button
                                        onClick={() =>
                                            executeNextActions(
                                                "reject",
                                                notification
                                            )
                                        }
                                    >
                                        {
                                            attributes.next_actions.reject
                                                .button_text
                                        }
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() =>
                                        dispatch({
                                            type: "COMPLETE_NOTIFICATION",
                                            payload:
                                                notification.notification_id,
                                        })
                                    }
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </main>
    );
}

export default NotificationActionsPage;
