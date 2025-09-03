import React from "react";
import { styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const ConnectButtonStyled = styled(LoadingButton)(({ theme }) => ({
  "&&": {
    width: "100%",
    color: "#fff",
  },
  "&&:hover": {
    color: "#fff",
    fontWeigh: "bold",
  },
}));

const ConnectButton = ({
  callback,
  loading = false,
  text = "Connect",
}: {
  callback: Function;
  loading?: boolean;
  text?: string;
}) => {
  const handleClick = () => {
    callback();
  };
  return (
    <>
      <ConnectButtonStyled
        variant="text"
        onClick={handleClick}
        loading={loading}
      >
        {text}
      </ConnectButtonStyled>
    </>
  );
};

export default ConnectButton;
