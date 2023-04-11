import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ManuscriptListItem from "../../../../components/ManuscriptListItem";
import { useHistory } from "react-router-dom";

function ReadingListPage() {
  const user = useSelector((store) => store.user);
  const publicManuscriptList = useSelector(
    (store) => store.publicManuscriptList
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const currentPage = 'ReadingListPage';

  useEffect(() => {
    dispatch({
      type: "FETCH_PUBLIC_MANUSCRIPT_LIST",
    });
  }, []);

  const goToManuscript = () => {
    history.push('/manuscript-read')
  };


  return (
    <main className="content-main">
      <h1>Reading List Page</h1>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      {publicManuscriptList?.map((manuscript) => {
        return (
          <>
            <br></br>
            <ManuscriptListItem key={manuscript.id} currentPage={currentPage} manuscript={manuscript} />
          </>
        );
      })}
      <button onClick={goToManuscript}>Manuscript</button>
    </main>
  );
}

export default ReadingListPage;
