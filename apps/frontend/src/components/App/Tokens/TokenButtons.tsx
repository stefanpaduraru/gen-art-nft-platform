import React from "react";
import { Box } from "@mui/system";

import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ImageIcon from "@mui/icons-material/Image";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { IconButton, styled, Tooltip } from "@mui/material";

interface Props {
  openTokenImage: () => void;
  openTokenLiveView: () => void;
  openFullscreen: () => void;
}

const TokenButtons = ({
  openTokenImage,
  openTokenLiveView,
  openFullscreen,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex-block",
        justifyContent: "flex-end",
      }}
    >
      <Tooltip title={"Enter fullscreen"}>
        <StyledIconButton
          aria-label="Enter fullscreen"
          onClick={openFullscreen}
        >
          <FullscreenIcon />
        </StyledIconButton>
      </Tooltip>

      <Tooltip title={"View Token Image"}>
        <StyledIconButton
          aria-label="View Token Image"
          sx={{ ml: 1 }}
          onClick={openTokenImage}
        >
          <ImageIcon />
        </StyledIconButton>
      </Tooltip>

      <Tooltip title={"Token Live View"}>
        <StyledIconButton
          aria-label="Token Live View"
          sx={{ ml: 1 }}
          onClick={openTokenLiveView}
        >
          <OpenInNew />
        </StyledIconButton>
      </Tooltip>
    </Box>
  );
};
export default TokenButtons;

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "&&": {
    backgroundColor: theme.palette.mode === "light" ? "#ffffff60" : "#00000060",
    border: `1px solid ${
      theme.palette.mode === "light" ? "#00000030" : "#ffffff30"
    }`,
    color: theme.palette.mode === "light" ? "#000" : "#fff",
  },
  "&&:hover": {
    backgroundColor: theme.palette.mode === "light" ? "#00000050" : "#ffffff50",
  },
}));
