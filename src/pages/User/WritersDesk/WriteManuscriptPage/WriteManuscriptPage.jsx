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
      <Header title={`Write`} />
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
            onClick={(e) => {
              console.log("clicked");
              setNewTitle("`Twas A Starry Knight");
              setNewBody(`Knight errant In the name of my lady! I shall vanquish your blight! And gain her affection ere the mornings first light. For Juliet! For Charlotte! For Anna and Ann. Oh my lady, my lady, where fore art Gamesome. Where fire art sceptered to give your heart to me. Curious how thy mind is bent. And thy knight rode on. Thyne armor shone bright, In the moonlight's glow. In thoust living dream, memories lament. A willow tree. On a dune. Sway, Sway in thy brese. Sway Sway in thy dream. Oh Time. Oh Time. When to stop, When to find, and wonder why. Who hath heard the cry. Time slips to thy other side. And the knight rode on. Thyne armor shone bright, In the moonlight's glow. A silver knight, with a helmet of steel, and a sword of fire. A starry knight, with a helmet of gold, and a sword of light.Thy two knights who ride side by side. Fly among thy heavens, free thyne bonds of gravity!`);
            }}
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
