import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchUserList } from "../../../api/admin/user";
import Routes from "../../../constants/routes";
import { useNotification } from "../../../context/NotificationContext";
import { useAuth } from "../../../context/UserContext";
import { User } from "../../../types/user";
import UserListPresentational from "./UserListPresentational";

const UserList = () => {
  const [users, setUsers] = useState<User[]>();
  const { user } = useAuth();
  const {
    setNotificationMessage,
    setIsNotificationOpen,
    setNotificationSeverity,
  } = useNotification();
  const history = useHistory();

  if (!user.isAdmin && !user.isMintoriaStaff) {
    history.push(Routes.notFoundPage);
  }
  const getData = useCallback(async () => {
    try {
      const users = await fetchUserList(user.token);
      setUsers(users);
    } catch (e) {
      setNotificationMessage("Can't fetch data.");
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
    }
  }, [
    setIsNotificationOpen,
    setNotificationMessage,
    setNotificationSeverity,
    user.token,
  ]);

  useEffect(() => {
    getData();
  }, [getData]);

  return <>{users && <UserListPresentational users={users} />}</>;
};
export default UserList;
