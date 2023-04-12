import React from "react";
import { useSelector } from "react-redux";

export default function CircleTableView({ circlelist, isJoined = false }) {
  // Get the current user's ID from the Redux store
  const { id } = useSelector((store) => store.user);

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
          // Determine whether to show the "JOIN" button for this circle
          let shouldShowJoinButton = isJoined && id !== circle.owner_id;
          return (
            <tr key={circle.id}>
              <td>
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
