import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateManuscriptDialog from "../../../../components/Dialogue/CreateDialog/CreateManuscriptDialog";
import { Button } from "@mui/material";
import Header from "../../../../layout/Header/Header";
import ManuscriptList from "../../../../components/ManuscriptList";
import SearchBar from "../../../../components/SearchBar";
import { searchKeySelector } from "../../../../utils/searchUtils";
import useSearch from "../../../../hooks/useSearch";
import '../../../PageStyling.css'

function WritersDeskPage() {
  const writersDeskManuscriptList = useSelector(
    (store) => store.manuscripts.writersDeskManuscriptList
  );

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

  const { filteredData, searchTerm, setSearchTerm } = useSearch(
    writersDeskManuscriptList,
    searchKeySelector
  );

  return (
    <main className="content-main">
      <Header title={"My Shelf"} />
      <div className="sub-header-wrapper" align="center">
        <div>
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
        </div>
        <div>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {/* List of Manuscripts Created by User */}
      <ManuscriptList manuscripts={filteredData} isWritersDeskView={true} />
    </main>
  );
}

export default WritersDeskPage;
