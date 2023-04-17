import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function UnshareButton({ onClick }) {
  return <button onClick={onClick}>Unshare</button>;
}

export default function CircleTableManuscriptView({
  circle_id,
  manuscriptlist,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleManuscriptClick = (manuscriptId) => {
    history.push(`/manuscript-read/${manuscriptId}`);
  };

  const handleUnshareButtonClick = (event, manuscriptId) => {
    event.stopPropagation();
    const payload = {
      circle_id,
      manuscriptId,
    };
    dispatch({
      type: "DELETE_SHARED_CIRCLE_MANUSCRIPT",
      payload,
    });
  };

  console.log("manuscriptlist", manuscriptlist);

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
          <tr
            key={manuscript?.id}
            onClick={() => handleManuscriptClick(manuscript?.id)}
          >
            <td>{manuscript?.author || manuscript?.username}</td>
            <td>{manuscript?.title}</td>
            <td>{manuscript?.body}</td>
            {manuscript?.author && (
              <td>
                <UnshareButton
                  onClick={(e) =>
                    handleUnshareButtonClick(e, manuscript?.manuscript_id)
                  }
                />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
