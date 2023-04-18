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

function ReadManuscriptPage({ manuscript_id }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const commentList = useSelector((store) => store.comments);
  const manuscript = useSelector(
    (store) => store.manuscripts.manuscriptDetails
  );

  useEffect(() => {
    dispatch({
      type: "FETCH_MANUSCRIPT",
      payload: params.id,
    });
  }, []);

  return (
    <main className="content-main">
      <Header title={`${manuscript.title} Manuscript`} />
      <Button variant="contained" color="secondary" onClick={history.goBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>

      <div align="center">
        <div className="manuscript">
          <h1>{manuscript.title}</h1>
          <h3>By: {manuscript.username}</h3>
          <p>{manuscript.body}</p>
        </div>
        <ManuscriptCommentThread />
      </div>
    </main>
  );
}

export default ReadManuscriptPage;
