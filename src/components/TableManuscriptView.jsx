import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ConfirmDialog from "./Dialogue/ConfirmDialog/ConfirmDialog";
import { Button } from "@mui/material";
import "../assets/styles/global/TableStyling.css";

function UnshareButton({ onClick }) {
  return <button onClick={onClick}>Unshare</button>;
}

export default function TableManuscriptView({ circle_id, manuscriptlist }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [deleteOpenManuscriptId, setDeleteOpenManuscriptId] = useState(null);

  const handleManuscriptClick = (manuscriptId) => {
    history.push(`/manuscript-read/${manuscriptId}`);
  };

  const handleUnshareButtonClick = (manuscriptId) => {
    const payload = {
      circle_id,
      manuscriptId,
    };
    dispatch({
      type: "DELETE_SHARED_CIRCLE_MANUSCRIPT",
      payload,
    });
  };

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
          <th></th>
        </tr>
      </thead>
      <tbody>
        {manuscriptlist?.map((manuscript) => (
          <tr className="circle-table-row-style" key={manuscript?.id}>
            <td
              onClick={() =>
                handleManuscriptClick(
                  manuscript?.manuscript_id ?? manuscript?.id
                )
              }
            >
              {manuscript?.author ?? manuscript?.username}
            </td>
            <td
              onClick={() =>
                handleManuscriptClick(
                  manuscript?.manuscript_id ?? manuscript?.id
                )
              }
            >
              {manuscript?.title}
            </td>
            <td
              onClick={() =>
                handleManuscriptClick(
                  manuscript?.manuscript_id ?? manuscript?.id
                )
              }
            >
              {manuscript?.body}
            </td>
            {manuscript?.author && (
              <td>
                <Button onClick={() => setDeleteOpenManuscriptId(manuscript?.manuscript_id ?? manuscript?.id)}>Unshare</Button>
                <ConfirmDialog
                  title="Unshare Manuscript?"
                  children="Manuscript will be removed from circle dashboard."
                  open={deleteOpenManuscriptId === (manuscript?.manuscript_id ?? manuscript?.id)}
                  setOpen={() => setDeleteOpenManuscriptId(null)}
                  onConfirm={(e) =>
                    handleUnshareButtonClick(
                      manuscript?.manuscript_id ?? manuscript?.id
                    )
                  }
                ></ConfirmDialog>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
