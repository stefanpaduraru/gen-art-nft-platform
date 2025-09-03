import React from "react";
import { Grid, Typography } from "@mui/material";

const CollectorSplash = () => (
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
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Typography
        variant="h3"
        fontWeight={"light"}
        sx={{ fontSize: "2.5rem", pb: { xs: 4, sm: 4, md: 4, lg: 0 }, pr: 3 }}
      >
        Together we will discover the most fascinating artworks.
      </Typography>
    </Grid>
    <Grid item md={6} sm={12} lg={6}>
      <Typography
        variant="body1"
        fontWeight={"light"}
        sx={{ fontSize: "15px", lineHeight: "25px" }}
      >
        The on-chain, long-form generative art is a collaboration between the
        artist and the collector.
        <br />
        Their journeys are forever intertwined, as the generating of the content
        is a partnership: the artist establishes the styles and rules of the
        content, while the collector introduces entropy through minting. Each
        output is unique and it will always display the effort of the two
        parties.
      </Typography>
    </Grid>
  </Grid>
);

export default CollectorSplash;
