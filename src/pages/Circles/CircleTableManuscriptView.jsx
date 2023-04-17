import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function UnshareButton({ onClick }) {
  return <button onClick={onClick}>Unshare</button>;
}

export default function CircleTableManuscriptView({ circle_id, manuscriptlist }) {
  const history = useHistory();

  const handleManuscriptClick = (manuscriptId) => {
    history.push(`/manuscript-read/${manuscriptId}`);
  };

  const handleUnshareButtonClick = (event, manuscriptId) => {
    event.stopPropagation();
    const payload = {
      circle_id,
      manuscriptId
    }
    dispatch({
      type: "DELETE_SHARED_CIRCLE_MANUSCRIPT",
      payload
      
    })
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
          <tr key={manuscript?.id} onClick={() => handleManuscriptClick(manuscript?.id)}>
            <td>{manuscript?.author}</td>
            <td>{manuscript?.title}</td>
            <td>{manuscript?.body}</td>
            <td><UnshareButton onClick={(e) => handleUnshareButtonClick(e, manuscript?.id)} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
