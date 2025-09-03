import React, { FunctionComponent } from "react";
import { Grid } from "@mui/material";

const GridItem: FunctionComponent<{}> = ({ children }) => (
  <Grid
    item
    xs={12}
    sm={12}
    md={5}
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
