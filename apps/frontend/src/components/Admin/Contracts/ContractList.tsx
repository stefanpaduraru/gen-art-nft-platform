import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchContractList } from "../../../api/admin/contract";
import Routes from "../../../constants/routes";
import { useNotification } from "../../../context/NotificationContext";
import { useAuth } from "../../../context/UserContext";
import { Contract } from "../../../types/contract";
import ContractListPresentational from "./ContractListPresentational";

const ContractList = () => {
  const [contracts, setContracts] = useState<Contract[]>();
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
      const contracts = await fetchContractList(user.token);
      setContracts(contracts);
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

  return (
    <>{contracts && <ContractListPresentational contracts={contracts} />}</>
  );
};
export default ContractList;
