import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';

function ReadManuscriptPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  const manuscript = useSelector((store) => store.manuscript);

  useEffect(() => {
    dispatch({
        type: "FETCH_MANUSCRIPT",
        payload: params.id,
      })
}, []);

  return (
    <main className="content-main">
      <div align="center">
        
        <h1>{manuscript.title}</h1>
        <h3>By: {manuscript.username}</h3>
        <p>{manuscript.body}</p>

        <button onClick={history.goBack}>Back</button>
        <h4>Comments</h4>
        <button>+Comment</button>
      </div>
    </main>
  );
}

export default ReadManuscriptPage;
