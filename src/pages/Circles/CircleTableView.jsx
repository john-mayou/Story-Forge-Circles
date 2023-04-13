import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CircleTableView({ circlelist, isJoined = false }) {
  // Get the current user's ID from the Redux store
  const { id } = useSelector((store) => store.user);
  const history = useHistory();

  const navigateToCircleDashboard = (circle_id) => {
    history.push(`/circle-dashboard/${circle_id}`);
  }
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
          console.log("circle", circle);
          // Determine whether to show the "JOIN" button for this circle
          let shouldShowJoinButton = isJoined && id !== circle.owner_id;
          return (
            <tr key={circle.id}>
              <td onClick={() => navigateToCircleDashboard(circle.id)}>
                {circle.name}
                {shouldShowJoinButton && <button>JOIN</button>}
              </td>

              <td>{circle.description}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
