import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ConfirmDialog from "./Dialogue/ConfirmDialog/ConfirmDialog";
import { Button } from "@mui/material";
import "../pages/Circles/TableStyling.css";

function UnshareButton({ onClick }) {
  return <button onClick={onClick}>Unshare</button>;
}

export default function TableManuscriptView({ circle_id, manuscriptlist }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleManuscriptClick = (manuscriptId) => {
    history.push(`/manuscript-read/${manuscriptId}`);
  };

  const handleUnshareButtonClick = (event, manuscriptId) => {
    // event.stopPropagation();
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
    <table className="circle-Table">
      <thead>
        <tr className="table-header">
          <th>
            <h3>Author</h3>
          </th>
          <th>
            <h3>Title</h3>
          </th>
          <th>
            <h3>Preview</h3>
          </th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        {manuscriptlist?.map((manuscript) => {
          let preview = manuscript.body;
          if (manuscript.body.length > 125) {
            preview = manuscript.body.substring(0, 125);
            preview = preview + "...";
          }
          
          return (
            <tr className="manuscript-table-row-style" key={manuscript?.id}>
              <td
                onClick={() => handleManuscriptClick(manuscript?.manuscript_id)}
              >
                {manuscript?.author || manuscript?.username}
              </td>
              <td
                onClick={() => handleManuscriptClick(manuscript?.manuscript_id)}
              >
                {manuscript?.title}
              </td>
              <td
                onClick={() => handleManuscriptClick(manuscript?.manuscript_id)}
              >
                {preview}
              </td>
              {manuscript?.author && (
                <td>
                  <Button onClick={() => setDeleteOpen(true)}>Unshare</Button>
                  <ConfirmDialog
                    title="Unshare Manuscript?"
                    children="Manuscript will be removed from circle dashboard."
                    open={deleteOpen}
                    setOpen={setDeleteOpen}
                    onConfirm={(e) =>
                      handleUnshareButtonClick(e, manuscript?.manuscript_id)
                    }
                  ></ConfirmDialog>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
