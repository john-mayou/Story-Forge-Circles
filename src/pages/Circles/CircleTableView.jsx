import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CircleTableView({ circlelist, isJoined = false }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { owned_circles, joined_circles, id } = useSelector(
    (store) => store.user
  );

  const navigateToCircleDashboard = ({ id }) => {
    if (owned_circles.includes(id) || joined_circles.includes(id)) {
      history.push(`/circle-dashboard/${id}`);
    } else {
      alert("You must be a subscriber to view this circle.");
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Join</th>
          <th>Go</th>
        </tr>
      </thead>
      <tbody>
        {circlelist.map((circle) => {
          return (
            <tr key={circle.id}>
              <td>{circle.name}</td>
              <td>{circle.description}</td>
              <td>
                {!owned_circles.includes(circle.id) &&
                !joined_circles.includes(circle.id) ? (
                  <button
                    onClick={() =>
                      dispatch({
                        type: "CREATE_NEW_NOTIFICATION",
                        payload: {
                          circle_id: circle.id,
                          recipient_id: circle.owner_id,
                          type: "request to join - leader action",
                        },
                      })
                    }
                  >
                    Request to Join
                  </button>
                ) : (
                  <span>Joined</span>
                )}
              </td>
              <td onClick={() => navigateToCircleDashboard(circle)}>
                <button>Go</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
