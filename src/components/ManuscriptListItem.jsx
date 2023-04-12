import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

/**
 *
 * @param {object} manuscript
 * @returns individual manuscript list objects to be displayed on various Manuscript list pages.
 */
function ManuscriptListItem(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  let preview = props.manuscript.body;

  if (props.manuscript.body.length > 100) {
    preview = props.manuscript.body.substring(0, 100);
  }

  const handleManuscriptClick = () => {
    console.log("in Handle Manuscript Click");
    console.log("currentPage is", props.currentPage);
    console.log("manuscript ID is", props.manuscript.id);

    switch (props.currentPage) {
      case "WritersDeskPage":
        dispatch({
          type: "SET_MANUSCRIPT",
          payload: props.manuscript
        });
        history.push("/manuscript-read");

        break;
      case "ReadingListPage":
        dispatch({
          type: "SET_MANUSCRIPT",
          payload: props.manuscript
        });

        history.push("/manuscript-read");
        break;
    }
  };

  return (
    <>
      <div className="ManuscriptListItem" onClick={handleManuscriptClick}>
        <h1>Title: {props.manuscript.title}</h1>
        <h3>Author: {props.manuscript.username}</h3>
        <p>Preview: {preview}...</p>
      </div>
    </>
  );
}

export default ManuscriptListItem;
