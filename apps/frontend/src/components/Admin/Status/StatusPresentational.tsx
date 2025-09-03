import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { NumbersResponse, StatusResponse } from "../../../types/status";
import LogsWidget from "./LogsWidget";
import StatsWidget from "./StatsWidget";
import EtherWidget from "./EtherWidget";

type Props = {
  status: StatusResponse;
  stats: NumbersResponse;
};

function StatusPresentational({ status, stats }: Props) {
  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box>
          <Grid container>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="h6">Ether:</Typography>
              <EtherWidget etherData={status.etherData} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="h6">Stats:</Typography>
              <StatsWidget stats={stats} />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Typography variant="h6">Logs:</Typography>
          <LogsWidget logs={status.logs} />
        </Box>
      </Box>
    </Box>
  );
}

export default StatusPresentational;
