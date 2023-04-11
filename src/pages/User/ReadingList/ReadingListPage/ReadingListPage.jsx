import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ManuscriptListItem from "../../../../components/ManuscriptListItem";

function ReadingListPage() {
  const user = useSelector((store) => store.user);
  const publicManuscriptList = useSelector(
    (store) => store.publicManuscriptList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_PUBLIC_MANUSCRIPT_LIST",
    });
  }, []);

  return (
    <main className="content-main">
      <h1>Reading List Page</h1>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      {publicManuscriptList?.map((manuscript) => {
        return (
          <>
            <br></br>
            <ManuscriptListItem key={manuscript.id} manuscript={manuscript} />
          </>
        );
      })}
    </main>
  );
}

export default ReadingListPage;
