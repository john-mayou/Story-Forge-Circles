import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import Header from "../../../../layout/Header/Header";

function WriteManuscriptPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id: manuscriptId } = useParams();

  useEffect(() => {
    fetchManuscriptDetails();
  }, []);

  const fetchManuscriptDetails = async () => {
    const response = await axios.get(`/manuscript/${manuscriptId}`);

    setNewTitle(response.data[0].title);
    setNewBody(response.data[0].body);
    setIsChecked(response.data[0].public);
  };

  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isValidSubmission, setIsValidSubmission] = useState({
    newTitle: true,
    newBody: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    if (!newTitle || !newBody) {
      setIsValidSubmission({ newTitle: !!newTitle, newBody: !!newBody });
      return;
    }

    const newManuscript = {
      id: manuscriptId,
      title: newTitle,
      body: newBody,
      public: isChecked,
    };

    dispatch({
      type: "UPDATE_MANUSCRIPT",
      payload: newManuscript,
    });

    history.push("/writers-desk");
  };

  return (
    <main className="content-main">
      <Header title={`Write Mode`} />
      <div align="center">
        <br></br>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            style={{
              border: !isValidSubmission.newTitle
                ? "2px solid red"
                : "2px solid gray",
            }}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          ></input>
          <br></br>
          <br></br>
          <textarea
            style={{
              border: !isValidSubmission.newBody
                ? "2px solid red"
                : "2px solid gray",
            }}
            className="manuscript-text-area"
            rows="25"
            cols="75"
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
          ></textarea>
          <br></br>

          <label> Public</label>
          <input
            onChange={(e) => setIsChecked(!isChecked)}
            type="checkbox"
            id="public"
            name="public"
            value="public"
            checked={isChecked}
          />
          <br></br>
          {Object.values(isValidSubmission).some((field) => !field) && (
            <p style={{ color: "red" }}>
              Please populate all fields to save manuscript.
            </p>
          )}

          <Button
            variant="contained"
            color="primary"
            className="submit-button"
            type="submit"
          >
            Save
          </Button>
        </form>
      </div>
    </main>
  );
}

export default WriteManuscriptPage;
