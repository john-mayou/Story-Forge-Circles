import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import './ManuscriptStyling.css'

/**
 *
 * @param {object} manuscript
 * @returns individual manuscript list objects to be displayed on various Manuscript list pages.
 */
function ManuscriptListItem(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  let preview = props.manuscript.body;

  if (props.manuscript.body.length > 200) {
    preview = props.manuscript.body.substring(0, 200);
    preview = preview + '...';
  }

  const handleManuscriptClick = () => {
        history.push(`/manuscript-read/${props.manuscript.id}`);
  };

  return (
    <>
      <div className="ManuscriptListItem" onClick={handleManuscriptClick}>
        <h1 className="title"> {props.manuscript.title}</h1>
        <h3 className="author"> {props.manuscript.username}</h3>
        <p className="preview"> {preview}</p>
      </div>
    </>
  );
}

export default ManuscriptListItem;
