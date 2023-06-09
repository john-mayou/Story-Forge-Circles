import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Header from "../../../layout/Header/Header";
import Snackbar from "@mui/material/Snackbar";
import Portal from "@mui/material/Portal";
import ConfirmDialog from "../../../components/Dialogue/ConfirmDialog/ConfirmDialog";
import "../../../assets/styles/global/SnackBarStyling.css";

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
  const [poputTitle, setPopupTitle] = useState("");
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
    setPopupTitle(
      `Are you sure you want to promote ${member.username} to leader?`
    );
  };

  const memberLeaveCircle = (circle_id) => {
    setPopupAttributes({
      open: true,
      setOpen: () => setPopupAttributes({ open: false }),
      onConfirm: async () => {
        await axios.delete(`/api/circles/${circle_id}/members/remove`);
        await history.push("/circles");
        dispatch({ type: "FETCH_USER" });
      },
    });
    setPopupTitle(`Are you sure you want to leave this circle?`);
  };

  const leaderRemoveMember = (circle_id, member) => {
    setPopupAttributes({
      open: true,
      setOpen: () => setPopupAttributes({ open: false }),
      onConfirm: async () => {
        await axios.delete(`/api/circles/${circle_id}/members/remove`, {
          data: { user: member.id },
        });
        fetchMembers();
      },
    });
    setPopupTitle(
      `Are you sure you want to remove ${member.username} from this circle?`
    );
  };

  const leaderCloseCircle = () => {
    setPopupAttributes({
      open: true,
      setOpen: () => setPopupAttributes({ open: false }),
      onConfirm: async () => {
        await axios.delete(`/api/circles/close/${circleId}`);
        await history.push("/circles");
        dispatch({ type: "FETCH_USER" });
      },
    });
    setPopupTitle(`Are you sure you want to close this circle?`);
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
      <Header title={`Members`} />
      <div className="sub-header-wrapper" align="center">
        {userExitsError && <p>User doesnt exist... Try again</p>}
        <div className="inline-flex-wrapper">
          {/* if user is circle owner */}
          {user.id === circleDetails.owner_id ? (
            <div className="inline-flex-wrapper">
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
            </div>
          ) : (
            <div className="inline-flex-wrapper">
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
            </div>
          )}
          {/* if user circle owner */}
          {user.id === circleDetails.owner_id ? (
            // only member in the circle is owner (self)
            circleMembers.length === 1 && (
              <Button color="error" onClick={() => leaderCloseCircle(circleId)}>
                Close Circle
              </Button>
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
            <div className="inline-flex-wrapper" key={member.id}>
              <span>
                {/* {member.id}  */}
                <p>{member.username} </p>
                {/* {member.avatar_image || "null image"} */}
              </span>
              {user.id === circleDetails.owner_id && (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => leaderRemoveMember(circleId, member)}
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
        title={poputTitle}
        open={popupAttributes.open}
        setOpen={popupAttributes.setOpen}
        onConfirm={popupAttributes.onConfirm}
      ></ConfirmDialog>
      <Portal>
        <Snackbar
          message={successMessage}
          autoHideDuration={6000}
          open={successOpen}
          onClose={() => setSuccessOpen(false)}
        />
      </Portal>
    </main>
  );
}

export default MembersPage;
