import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Header from "../../../layout/Header/Header";
import Snackbar from "@mui/material/Snackbar";
import ConfirmDialog from "../../../components/Dialogue/ConfirmDialog/ConfirmDialog";

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

  // Local State Popups and Confirmation Dialogs
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [popupAttributes, setPopupAttributes] = useState({
    open: false,
  });

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

  const promoteToLeader = (circle_id, member) => {
    setPopupAttributes({
      title: `Are you sure you want to promote ${member.username} to leader?`,
      children: "You will no longer be the leader of this circle.",
      open: true,
      setOpen: () => setPopupAttributes({ open: false }),
      onConfirm: () =>
        dispatch({
          type: "CREATE_NEW_NOTIFICATION",
          payload: {
            circle_id,
            recipient_id: member.id,
            type: "leader nominate leader - user action",
          },
        }),
    });
  };

  const memberLeaveCircle = async (circle_id) => {
    setPopupAttributes({
      title: `Are you sure you want to leave this circle?`,
      children:
        "You will no longer be able to see manuscripts and messages from this circle.",
      open: true,
      setOpen: () => setPopupAttributes({ open: false }),
      onConfirm: async () => {
        await axios.delete(`/api/circles/${circle_id}/members/remove`);
        await history.push("/circles");
        dispatch({ type: "FETCH_USER" });
      },
    });
  };

  const inviteNewMember = async (initiator) => {
    if (!newMember) {
      return;
    }
    const userExistsResult = await axios.get(
      `/api/notification/user-exists/${newMember}`
    );

    let payload;
    let successMessage;
    if (initiator === "leader") {
      payload = {
        circle_id: circleDetails.id,
        recipient_id: userExistsResult.data[0].id,
        type: "leader invite member - user action",
      };
      successMessage = "Successfully sent invitation to new member";
    } else if (initiator === "member") {
      payload = {
        circle_id: circleDetails.id,
        recipient_id: circleDetails.owner_id,
        type: "member nomination - leader action",
        new_nomination: userExistsResult.data[0].id,
      };
      successMessage = "Successfully sent nomination to circle leader";
    } else {
      console.log("Invalid initiator for sending user invite");
    }

    if (userExistsResult.data.length) {
      dispatch({
        type: "CREATE_NEW_NOTIFICATION",
        payload: payload,
      });
      setSuccessMessage(successMessage);
      setSuccessOpen(true);
      setNewMember("");
    } else {
      setUserExistsError(true);
    }
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
                onClick={() => inviteNewMember("leader")}
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
                onClick={() => inviteNewMember("member")}
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
                  dispatch({ type: "FETCH_USER" });
                  history.push("/circles");
                }}
              >
                Close Circle
              </button>
            )
          ) : (
            <Button color="error" onClick={() => memberLeaveCircle(circleId)}>
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
                    onClick={async () => {
                      await axios.delete(
                        `/api/circles/${circleDetails.id}/members/remove`,
                        {
                          data: { user: member.id },
                        }
                      );
                      fetchMembers();
                    }}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => promoteToLeader(circleDetails.id, member)}
                  >
                    Promote To Leader
                  </Button>
                </>
              )}
            </div>
          );
        })}
      </div>
      <ConfirmDialog
        title={popupAttributes.title}
        children={popupAttributes.description}
        open={popupAttributes.open}
        setOpen={popupAttributes.setOpen}
        onConfirm={popupAttributes.onConfirm}
      ></ConfirmDialog>
      <Snackbar
        message={successMessage}
        autoHideDuration={6000}
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
      />
    </main>
  );
}

export default MembersPage;
