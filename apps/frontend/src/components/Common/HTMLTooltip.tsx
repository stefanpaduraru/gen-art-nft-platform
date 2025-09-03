import React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const HTMLTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    //backgroundColor: "#f5f5f9",
    //color: "rgba(0, 0, 0, 0.87)",
    //border: "1px solid #dadde9",
  },
}));
export default HTMLTooltip;
