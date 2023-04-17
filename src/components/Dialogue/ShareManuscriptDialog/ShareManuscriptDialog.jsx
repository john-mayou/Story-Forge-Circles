import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "./ShareManuscriptDialog.css";

export default function ShareManuscriptDialog({
  open,
  setOpen,
  manuscripts,
  onShare,
}) {
  const [selectedManuscriptsId, setSelectedManuscriptsId] = useState([]);

  const handleCheckboxChange = (e) => {
    const manuscriptId = e.target.id.split("-")[1];
    if (e.target.checked) {
      setSelectedManuscriptsId((prevState) => [...prevState, manuscriptId]);
    } else {
      setSelectedManuscriptsId((prevState) =>
        prevState.filter((id) => id !== manuscriptId)
      );
    }
  };

  const handleShareClick = () => {
    onShare(selectedManuscriptsId);
    setSelectedManuscriptsId([]);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="create-dialog"
    >
      <DialogTitle id="share-dialog">Publish to Circle</DialogTitle>
      <DialogContent>
        <DialogContentText>Select Manuscript to Share:</DialogContentText>
        <ul className="manuscript-checkboxes">
          {manuscripts.map((manuscript) => (
            <li key={manuscript.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    id={`manuscript-${manuscript.id}`}
                    onChange={handleCheckboxChange}
                  />
                }
                label={manuscript.title}
              />
            </li>
          ))}
        </ul>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="outlined" onClick={handleShareClick}>Share</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
