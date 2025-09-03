/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from "react";
import { Box, Typography } from "@mui/material";
import Routes from "../../../constants/routes";
import { useAuth } from "../../../context/UserContext";
import { useHistory } from "react-router-dom";
import { useNotification } from "../../../context/NotificationContext";
import {
  fetchStats,
  fetchStatus,
  StatusFrequency,
} from "../../../api/admin/status";
import { NumbersResponse, StatusResponse } from "../../../types/status";
import StatusPresentational from "./StatusPresentational";
import useInterval from "../../../hooks/useInterval";
import ControlButtons from "./ControlButtons";

function StatusDashboard() {
  const { user } = useAuth();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [frequency, setFrequency] = useState<StatusFrequency>("15m");
  const [isRequestsPaused, setIsRequestsPaused] = useState(false);
  const [status, setStatus] = useState<StatusResponse>();
  const [stats, setStats] = useState<NumbersResponse>({
    projects: { templates: 0, testnet: 0, mainnet: 0 },
    tokens: 0,
  } as NumbersResponse);
  const {
    setNotificationMessage,
    setIsNotificationOpen,
    setNotificationSeverity,
  } = useNotification();

  const getLogs = useCallback(
    async (frequency: StatusFrequency) => {
      try {
        setIsLoading(true);
        console.log(frequency);
        const status = await fetchStatus(frequency, user.token);
        setIsLoading(false);
        setStatus(status);
      } catch (e) {
        setNotificationMessage("Can't fetch data.");
        setNotificationSeverity("error");
        setIsNotificationOpen(true);
      }
    },
    [
      setIsNotificationOpen,
      setNotificationMessage,
      setNotificationSeverity,
      user.token,
    ]
  );

  const getStats = useCallback(async () => {
    try {
      const stats = await fetchStats(user.token);
      setStats(stats);
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

  if (!user.isAdmin && !user.isMintoriaStaff) {
    history.push(Routes.notFoundPage);
  }

  useInterval(() => {
    if (!isRequestsPaused) {
      getLogs(frequency);
    }
  }, 10000);

  useInterval(() => {
    if (!isRequestsPaused) {
      getStats();
    }
  }, 60000);

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="h3" component="span" sx={{ mt: 8 }}>
          Status
        </Typography>
        <ControlButtons
          isLoading={isLoading}
          isRequestsPaused={isRequestsPaused}
          setIsRequestsPaused={setIsRequestsPaused}
          frequency={frequency}
          setFrequency={setFrequency}
        />
      </Box>
      {status && stats && (
        <StatusPresentational status={status} stats={stats} />
      )}
    </Box>
  );
}

export default StatusDashboard;
