import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const StyledLink = styled(Link)(({ theme }) => ({
  "&&": {
    color: theme.palette.mode === "light" ? "#000" : "#fff",
    fontWeight: 600,
    textDecoration: "none",
  },
  "&&:hover": {
    textDecoration: "underline",
  },
}));

type Props = {
  to: string;
  text: string;
  sx?: any;
  icon?: any;
};
const DetailsLink = ({ to, text, sx, icon }: Props) => {
  return (
    <StyledLink to={to} sx={sx}>
      {text}
      {!!icon && icon}
    </StyledLink>
  );
};

export default DetailsLink;
