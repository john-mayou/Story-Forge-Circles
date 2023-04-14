import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CircleTableView({ circlelist, isJoined = false }) {
  // Get the current user's ID from the Redux store
  const { owned_circles, joined_circles } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {circlelist.map((circle) => {
          return (
            <tr key={circle.id}>
              <td>
                {circle.name}
                {(owned_circles.includes(circle.id) ||
                  joined_circles.includes(circle.id)) && (
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
                    JOIN
                  </button>
                )}
              </td>

              <td>{circle.description}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
