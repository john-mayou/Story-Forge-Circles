import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CircleTableView({ circlelist, isJoined = false }) {
  // Get the current user's ID and subscribed circles from the Redux store
  const { id } = useSelector((store) => store.user);
  const myJoinedCircleList = useSelector((store) => store.myJoinedCircleList);
  const subscribedCircles = myJoinedCircleList ? myJoinedCircleList.map((circle) => circle.id) : [];
  const history = useHistory();

  const navigateToCircleDashboard = (circle) => {
    if (circle.owner_id === id || subscribedCircles.includes(circle.id)) {
      // Navigate to the circle dashboard if the user is subscribed to the circle, or if they own the circle
      history.push(`/circle-dashboard/${circle.id}`);
    } else {
      // Alert the user to request to join the circle if they are not subscribed
      alert("You must be a subscriber to view this circle.");
    }
  };

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
              <td onClick={() => navigateToCircleDashboard(circle)}>
                {circle.name}
                {shouldShowJoinButton && (
                  <button disabled={subscribedCircles.includes(circle.id)}>
                    {subscribedCircles.includes(circle.id) ? "Joined" : "JOIN"}
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
