import React from "react";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  toggleDrawer: (open: boolean) => void;
};
const MobileMenuButton = ({ toggleDrawer }: Props) => (
  <Box
    sx={{
      display: {
        xs: "inline-flex",
        md: "none",
      },
    }}
  >
    <IconButton
      aria-label="toggle menu"
      onClick={() => toggleDrawer(true)}
      edge="end"
      sx={{ color: "#fff" }}
    >
      <MenuIcon />
    </IconButton>
  </Box>
);

export default MobileMenuButton;
