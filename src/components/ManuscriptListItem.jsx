import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

/**
 *
 * @param {object} manuscript
 * @returns individual manuscript list objects to be displayed on various Manuscript list pages.
 */
function ManuscriptListItem(props) {
  let preview = props.manuscript.body;

  if (props.manuscript.body.length > 100) {
    preview = props.manuscript.body.substring(0, 100);
  }

  const handleManuscriptClick = () => {
    console.log('in Handle Manuscript Click');
    console.log('currentPage is', props.currentPage);
    console.log('manuscript ID is', props.manuscript.id);


  }

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
