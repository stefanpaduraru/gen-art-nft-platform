import { Box } from "@mui/material";
import React from "react";

const LabelContainer = ({ children }: { children: any }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        right: 4,
        top: 4,
        display: "flex",
        flexDirection: "row",
      }}
    >
      {children}
    </Box>
  );
};

export default LabelContainer;
