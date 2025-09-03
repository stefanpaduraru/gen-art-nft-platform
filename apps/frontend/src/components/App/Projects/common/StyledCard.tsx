import { Card } from "@mui/material";
import { styled } from "@mui/material";
import { Themes } from "../../../../context/ThemeContext";

const StyledCard = styled(Card)(({ theme }) => ({
  "&&": {
    borderRadius: "0.75rem",
    boxShadow:
      theme.palette.mode === Themes.LIGHT
        ? "0 22px 44px rgb(0 0 0 / 5%)"
        : "0 22px 44px rgb(255 255 255 / 0%)",
  },
}));

export default StyledCard;
