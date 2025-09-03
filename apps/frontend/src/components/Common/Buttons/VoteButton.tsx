import React from "react";
import { styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Themes } from "../../../context/ThemeContext";

const VoteButtonStyled = styled(LoadingButton)(({ theme }) => ({
  "&&": {
    width: "100%",
    height: 69,
    borderRadius: 69,
    border: "1px solid transparent",
    borderColor: theme.palette.mode === Themes.LIGHT ? "#000000de" : "#fff",
    color: theme.palette.mode === Themes.LIGHT ? "#000000de" : "#fff",
  },
  "&&:hover": {
    fontWeigh: "bold",
  },
}));

const VoteButton = ({
  callback,
  disabled = true,
}: {
  callback: Function;
  disabled: boolean;
}) => {
  const handleClick = () => {
    callback();
  };
  return (
    <>
      <VoteButtonStyled
        variant="outlined"
        color="primary"
        onClick={handleClick}
        disabled={disabled}
        fullWidth
      >
        Vote
      </VoteButtonStyled>
    </>
  );
};

export default VoteButton;
