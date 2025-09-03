import { Divider } from "@mui/material";
import React from "react";

const MenuDivider = () => (
  <Divider
    orientation="vertical"
    flexItem
    variant="middle"
    sx={{
      borderRight: (theme) => `1px solid #cecece`,
      ml: 1,
      mr: 1.5,
    }}
  />
);

export default MenuDivider;
