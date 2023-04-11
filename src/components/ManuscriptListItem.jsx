import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

/**
 *
 * @param {object} manuscript
 * @returns individual manuscript list objects to be displayed on various Manuscript list pages.
 */
function ManuscriptListItem(item) {
  let preview = item.manuscript.body;

  if (item.manuscript.body.length > 100) {
    preview = item.manuscript.body.substring(0, 100);
  }

  const handleManuscriptClick = () => {
    console.log('clicked Handle Manuscript Click');

  }

  return (
    <>
      <div className="ManuscriptListItem" onClick={handleManuscriptClick}>
        <h1>Title: {item.manuscript.title}</h1>
        <h3>Author: {item.manuscript.username}</h3>
        <p>Preview: {preview}...</p>
      </div>
    </>
  );
}

export default ManuscriptListItem;
