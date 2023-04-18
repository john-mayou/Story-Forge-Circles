import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ManuscriptListItem from "../../ManuscriptListItem";
import ConfirmDialog from "../../../../components/Dialogue/ConfirmDialog/ConfirmDialog";
import CreateManuscriptDialog from "../../../../components/Dialogue/CreateDialog/CreateManuscriptDialog";
import { Button } from "@mui/material";
import SearchForm from "../../../Search/SearchForm";
import Header from "../../../../layout/Header/Header";
import "../../ManuscriptStyling.css";

function WritersDeskPage() {
  const user = useSelector((store) => store.user);
  const writersDeskManuscriptList = useSelector(
    (store) => store.manuscripts.writersDeskManuscriptList
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
  const [deleteId, setDeleteId] = useState(null);

  const [createOpen, setCreateOpen] = useState(false);

  // Creates Manuscript Object with Title and Body and sends it to the database
  const handleSubmit = () => {
    const newManuscript = {
      title: newTitle,
      body: newBody,
      public: isChecked,
    };

    dispatch({
      type: "ADD_MANUSCRIPT",
      payload: newManuscript,
    });

    setNewTitle("");
    setNewBody("");
  };

  //Sets the Manuscript Reducer to currently clicked manusscript then sends user to writemanuscript page on cLick
  const handleEdit = (manuscript) => {
    history.push(`/manuscript-write/${manuscript.id}`);
  };

  //Deletes Manuscript from Database
  const handleDelete = (id) => {
    dispatch({
      type: "REMOVE_MANUSCRIPT",
      payload: id,
    });
  };

  const handleSearch = (searchTerm) => {
    history.push(
      `/search/manuscripts/writersDeskManuscriptList?term=${searchTerm}`
    );
  };

  return (
    <main className="content-main">
      <Header title={"My Shelf"} />
      <div align="center">
        <h2>Start Writing!</h2>
        <Button variant="contained" onClick={() => setCreateOpen(true)}>
          + New Manuscript
        </Button>
        <CreateManuscriptDialog
          title="Create Manuscript"
          open={createOpen}
          setOpen={setCreateOpen}
          inputOne={newTitle}
          setInputOne={setNewTitle}
          inputTwo={newBody}
          setInputTwo={setNewBody}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          onConfirm={() => handleSubmit()}
        ></CreateManuscriptDialog>

        <br></br>
        <br></br>
        <SearchForm onSearch={handleSearch} />
        <br></br>
      </div>

      {/* List of Manuscripts Created by User */}

      <div className="ManuscriptListHeader">
        <h1 className="headers"> Title</h1>
        <h1 className="headers"> Author</h1>
        <h1 className="headers"> Preview</h1>
      </div>

      {writersDeskManuscriptList?.map((manuscript) => {
        return (
          <div key={manuscript.id}>
              <br></br>
            <ManuscriptListItem manuscript={manuscript} />

            <div className="writersDesk-button-wrapper">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(manuscript)}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => setDeleteId(manuscript.id)}
              >
                Delete
              </Button>

              <ConfirmDialog
                title="Delete Manuscript?"
                open={deleteId === manuscript.id}
                setOpen={() => setDeleteId(null)}
                onConfirm={() => handleDelete(manuscript.id)}
              ></ConfirmDialog>
        
            </div>
          </div>
        );
      })}
    </main>
  );
}

export default WritersDeskPage;
