import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ManuscriptListItem from "../../../../components/ManuscriptListItem";

function WritersDeskPage() {
  const user = useSelector((store) => store.user);
  const writersDeskManuscriptList = useSelector(
    (store) => store.writersDeskManuscriptList
  );

  const history = useHistory();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch({
      type: "FETCH_WRITERS_DESK_LIST",
    });
  }, []);

  //Stores Values of Title and Body inputs
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // Creates Manuscript Object with Title and Body and sends it to the database
  const handleSubmit = (e) => {
    e.preventDefault();

    const newManuscript = {
      title: newTitle,
      body: newBody,
      public: isChecked,
    };

    console.log("newManuscript", newManuscript);

    dispatch({
      type: "ADD_MANUSCRIPT",
      payload: newManuscript,
    });

    setNewTitle("");
    setNewBody("");
  };

  //Sets the Manuscript Reducer to currently clicked manusscript then sends user to writemanuscript page on cLick
  const handleEdit = (manuscript) => {
    dispatch({
      type: "SET_MANUSCRIPT",
      payload: manuscript,
    });
    history.push("/manuscript-write");
  };

  //Deletes Manuscript from Database
  const handleDelete = (id) => {
    console.log("clicked delete on", id);

    dispatch({
      type: "REMOVE_MANUSCRIPT",
      payload: id,
    });
  };

  return (
    <main className="content-main">
      <h1>Writers Desk Page</h1>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <br></br>

      {/* Manuscript Create Form */}
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

        <label> Public</label>
        <input
          onChange={(e) => setIsChecked(!isChecked)}
          type="checkbox"
          id="public"
          name="public"
          value="public"
          checked={isChecked}
        />

        <input className="submit-button" type="submit" />
      </form>

      <br></br>

      {/* List of Manuscripts Created by User */}
      {writersDeskManuscriptList?.map((manuscript) => {
        return (
          <div key={manuscript.id}>
            <br></br>
            <ManuscriptListItem manuscript={manuscript} />

            <button onClick={() => handleEdit(manuscript)}>Edit</button>

            <button onClick={() => handleDelete(manuscript.id)}>Delete</button>
          </div>
        );
      })}
    </main>
  );
}

export default WritersDeskPage;
