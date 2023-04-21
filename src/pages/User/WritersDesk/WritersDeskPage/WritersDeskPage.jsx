import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CreateManuscriptDialog from "../../../../components/Dialogue/CreateDialog/CreateManuscriptDialog";
import { Button } from "@mui/material";
import SearchForm from "../../../Search/SearchForm";
import Header from "../../../../layout/Header/Header";
import "../../ManuscriptStyling.css";
import ManuscriptList from "../../../../components/ManuscriptList";

function WritersDeskPage() {
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
        <SearchForm onSearch={handleSearch} />
      </div>

      {/* List of Manuscripts Created by User */}
      <ManuscriptList manuscripts={writersDeskManuscriptList} isWritersDeskView={true}/>

    </main>
  );
}

export default WritersDeskPage;
