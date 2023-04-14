import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';

function ReadManuscriptPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
//   const [comment, setComment] = useState('');
  const manuscript = useSelector((store) => store.manuscripts.manuscriptDetails);

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
                {/* <div className="comments-container" align="center">
                    <input
                        type="text"
                        value={Comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="add comment"
                        style={{ width: "80%", marginRight: "1rem" }}
                    />
                    <button onClick>Add</button>
                </div> */}
    </main>
  );
}

export default ReadManuscriptPage;
