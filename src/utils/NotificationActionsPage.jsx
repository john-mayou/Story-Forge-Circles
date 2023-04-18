import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import notificationsObject from "../utils/notifications";

function NotificationActionsPage() {
  const dispatch = useDispatch();

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
    <main className="content-main">
      <div>
        {notifications.map((notification) => {
          const attributes = notificationsObject[notification.type];

          return (
            <div key={notification.notification_id}>
              <p>{attributes?.messageConstructor(notification)}</p>
              {attributes.next_actions ? (
                <div>
                  <button
                    onClick={() => executeNextActions("accept", notification)}
                  >
                    {attributes.next_actions.accept.button_text}
                  </button>
                  <button
                    onClick={() => executeNextActions("reject", notification)}
                  >
                    {attributes.next_actions.reject.button_text}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    dispatch({
                      type: "COMPLETE_NOTIFICATION",
                      payload: notification.notification_id,
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
