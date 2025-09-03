import React, { ReactFragment } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Tooltip } from "@mui/material";

const HelpTooltip = ({ content }: { content: ReactFragment }) => {
  return (
    <Tooltip title={content} color="secondary">
      <HelpOutlineIcon />
    </Tooltip>
  );
};
export default HelpTooltip;
