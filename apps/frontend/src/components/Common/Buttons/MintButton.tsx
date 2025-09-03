import React from "react";
import { styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Themes } from "../../../context/ThemeContext";

const MintButtonStyled = styled(LoadingButton)(({ theme }) => ({
  "&&": {
    width: "100%",
    height: 69,
    borderRadius: 69,
    backgroundColor: theme.palette.mode === Themes.LIGHT ? "#000000de" : "#fff",
    color: theme.palette.mode === Themes.LIGHT ? "#fff" : "#000000de",
  },
  "&&:hover": {
    fontWeigh: "bold",
  },
}));

const MintButton = ({
  callback,
  loading = false,
  disabled = true,
  completed = false,
}: {
  callback: Function;
  loading: boolean;
  disabled: boolean;
  completed: boolean;
}) => {
  const handleClick = () => {
    callback();
  };
  return (
    <>
      <MintButtonStyled
        variant="contained"
        color="primary"
        onClick={handleClick}
        loading={loading}
        loadingIndicator="Minting ..."
        disabled={disabled}
      >
        {disabled
          ? completed
            ? `Project is complete`
            : "Minting is disabled"
          : "Mint"}
      </MintButtonStyled>
    </>
  );
};

export default MintButton;
