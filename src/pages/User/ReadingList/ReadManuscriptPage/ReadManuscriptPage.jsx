import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ManuscriptCommentThread from "../../../ManuscriptCommentFiles/ManuscriptCommentThread/ManuscriptCommentThread";
import "../../ManuscriptStyling.css";
import Header from "../../../../layout/Header/Header";

function ReadManuscriptPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const manuscript = useSelector(
    (store) => store.manuscripts.manuscriptDetails
  );

  useEffect(() => {
    dispatch({
      type: "FETCH_MANUSCRIPT",
      payload: params.id,
    });
  }, []);

  useEffect(() => {
    if (manuscript.id) {
      // fetch all base comments on page load
      dispatch({
        type: "FETCH_BASE_COMMENTS",
        payload: manuscript.id
      });
    }
  },[manuscript])

console.log(manuscript)
  return (
    <main className="content-main">
      <Header title={`Read Mode`} />
      <div align="center">
        <div className="manuscript">
          <h1>{manuscript.title}</h1>
          <h3>By: {manuscript.username}</h3>
          <p>{manuscript.body}</p>
        </div>
        <ManuscriptCommentThread manuscript_id={params.id} />
      </div>
    </main>
  );
}

export default ReadManuscriptPage;
