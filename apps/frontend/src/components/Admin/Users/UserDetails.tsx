import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { fetchAdminUserDetails } from "../../../api/admin/user";
import { AdminUser } from "../../../types/user";
import UserDetailsPresentational from "./UserDetailsPresentational";
import { useNotification } from "../../../context/NotificationContext";
import { useAuth } from "../../../context/UserContext";
import Routes from "../../../constants/routes";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const history = useHistory();

  if (!user.isAdmin && !user.isMintoriaStaff) {
    history.push(Routes.notFoundPage);
  }

  const [artist, setArtist] = useState<AdminUser>();

  const {
    setNotificationMessage,
    setIsNotificationOpen,
    setNotificationSeverity,
  } = useNotification();

  const getData = useCallback(async () => {
    try {
      const artist = await fetchAdminUserDetails(parseInt(id, 10), user.token);
      setArtist(artist);
    } catch (e) {
      setNotificationMessage("Can't fetch data.");
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
    }
  }, [
    id,
    setIsNotificationOpen,
    setNotificationMessage,
    setNotificationSeverity,
    user.token,
  ]);

  useEffect(() => {
    getData();
  }, [getData]);

  return <>{artist && <UserDetailsPresentational user={artist} />}</>;
};
export default UserDetails;
