import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ConfirmDialog from "./Dialogue/ConfirmDialog/ConfirmDialog";
import { Button } from "@mui/material";


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
            <td onClick={() => handleManuscriptClick(manuscript?.manuscript_id)}>
              {manuscript?.author || manuscript?.username}
            </td>
            <td onClick={() => handleManuscriptClick(manuscript?.manuscript_id)}>
              {manuscript?.title}
            </td>
            <td onClick={() => handleManuscriptClick(manuscript?.manuscript_id)}>
              {manuscript?.body}
            </td>
            {manuscript?.author && (
              <td>
                {/* <UnshareButton
                  onClick={(e) =>
                    handleUnshareButtonClick(e, manuscript?.manuscript_id)
                  }
                /> */}

                <Button onClick={() => setDeleteOpen(true)}>
                  Unshare
                </Button>
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
        ))}
      </tbody>
    </table>
  );
}
