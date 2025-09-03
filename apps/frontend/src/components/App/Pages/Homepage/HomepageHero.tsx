import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const HomepageHero = () => (
  <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
    <Box sx={{ mt: 10, maxWidth: "768px" }}>
      <Typography
        variant="h2"
        component="div"
        align="center"
        sx={{
          mt: 8,
        }}
      >
        The generative art universe.
      </Typography>
      <Typography
        variant="h6"
        component="div"
        align="center"
        sx={{
          mt: 4,
          color: "#8e8e8e",
          fontWeight: 500,
          lineHeight: "29px",
        }}
      >
        Mintoria is a generative art community hosted on the Ethereum blockchain
        that enables artists to publish their art professionally.
      </Typography>
    </Box>
  </Box>
);

export default HomepageHero;
