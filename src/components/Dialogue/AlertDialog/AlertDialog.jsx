import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { alpha } from '@mui/material';

/**
 *
 * @param {*} props
 * @title - This is what will show as the dialog title
 * @children - This is what will show in the dialog content. This can be a string, or it can be another, more complex component.
 * @open - A boolean that shows the dialog if true.
 * @setOpen - A state function that sets the state of @open which Toggles dialog to show or close. ()
 * @onConfirm -  This is a callback function to perform action when the user clicks Yes. (e.g. handleDelete, handleSubmit)
 */
const AlertDialog = (props) => {
  const { title, children, open, setOpen, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog"
      PaperProps={{
        style: {
          boxShadow: "none",
        },
      }}
      slotProps={{ backdrop: { style: { backgroundColor: alpha('rgba(0,0,0)', 0.10)  } } }}
    >
      <DialogTitle id="alert-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
