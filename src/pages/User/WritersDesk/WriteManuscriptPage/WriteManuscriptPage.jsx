import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

function WriteManuscriptPage() {
  const history = useHistory();
  const manuscript = useSelector(
    (store) => store.manuscripts.manuscriptDetails
  );
  const dispatch = useDispatch();
  const {id : manuscriptId} = useParams();

  useEffect(() => {
    fetchManuscriptDetails();
  }, []);

  const fetchManuscriptDetails = async () => {
    const response = await axios.get(`/manuscript/${manuscriptId}`);

    setNewTitle(response.data[0].title);
    setNewBody(response.data[0].body);
    setIsChecked(response.data[0].public);
  };

  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newManuscript =
      {
        id : manuscriptId,
        title : newTitle,
        body : newBody,
        public : isChecked,
      }

    dispatch({
      type: "UPDATE_MANUSCRIPT",
      payload: newManuscript,
    });

    history.push("/writers-desk");
  };

  return (
    <main className="content-main">
      <div align="center">
        <br></br>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          ></input>
          <br></br>
          <br></br>
          <textarea
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

        
        <Button variant="outlined" className="submit-button" type="submit" >Submit</Button>
        </form>

        <Button variant="outlined" onClick={history.goBack}>Back</Button>
        <h4>Comments</h4>
        <button>+Comment</button>
      </div>
    </main>
  );
}

export default WriteManuscriptPage;
