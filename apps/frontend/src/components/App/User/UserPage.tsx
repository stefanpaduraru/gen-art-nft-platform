import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserPresentational from "./UserPresentational";
import EditBio from "./EditBio";
import { fetchUserDetails, updateUserBio } from "../../../api/app/user";
import { ExtendedUser } from "../../../types/user";
import { useNotification } from "../../../context/NotificationContext";
import MetaTags from "../../Common/MetaTags";
import getLogoURL from "../../../util/logo";

function ProjectDetails() {
  const { address } = useParams<{ address: string }>();
  const [user, setUser] = useState<ExtendedUser>();
  const [showEditBio, setShowEditBio] = useState(false);
  const {
    setNotificationMessage,
    setIsNotificationOpen,
    setNotificationSeverity,
  } = useNotification();

  const getUserDetails = useCallback(async () => {
    const user = await fetchUserDetails(address);
    setUser(user);
  }, [address]);

  const submitCallback = async (
    user: ExtendedUser,
    name: string,
    bio?: string
  ) => {
    try {
      await updateUserBio(address, name, bio);
      setNotificationMessage("Profile updated");
      setNotificationSeverity("success");
      setIsNotificationOpen(true);
      getUserDetails();
    } catch (e) {
      setNotificationMessage("Error updating your profile");
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  return (
    <>
      {user && (
        <MetaTags
          title={`Artist ${user.name}`}
          imageURL={getLogoURL()}
          pageURL={`/user/${user.address}`}
          description={`Artist ${user.name} - ${user.bio}`}
        />
      )}
      {user && (
        <UserPresentational
          user={user}
          editCalllback={() => setShowEditBio(true)}
        />
      )}
      {user && showEditBio && (
        <EditBio
          user={user}
          handleClose={() => setShowEditBio(false)}
          submitCallback={submitCallback}
        />
      )}
    </>
  );
}

export default ProjectDetails;
