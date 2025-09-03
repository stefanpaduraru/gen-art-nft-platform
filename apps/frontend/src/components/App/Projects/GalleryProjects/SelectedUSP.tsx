/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

function SelectedUSP() {
  return (
    <Grid container sx={{ width: "100%", pl: 16, pr: 16 }}>
      <Grid
        item
        md={6}
        sm={12}
        lg={6}
        sx={{ p: 2, display: "flex", alignItems: "center" }}
      >
        <Typography
          variant="h3"
          fontWeight={"light"}
          sx={{ fontSize: "2.5rem" }}
        >
          Say goodbye to applications, start adding your projects now!
        </Typography>
      </Grid>
      <Grid item md={6} sm={12} lg={6} sx={{ p: 2 }}>
        <Typography
          variant="body1"
          fontWeight={"light"}
          sx={{ fontSize: "15px", lineHeight: "25px" }}
        >
          Selected is Mintoria's curated gallery. It's comprised of projects
          submitted by established artists, or by the artists most voted by the
          community.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default SelectedUSP;
