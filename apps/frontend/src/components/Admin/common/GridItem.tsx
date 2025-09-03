import React, { FunctionComponent } from "react";
import { Grid } from "@mui/material";

const GridItem: FunctionComponent<{}> = ({ children }) => (
  <Grid
    item
    xs={8}
    sm={8}
    md={8}
    sx={{
      display: "flex",
      pt: "0px !important",
      pl: "8px !important",
      mb: "10px",
    }}
  >
    {children}
  </Grid>
);

export default GridItem;
