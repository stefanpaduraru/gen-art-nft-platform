import { Grid, Typography } from "@mui/material";
import React from "react";

const ArtistSplash = () => (
  <Grid
    container
    sx={{
      mt: 20,
      width: "100%",
      pl: { xs: 0, sm: 0, md: 0, lg: 16 },
      pr: { xs: 0, sm: 0, md: 0, lg: 16 },
    }}
  >
    <Grid
      item
      md={6}
      sm={12}
      lg={6}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        fontWeight={"light"}
        sx={{ fontSize: "2.5rem", pb: { xs: 4, sm: 4, md: 4, lg: 0 }, pr: 3 }}
      >
        We're here to help you publish your generative art to the world.
      </Typography>
    </Grid>
    <Grid item md={6} sm={12} lg={6}>
      <Typography
        variant="body1"
        fontWeight={"light"}
        sx={{ fontSize: "15px", lineHeight: "25px" }}
      >
        Welcome to the Mintoria community! We're here to help you publish your
        generative art, and to help push the boundaries of this art form.
        <br />
        Our process is designed so that projects move swiftly from your repo to
        the chain. Just connect your wallet to sign in and start adding your
        generative projects.
      </Typography>
    </Grid>
  </Grid>
);

export default ArtistSplash;
