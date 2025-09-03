import { Button, IconProps } from "@mui/material";
import React from "react";

type Props = {
  submitCallback: any;
  text: string;
  icon?: IconProps;
  disabled?: boolean;
  sx?: any;
  color?: "primary" | "secondary";
};
const SubmitButton = ({
  text,
  submitCallback,
  icon,
  disabled,
  sx,
  color = "primary",
}: Props) => {
  return (
    <Button
      type="submit"
      onClick={submitCallback}
      variant="contained"
      startIcon={icon}
      disabled={disabled}
      sx={sx}
      color={color}
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
