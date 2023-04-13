import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

function MembersPage() {
  const { id: circleId } = useParams();
  const user = useSelector((store) => store.user);

  // Local State
  const [circleMembers, setCircleMembers] = useState([]);
  const fakeCircle = {
    id: 1,
    name: "circleName",
    description: "description",
    owner_id: 1,
  };

  useEffect(() => {
    fetchCircles();
  }, []);

  const fetchCircles = async () => {
    const circlesResponse = await axios.get(`/api/circles/${circleId}/members`);
    setCircleMembers(circlesResponse.data);
  };

  return (
    <main className="content-main">
      <h1>Members Page</h1>
      <h2>Circle Id: {circleId}</h2>
      <div>
        {/* if user is circle owner */}
        {user.id === fakeCircle.owner_id ? (
          <button>Add Member</button>
        ) : (
          <button>Invite Member</button>
        )}
        {/* if user circle owner */}
        {user.id === fakeCircle.owner_id ? (
          // and there are no members in the circle
          circleMembers.length === 0 && <button>Close Circle</button>
        ) : (
          <button>Leave Circle</button>
        )}
      </div>

      {circleMembers.map((member) => {
        return (
          <div key={member.id}>
            <p>{member.id}</p>
            <p>{member.username}</p>
            <p>{member.avatar_image || "null image"}</p>
          </div>
        );
      })}
    </main>
  );
}

export default MembersPage;
