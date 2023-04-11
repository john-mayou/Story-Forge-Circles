import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ManuscriptListItem from "../../../../components/ManuscriptListItem";

function WritersDeskPage() {
  const user = useSelector((store) => store.user);
  const writersDeskManuscriptList = useSelector(
    (store) => store.writersDeskManuscriptList
  );
  const dispatch = useDispatch();

  const currentPage = 'WritersDeskPage';

  useEffect(() => {
    dispatch({
      type: "FETCH_WRITERS_DESK_LIST",
    });
  }, []);


  const handleDelete = (event) => {
    console.log('clicked delete on', event.target.getAttribute("dataID"));

  }


  return (
    <main className="content-main">
      <h1>Writers Desk Page</h1>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>



      {writersDeskManuscriptList?.map((manuscript) => {
        return (
          <>
            <div>
              <br></br>
              <ManuscriptListItem key={manuscript.id} currentPage={currentPage} manuscript={manuscript} />
              <button onClick={handleDelete} dataID={manuscript.id}>Delete</button>
            </div>
          </>
        );
      })}
    </main>
  );
}

export default WritersDeskPage;
