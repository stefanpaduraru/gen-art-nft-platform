import React from "react";
import { styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const ConnectButtonStyled = styled(LoadingButton)(({ theme }) => ({
  "&&": {
    width: "100%",
    height: 69,
    borderRadius: 69,
  },
  "&&:hover": {
    fontWeigh: "bold",
  },
}));

const ConnectButtonMobile = ({
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
        variant="outlined"
        onClick={handleClick}
        loading={loading}
      >
        {text}
      </ConnectButtonStyled>
    </>
  );
};

export default ConnectButtonMobile;
