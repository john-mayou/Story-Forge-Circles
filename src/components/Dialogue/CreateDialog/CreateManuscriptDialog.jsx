import React, { useState } from "react";
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
 * @isChecked - Public Boolean on manuscript determines if manuscript is publically visible
 * @setIsChecked - Sets isChecked
 * @onConfirm -  This is a callback function to perform action when the user clicks Yes. (e.g. handleDelete, handleSubmit)
 */

const CreateManuscriptDialog = (props) => {
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
    isChecked,
    setIsChecked,
  } = props;

  const [isValidSubmission, setIsValidSubmission] = useState({
    inputOne: true,
    inputTwo: true,
  });

  const cancelSubmission = () => {
    setOpen(false);
    setInputOne("");
    setInputTwo("");
    setIsChecked(false);
    setIsValidSubmission({
      inputOne: true,
      inputTwo: true,
    });
  };

  const handleSubmitNewManuscript = () => {
    if (inputOne && inputTwo) {
      setOpen(false);
      setIsValidSubmission({
        inputOne: true,
        inputTwo: true,
      });
      onConfirm();
    } else {
      setIsValidSubmission({ inputOne: !!inputOne, inputTwo: !!inputTwo });
    }
  };

  return (
    <Dialog 
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="create-dialog"
    >
      <DialogTitle id="create-dialog">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
        <TextField
          style={{
            border: !isValidSubmission.inputOne
              ? "2px solid red"
              : "2px solid gray",
          }}
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          value={inputOne}
          onChange={(e) => {
            setInputOne(e.target.value);
          }}
          fullwidth="true"
        />
        <TextareaAutosize
          minRows={20}
          style={{
            width: "100%",
            border: !isValidSubmission.inputTwo
              ? "2px solid red"
              : "2px solid gray",
          }}
          autoFocus
          margin="dense"
          id="description"
          label="description"
          type="text"
          placeholder="It was a dark and stormy night..."
          value={inputTwo}
          onChange={(e) => {
            setInputTwo(e.target.value);
          }}
          fullwidth="true"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
          }
          label="Public"
        />
        {Object.values(isValidSubmission).some((field) => !field) && (
          <p style={{ color: "red" }}>
            Please populate all fields for submission.
          </p>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={cancelSubmission}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmitNewManuscript}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateManuscriptDialog;
