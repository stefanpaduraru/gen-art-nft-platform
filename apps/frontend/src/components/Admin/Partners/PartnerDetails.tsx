import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { fetchPartnerDetails } from "../../../api/admin/partner";
import PartnerDetailsPresentational from "./PartnerDetailsPresentational";
import { Partner } from "../../../types/partner";
import { useNotification } from "../../../context/NotificationContext";
import { useAuth } from "../../../context/UserContext";
import Routes from "../../../constants/routes";

const PartnerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [partner, setPartner] = useState<Partner>();
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

  const getData = useCallback(async () => {
    try {
      const partner = await fetchPartnerDetails(id, user.token);
      setPartner(partner);
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

  return <>{partner && <PartnerDetailsPresentational partner={partner} />}</>;
};
export default PartnerDetails;
