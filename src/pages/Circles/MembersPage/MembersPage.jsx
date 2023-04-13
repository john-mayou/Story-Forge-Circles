import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function MembersPage() {
  const dispatch = useDispatch();
  const { id: circleId } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_CIRCLE_MEMBERS", payload: circleId });
  }, []);

  return (
    <main className="content-main">
      <h1>Members Page</h1>
      <h2>Circle Id: {circleId}</h2>
    </main>
  );
}

export default MembersPage;
