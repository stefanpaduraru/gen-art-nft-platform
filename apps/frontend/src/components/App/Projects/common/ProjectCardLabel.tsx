import React from "react";
import { Box, Typography } from "@mui/material";

type Props = {
  text: string;
  type: "giveaway" | "upcoming";
};
let styles = {
  giveaway: {
    backgroundColor: "#e82a2aa0",
    color: "#fff",
    border: "1px solid #00000005",
  },
  upcoming: {
    backgroundColor: "#8195eea0",
    color: "#fff",
    border: "1px solid #00000005",
  },
};
const ProjectCardLabel = ({ text, type = "giveaway" }: Props) => {
  let style = {};
  switch (type) {
    case "giveaway":
      style = styles.giveaway;
      break;
    case "upcoming":
      style = styles.upcoming;
      break;
  }

  return (
    <Box
      sx={{
        borderRadius: 5,
        m: 0.5,
        p: 0.25,
        pl: 0.5,
        pr: 0.5,
        width: "auto",
        display: "flex",
        ...style,
      }}
    >
      <Typography
        sx={{ fontSize: 12, fontWeight: 700, letterSpacing: ".05rem" }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default ProjectCardLabel;
