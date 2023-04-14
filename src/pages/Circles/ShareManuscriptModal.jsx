import React, { useState } from "react";

export default function ShareManuscriptModal({
  manuscripts,
  closeModal,
  onShare,
}) {
  const [selectedManuscriptsId, setSelectedManuscriptsId] = useState([]);

  const handleCheckboxChange = (e) => {
    const manuscriptId = e.target.id.split("-")[1];
    if (e.target.checked) {
      setSelectedManuscriptsId((prevState) => [...prevState, manuscriptId]);
    } else {
      setSelectedManuscriptsId((prevState) =>
        prevState.filter((id) => id !== manuscriptId)
      );
    }
  };

  const handleShareClick = () => {
    onShare(selectedManuscriptsId);
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>Select Manuscript to Share:</h2>
        <ul>
          {manuscripts.map((manuscript) => (
            <li key={manuscript.id}>
              <input
                type="checkbox"
                id={`manuscript-${manuscript.id}`}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={`manuscript-${manuscript.id}`}>
                {manuscript.title}
              </label>
            </li>
          ))}
        </ul>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
          <button className="submit-button" onClick={handleShareClick}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}