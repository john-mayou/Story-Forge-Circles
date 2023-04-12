import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function WriteManuscriptPage() {
  const history = useHistory();
  const manuscript = useSelector((store) => store.manuscript);

  return (
    <main className="content-main">
      <div align="center">
        
        <br></br>
        <label>Title</label>
        <input placeholder = {manuscript.title}></input>
        <br></br>
        <label>Author</label>
        <input placeholder = {manuscript.username}></input>
        <br></br>
        <textarea width='100%' placeholder = {manuscript.body}></textarea>
        <br></br>

        <button onClick={history.goBack}>Back</button>
        <h4>Comments</h4>
        <button>+Comment</button>
      </div>
    </main>
  );
}

export default WriteManuscriptPage;
