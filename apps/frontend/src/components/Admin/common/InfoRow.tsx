import { Grid, Typography, Tooltip } from "@mui/material";
import React from "react";

type InfoRowProps = {
  title: string;
  value: any;
  tooltip?: string;
};
const InfoRow = ({ title, value, tooltip }: InfoRowProps) => (
  <>
    <Grid item xs={4} sm={4} md={4}>
      <Typography variant="body2">{title} :</Typography>
    </Grid>
    <Grid item xs={8} sm={8} md={8}>
      {!tooltip ? (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          {value}
        </Typography>
      ) : (
        <Tooltip title={tooltip}>
          <Typography variant="body2" sx={{ fontWeight: "600" }}>
            {value}
          </Typography>
        </Tooltip>
      )}
    </Grid>
  </>
);

export default InfoRow;
