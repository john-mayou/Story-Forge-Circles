import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function WriteManuscriptPage() {
  const history = useHistory();
  const manuscript = useSelector((store) => store.manuscript);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch({
      type: "FETCH_MANUSCRIPT",
      payload: params.id,
    });
  }, []);

  const [newTitle, setNewTitle] = useState(manuscript.title);
  const [newBody, setNewBody] = useState(manuscript.body);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newManuscript = {
      id: manuscript.id,
      title: newTitle,
      body: newBody,
      public: isChecked,
    };

    console.log("newManuscript", newManuscript);

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

          <input className="submit-button" type="submit" />
        </form>

        <button onClick={history.goBack}>Back</button>
        <h4>Comments</h4>
        <button>+Comment</button>
      </div>
    </main>
  );
}

export default WriteManuscriptPage;
