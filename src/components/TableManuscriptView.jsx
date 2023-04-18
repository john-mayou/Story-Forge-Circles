import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ConfirmDialog from "./Dialogue/ConfirmDialog/ConfirmDialog";
import { Button } from "@mui/material";

export default function TableManuscriptView({ circle_id, manuscriptlist }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [deleteOpen, setDeleteOpen] = useState(false);

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
            <td onClick={() => handleManuscriptClick(manuscript?.manuscript_id ?? manuscript?.id)}>
              {manuscript?.author || manuscript?.username}
            </td>
            <td onClick={() => handleManuscriptClick(manuscript?.manuscript_id ?? manuscript?.id)}>
              {manuscript?.title}
            </td>
            <td onClick={() => handleManuscriptClick(manuscript?.manuscript_id ?? manuscript?.id)}>
              {manuscript?.body}
            </td>
            {manuscript?.author && (
              <td>
                <Button onClick={() => setDeleteOpen(true)}>
                  Unshare
                </Button>
                <ConfirmDialog
                  title="Unshare Manuscript?"
                  children="Manuscript will be removed from circle dashboard."
                  open={deleteOpen}
                  setOpen={setDeleteOpen}
                  onConfirm={(e) =>
                    handleUnshareButtonClick(manuscript?.manuscript_id ?? manuscript?.id)
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
