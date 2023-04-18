import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ManuscriptCommentThread from "../../../ManuscriptCommentFiles/ManuscriptCommentThread/ManuscriptCommentThread";
// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import "../../ManuscriptStyling.css";

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
  }, []);

  return (
    <main className="content-main">
      <Button variant="contained" color="secondary" onClick={history.goBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>

      <div align="center">
        <div className="manuscript">
          <h1>{manuscript.title}</h1>
          <h3>By: {manuscript.username}</h3>
          <p>{manuscript.body}</p>
        </div>

        <Button variant="contained" color="primary">
          <FontAwesomeIcon icon={faPlus} size="sm" /> Comment
        </Button>
        {/* <ManuscriptCommentThread /> */}
      </div>
    </main>
  );
}

export default ReadManuscriptPage;
