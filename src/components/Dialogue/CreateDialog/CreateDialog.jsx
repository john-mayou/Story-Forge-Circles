import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@mui/material";

/**
 *
 * @param {*} props
 * @title - This is what will show as the dialog title
 * @children - This is what will show in the dialog content. This can be a string, or it can be another, more complex component.
 * @open - A boolean that shows the dialog if true.
 * @setOpen - A state function that sets the state of @open which Toggles dialog to show or close. ()
 * @onConfirm -  This is a callback function to perform action when the user clicks Yes. (e.g. handleDelete, handleSubmit)
 */
const ConfirmDialog = (props) => {
  const { title, children, open, setOpen, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="description"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="description"
            type="text"
            fullWidth
          />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
