import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CircleTableManuscriptView({ manuscriptlist }) {
  // Get the current user's ID from the Redux store
  const { id } = useSelector((store) => store.user);
  const history = useHistory();

  const navigateToCircleDashboard = (circle_id) => {
    history.push(`/circle-dashboard/${circle_id}`);
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Title</th>
          <th>Preview</th>
        </tr>
      </thead>
      <tbody>
        {manuscriptlist?.map((manuscript) => (
          <tr key={manuscript?.id}>
            <td>{manuscript?.author}</td>
            <td>{manuscript?.title}</td>
            <td>{manuscript?.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
