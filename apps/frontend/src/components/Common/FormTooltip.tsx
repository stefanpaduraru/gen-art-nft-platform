import React, { ReactFragment } from "react";
import HelpTooltip from "./HelpTooltip";
import { Box } from "@mui/material";

const FormTooltip = ({
  content,
  mt = 1.5,
}: {
  content: ReactFragment;
  mt?: number;
}) => {
  return (
    <Box sx={{ display: "inline-flex", mt: mt, ml: 2.5 }}>
      <HelpTooltip content={content}></HelpTooltip>
    </Box>
  );
};
export default FormTooltip;
