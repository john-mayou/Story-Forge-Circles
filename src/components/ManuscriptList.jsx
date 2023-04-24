import { useState } from "react";
import ConfirmDialog from "./Dialogue/ConfirmDialog/ConfirmDialog";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function ManuscriptList({
  manuscripts,
  circle_id,
  isWritersDeskView = false,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState(null);
  const [unshareManuscriptId, setUnshareManuscriptId] = useState(null);
  const { id: userId } = useSelector((store) => store.user);


  const handleEdit = (manuscript) => {
    history.push(`/manuscript-write/${manuscript.id}`);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleDeleteConfirm = () => {
    dispatch({
      type: "REMOVE_MANUSCRIPT",
      payload: deleteId,
    });
    setDeleteId(null);
  };

  const handleDetails = (id) => {
    history.push(`/manuscript-read/${id}`);
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
    setUnshareManuscriptId(null);
  };

  const displayedManuscripts = manuscripts.map((manuscript) => {
    let preview = manuscript.body;
    if (manuscript.body.length > 200) {
      preview = manuscript.body.substring(0, 200);
      preview = preview + "...";
    }

    const canUnshareManuscript = circle_id && userId === manuscript.author_id


    return (
      <div key={manuscript?.manuscript_id ?? manuscript?.id}>
        <div
          className="manuscript-list-text-wrapper"
          onClick={() =>
            handleDetails(manuscript?.manuscript_id ?? manuscript?.id)
          }
        >
          <h2 className="manuscript-list-title">{manuscript.title}</h2>
          <h3 className="manuscript-list-author">
            {manuscript.username ?? manuscript.author}
          </h3>
          <p>{preview}</p>
        </div>
        <div className="manuscript-list-button-wrapper">
          {isWritersDeskView && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(manuscript)}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  handleDeleteClick(manuscript?.manuscript_id ?? manuscript?.id)
                }
              >
                Delete
              </Button>
            </>
          )}
          {canUnshareManuscript && (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                setUnshareManuscriptId(
                  manuscript?.manuscript_id ?? manuscript?.id
                )
              }
            >
              Unshare
            </Button>
          )}
        </div>
      </div>
    );
  });
  return (
    <div>
      {displayedManuscripts}

      {isWritersDeskView && (
        <ConfirmDialog
          title="Delete Manuscript?"
          open={deleteId !== null}
          setOpen={() => setDeleteId(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {circle_id && (
        <ConfirmDialog
          title="Unshare Manuscript?"
          children="Manuscript will be removed from circle dashboard."
          open={unshareManuscriptId !== null}
          setOpen={() => setUnshareManuscriptId(null)}
          onConfirm={() => handleUnshareButtonClick(unshareManuscriptId)}
        />
      )}
    </div>
  );
}
