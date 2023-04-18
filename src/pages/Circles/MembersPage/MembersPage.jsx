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
  const [newMember, setNewMember] = useState("");
  const [userExitsError, setUserExistsError] = useState(false);
  const [circleDetails, setCircleDetails] = useState([]);

  useEffect(() => {
    fetchMembers();
    fetchCircleDetails();
  }, []);

  const fetchCircleDetails = async () => {
    const circleDetailsResult = await axios.get(
      `api/circles/details/${circleId}`
    );
    setCircleDetails(circleDetailsResult.data[0]);
  };

  const fetchMembers = async () => {
    const circlesResponse = await axios.get(`/api/circles/${circleId}/members`);
    setCircleMembers(circlesResponse.data);
  };

  const removeMember = async (memberId) => {
    await axios.delete(`/api/circles/${circleDetails.id}/members`, {
      data: { user: memberId },
    });
    fetchMembers();
  };

  return (
    <main className="content-main">
      <h1>Members Page</h1>
      {userExitsError && <p>User doesnt exist... Try again</p>}
      <h2>Circle Id: {circleId}</h2>
      <div>
        {/* if user is circle owner */}
        {user.id === circleDetails.owner_id ? (
          <>
            <button
              onClick={async () => {
                if (!newMember) {
                  return;
                }

                const userExistsResult = await axios.get(
                  `/api/notification/user-exists/${newMember}`
                );

                if (userExistsResult.data.length) {
                  dispatch({
                    type: "CREATE_NEW_NOTIFICATION",
                    payload: {
                      circle_id: circleDetails.id,
                      recipient_id: userExistsResult.data[0].id,
                      type: "leader invite member - user action",
                    },
                  });
                } else {
                  setUserExistsError(true);
                }
              }}
            >
              Add Member
            </button>
            <input
              type="text"
              value={newMember}
              onChange={(e) => {
                setNewMember(e.target.value);
              }}
            />
          </>
        ) : (
          <>
            <button
              onClick={async () => {
                if (!newMember) {
                  return;
                }

                const userExistsResult = await axios.get(
                  `/api/notification/user-exists/${newMember}`
                );

                if (userExistsResult.data.length) {
                  dispatch({
                    type: "CREATE_NEW_NOTIFICATION",
                    payload: {
                      circle_id: circleDetails.id,
                      recipient_id: circleDetails.owner_id,
                      type: "member nomination - leader action",
                      new_nomination: userExistsResult.data[0].id,
                    },
                  });
                } else {
                  setUserExistsError(true);
                }
              }}
            >
              Invite Member
            </button>
            <input
              type="text"
              value={newMember}
              onChange={(e) => {
                setNewMember(e.target.value);
              }}
            />
          </>
        )}
        {/* if user circle owner */}
        {user.id === circleDetails.owner_id ? (
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
            {user.id === circleDetails.owner_id && (
              <>
                <button onClick={() => removeMember(member.id)}>Remove</button>
                <button
                  onClick={() =>
                    dispatch({
                      type: "CREATE_NEW_NOTIFICATION",
                      payload: {
                        circle_id: circleDetails.id,
                        recipient_id: member.id,
                        type: "leader nominate leader - user action",
                      },
                    })
                  }
                >
                  Promote To Leader
                </button>
              </>
            )}
          </div>
        );
      })}
    </main>
  );
}

export default MembersPage;