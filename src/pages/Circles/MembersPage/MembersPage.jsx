import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import Header from "../../../layout/Header/Header";

function MembersPage() {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const adminRemoveMember = async (memberId) => {
    await axios.delete(`/api/circles/${circleDetails.id}/members/remove`, {
      data: { user: memberId },
    });
    fetchMembers();
  };

  const userLeaveCircle = async (memberId) => {
    await axios.delete(`/api/circles/${circleDetails.id}/members/leave`);
    await history.push("/circles");
  };

  return (
    <main className="content-main">
      <Header title={`${circleDetails.name} Members`} />
      <div align="center">
        {userExitsError && <p>User doesnt exist... Try again</p>}
        <div>
          {/* if user is circle owner */}
          {user.id === circleDetails.owner_id ? (
            <>
              <Button
                variant="contained"
                color="primary"
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
              </Button>
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
              <Button
                variant="contained"
                color="primary"
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
              </Button>
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
            // only member in the circle is owner (self)
            circleMembers.length === 1 && (
              <button
                onClick={async () => {
                  await axios.delete(`/api/circles/close/${circleId}`);
                  await history.push("/circles");
                }}
              >
                Close Circle
              </button>
            )
          ) : (
            <Button color="error" onClick={() => userLeaveCircle(user.id)}>
              Leave Circle
            </Button>
          )}
        </div>

        {circleMembers.map((member) => {
          if (member.id === user.id) {
            return; // do not show self
          }

          return (
            <div key={member.id}>
              <span>
                {member.id} {member.username}{" "}
                {member.avatar_image || "null image"}
              </span>
              {user.id === circleDetails.owner_id && (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => adminRemoveMember(member.id)}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
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
                  </Button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default MembersPage;
