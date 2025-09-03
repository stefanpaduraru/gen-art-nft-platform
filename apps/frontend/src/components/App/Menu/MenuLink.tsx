import React from "react";
import { Link, Typography } from "@mui/material";

type Props = {
  text: string;
  callback: (...args: any[]) => void;
  sx?: any;
};
const MenuLink = ({ text, callback, sx = {} }: Props) => (
  <Link
    sx={{
      color: "#fff",
      fontWeight: "bold",
      p: 1,
      cursor: "pointer",
      borderRadius: 1,
      display: "flex",
      ...sx,
    }}
    underline="none"
    onClick={callback}
  >
    <Typography sx={{ textTransform: "uppercase" }} variant="body2">
      {text}
    </Typography>
  </Link>
);

export default MenuLink;
