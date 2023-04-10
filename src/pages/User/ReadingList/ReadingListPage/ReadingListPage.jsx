import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ReadingListPage() {
  const user = useSelector((store) => store.user);
  const publicManuscriptList = useSelector((store) => store.manuscriptList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_MANUSCRIPT_LIST",
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
            <h1>{manuscript.title}</h1>
            <p>{manuscript.body}</p>
          </>
        );
      })}
    </main>
  );
}

export default ReadingListPage;
