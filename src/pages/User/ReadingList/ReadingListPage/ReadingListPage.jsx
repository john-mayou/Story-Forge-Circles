import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ManuscriptListItem from "../../../../components/ManuscriptListItem";
import { useHistory } from "react-router-dom";


function ReadingListPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const publicManuscriptList = useSelector(
    (store) => store.manuscripts.publicManuscriptList
  );

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

      {/* Displays list of publically shared Manuscripts to page */}
      {publicManuscriptList?.map((manuscript) => {
        return (
          <div key={manuscript.id}>
            <br></br>
            <ManuscriptListItem manuscript={manuscript} />
          </div>
        );
      })}

    </main>
  );
}

export default ReadingListPage;
