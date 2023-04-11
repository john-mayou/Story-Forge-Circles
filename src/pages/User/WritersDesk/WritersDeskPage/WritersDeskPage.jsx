import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ManuscriptListItem from "../../../../components/ManuscriptListItem";

function WritersDeskPage() {
  const user = useSelector((store) => store.user);
  const writersDeskManuscriptList = useSelector(
    (store) => store.writersDeskManuscriptList
  );
  const dispatch = useDispatch();
  const currentPage = "WritersDeskPage";

  useEffect(() => {
    dispatch({
      type: "FETCH_WRITERS_DESK_LIST",
    });
  }, []);

  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newManuscript = {
      title: newTitle,
      body: newBody,
    };

    console.log("newManuscript", newManuscript);

    dispatch({
      type: "ADD_MANUSCRIPT",
      payload: newManuscript,
    });

    setNewTitle("");
    setNewBody("");
  };

  const handleDelete = (id) => {
    console.log("clicked delete on", id);
  };

  return (
    <main className="content-main">
      <h1>Writers Desk Page</h1>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <br></br>

      <h2>New Manuscript:</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <label>Body:</label>
        <textarea
          rows="5"
          cols="40"
          placeholder="Body..."
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
        />

        <input className="submit-button" type="submit" />
      </form>

      <br></br>

      {writersDeskManuscriptList?.map((manuscript) => {
        return (

            <div key={manuscript.id}>
              <br></br>
              <ManuscriptListItem
                currentPage={currentPage}
                manuscript={manuscript}
              />
              <button onClick={() => handleDelete(manuscript.id)}>
                Delete
              </button>
            </div>
        );
      })}
    </main>
  );
}

export default WritersDeskPage;
