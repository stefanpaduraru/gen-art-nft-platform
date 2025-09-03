/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { StatusFrequency } from "../../../api/admin/status";

type Props = {
  isRequestsPaused: boolean;
  setIsRequestsPaused: Function;
  isLoading: boolean;
  frequency: StatusFrequency;
  setFrequency: Function;
};

function ControlButtons({
  isRequestsPaused,
  setIsRequestsPaused,
  isLoading,
  frequency,
  setFrequency,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        mt: 8,
      }}
    >
      <IconButton
        onClick={() => setIsRequestsPaused(!isRequestsPaused)}
        aria-label="toggle requests"
        sx={{ ml: 2 }}
        size="large"
      >
        {isRequestsPaused ? (
          <PlayCircleIcon fontSize="inherit" />
        ) : (
          <PauseCircleIcon fontSize="inherit" />
        )}
      </IconButton>
      <Box sx={{ ml: 2 }}>
        <Button
          variant={frequency === "15m" ? "contained" : "outlined"}
          sx={{ mr: 0.5 }}
          onClick={() => setFrequency("15m")}
        >
          15 min
        </Button>
        <Button
          variant={frequency === "30m" ? "contained" : "outlined"}
          sx={{ mr: 0.5 }}
          onClick={() => setFrequency("30m")}
        >
          30 min
        </Button>
        <Button
          variant={frequency === "24h" ? "contained" : "outlined"}
          onClick={() => setFrequency("24h")}
        >
          24 h
        </Button>
      </Box>
      {isLoading && (
        <CircularProgress
          color="primary"
          sx={{ ml: 2 }}
          size={24}
          thickness={4}
        />
      )}
    </Box>
  );
}

export default ControlButtons;
