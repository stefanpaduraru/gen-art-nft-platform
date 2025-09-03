import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { Box, IconProps, TextField, Tooltip } from "@mui/material";

type Props = {
  placeholder: string;
  initialValue: number | string;
  callback?: (v: string | number) => void;
  icon: IconProps;
  type?: "text" | "number";
  disabled?: boolean;
  tooltip?: string;
  multiline?: boolean;
  maxRows?: number;
};
const ContractValueInput = ({
  placeholder,
  initialValue,
  callback,
  icon,
  type = "text",
  disabled = false,
  tooltip = "",
  multiline = false,
  maxRows,
}: Props) => {
  const [value, setValue] = React.useState(initialValue);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
      <TextField
        sx={{ ml: 1, flex: 1, p: 0, flexGrow: 1 }}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={type}
        disabled={disabled}
        multiline={multiline}
        maxRows={maxRows}
      />
      <Tooltip title={tooltip}>
        {callback ? (
          <IconButton
            type="submit"
            sx={{ p: "15px", ml: "5px", height: "3.6rem" }}
            onClick={() => callback(value)}
          >
            {icon}
          </IconButton>
        ) : (
          (icon as React.ReactElement)
        )}
      </Tooltip>
    </Box>
  );
};

export default ContractValueInput;
