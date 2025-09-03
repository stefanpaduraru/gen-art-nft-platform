import React from "react";
import { Box, Typography } from "@mui/material";
import { NumbersResponse } from "../../../types/status";

function LogsWidget({ stats }: { stats: NumbersResponse }) {
  return (
    <>
      <Box
        sx={{
          paddingTop: 1,
          paddingBottom: 1,
          mb: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            Templates: {stats.projects.templates}
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            Testnet: {stats.projects.testnet}
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            Mainnet: {stats.projects.mainnet}
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">Tokens: {stats.tokens}</Typography>
        </Box>
      </Box>
    </>
  );
}

export default LogsWidget;
