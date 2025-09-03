import React from "react";
import { Grid, Typography } from "@mui/material";

const RowTitle = ({ text }: { text: string }) => {
  return (
    <Grid
      item
      sm={12}
      md={2}
      lg={2}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Typography variant="body2" sx={{ fontWeight: "600" }}>
        {text}
      </Typography>
    </Grid>
  );
};

export default RowTitle;
