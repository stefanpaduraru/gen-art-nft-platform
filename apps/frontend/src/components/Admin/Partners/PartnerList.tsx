import React, { useCallback, useEffect, useState } from "react";
import { fetchPartnerList } from "../../../api/admin/partner";
import { Partner } from "../../../types/partner";
import PartnerListPresentational from "./PartnerListPresentational";
import { useNotification } from "../../../context/NotificationContext";
import { useAuth } from "../../../context/UserContext";
import { useHistory } from "react-router-dom";
import Routes from "../../../constants/routes";

const PartnerList = () => {
  const [partners, setPartners] = useState<Partner[]>();
  const { user } = useAuth();
  const history = useHistory();

  if (!user.isAdmin && !user.isMintoriaStaff) {
    history.push(Routes.notFoundPage);
  }

  const {
    setNotificationMessage,
    setIsNotificationOpen,
    setNotificationSeverity,
  } = useNotification();

  const getPartnerList = useCallback(async () => {
    try {
      const partners = await fetchPartnerList(user.token);
      setPartners(partners);
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
    getPartnerList();
  }, [getPartnerList]);

  return <>{partners && <PartnerListPresentational partners={partners} />}</>;
};
export default PartnerList;
