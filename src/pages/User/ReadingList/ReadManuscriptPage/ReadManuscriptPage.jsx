import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ManuscriptCommentThread from "../../../ManuscriptCommentFiles/ManuscriptCommentThread/ManuscriptCommentThread";
// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import "../../ManuscriptStyling.css";
import Header from "../../../../layout/Header/Header";

function ReadManuscriptPage() {
  const history = useHistory();
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
    // fetch all base comments on page load
    dispatch({
      type: "FETCH_BASE_COMMENTS",
    });
  }, []);


  return (
    <main className="content-main">
      <Header title={`Read Mode`} />
      <Button variant="contained" color="secondary" onClick={history.goBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>

      <div align="center">
        <div className="manuscript">
          <h1>{manuscript.title}</h1>
          <h3>By: {manuscript.username}</h3>
          <p>{manuscript.body}</p>
        </div>
        <ManuscriptCommentThread manuscript_id={params.id}/>
      </div>
    </main>
  );
}

export default ReadManuscriptPage;
