import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

function MembersPage() {
  const dispatch = useDispatch();
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
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const circlesResponse = await axios.get(`/api/circles/${circleId}/members`);
    setCircleMembers(circlesResponse.data);
  };

  const removeMember = async (memberId) => {
    await axios.delete(`/api/circles/${fakeCircle.id}/members`, {
      data: { user: memberId },
    });
    fetchMembers();
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
            {user.id === fakeCircle.owner_id && (
              <>
                <button onClick={() => removeMember(member.id)}>Remove</button>
                <button>Promote To Leader</button>
              </>
            )}
          </div>
        );
      })}
    </main>
  );
}

export default MembersPage;
