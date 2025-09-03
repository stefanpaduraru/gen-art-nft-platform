import { Box, Typography } from "@mui/material";
import React from "react";

const ProjectSubmission = () => (
  <Box sx={{ mt: 30 }}>
    <Typography variant="h3" fontWeight={"light"} sx={{ fontSize: "2.5rem" }}>
      Publishing a project
    </Typography>
    <Typography
      variant="body1"
      fontWeight={"light"}
      sx={{ mt: 4, fontSize: "15px", lineHeight: "25px" }}
    >
      We don't believe in applications, you can start creating your project
      right now!
      <br />
      On Mintoria, projects move through three phases: template, test net, main
      net. When you're comfortable with a project and believe it's ready to move
      it further, you can request a transfer with the click of a button. Our
      team will assess the project based of the criteria of the gallery you
      selected. We will provide feedback should the project need more work, or
      move it to the next step: either testnet or live on mainnet. It's that
      easy!
    </Typography>
    <img
      src="/images/content/project-submission.png"
      alt="Mintoria Project Submission"
      style={{
        width: "100%",
        marginTop: "25px",
        borderRadius: "10px",
      }}
    />
  </Box>
);

export default ProjectSubmission;
