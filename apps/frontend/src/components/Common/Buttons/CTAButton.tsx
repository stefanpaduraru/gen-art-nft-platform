import React from "react";
import { styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const CTAButtonStyled = styled(LoadingButton)(({ theme }) => ({
  "&&": {
    width: "100%",
    height: 69,
    borderRadius: 69,
  },
  "&&:hover": {
    fontWeigh: "bold",
  },
}));

const CTAButton = ({
  callback,
  loading = false,
  disabled = false,
  text = "",
  variant = "contained",
  type = "button",
  sx = {},
  autoFocus = false,
}: {
  text: string;
  callback: Function;
  loading?: boolean;
  disabled?: boolean;
  variant?: "contained" | "outlined" | "text";
  type?: "button" | "submit";
  sx?: any;
  autoFocus?: boolean;
}) => {
  const handleClick = () => {
    callback();
  };
  return (
    <>
      <CTAButtonStyled
        variant={variant}
        color="primary"
        onClick={handleClick}
        loading={loading}
        disabled={disabled}
        type={type}
        sx={sx}
        autoFocus={autoFocus}
      >
        {text}
      </CTAButtonStyled>
    </>
  );
};

export default CTAButton;
