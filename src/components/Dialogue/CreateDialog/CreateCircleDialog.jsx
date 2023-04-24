import React from "react";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  TextareaAutosize,
  Checkbox,
  FormControlLabel,
} from "@mui/material";


/**
 *
 * @param {*} props
 * @title - This is what will show as the dialog title
 * @children - This is what will show in the dialog content. This can be a string, or it can be another, more complex component.
 * @open - A boolean that shows the dialog if true.
 * @setOpen - A state function that sets the state of @open which Toggles dialog to show or close.
 * @inputOne - User input State variable Storing text from first text input.
 * @setInputOne - Sets state of input one as users input text
 * @inputTwo - User input state variable storing text from second text input.
 * @setInputTwo - Sets state of input two as users input text
 * @onConfirm -  This is a callback function to perform action when the user clicks Yes. (e.g. handleDelete, handleSubmit)
 */

const CreateCircleDialog = (props) => {
  const {
    title,
    children,
    open,
    setOpen,
    inputOne,
    setInputOne,
    inputTwo,
    setInputTwo,
    onConfirm,
  } = props;

  const [inputOneValid, setInputOneValid] = useState(true);
  const [inputTwoValid, setInputTwoValid] = useState(true);

  const handleConfirm = () => {
    // Validate input fields
    if (!inputOne) {
      setInputOneValid(false);
    }
    if (!inputTwo) {
      setInputTwoValid(false);
    }
    if (inputOne && inputTwo) {
      onConfirm();
      handleClose();
    }
  };

  const handleClose = () => {
    setInputOneValid(true);
    setInputTwoValid(true);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-dialog"
      onClick={() => {
        setInputOne(`Sci-Fi Fantasy`);
        setInputTwo(`Transport us to a magical world! 🪄🛸`);
      }}
    >
      <DialogTitle id="create-dialog">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="Name"
          label="Name"
          type="text"
          required
          placeholder="My Circle name..."
          value={inputOne}
          onChange={(e) => {
            setInputOne(e.target.value);
            setInputOneValid(true); // mark input as valid again when user types
          }}
          fullWidth
          error={!inputOneValid} // show error if input is invalid
          helperText={!inputOneValid && "Please enter a circle name."} // error message
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          required
          placeholder="My Writing Circle is for..."
          value={inputTwo}
          onChange={(e) => {
            setInputTwo(e.target.value);
            setInputTwoValid(true); // mark input as valid again when user types
          }}
          fullWidth
          error={!inputTwoValid} // show error if input is invalid
          helperText={!inputTwoValid && "Please enter a circle description."} // error message
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleConfirm}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCircleDialog;
