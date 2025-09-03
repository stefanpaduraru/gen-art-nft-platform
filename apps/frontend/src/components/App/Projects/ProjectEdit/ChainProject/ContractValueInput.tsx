import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { Box, IconProps, TextField, Tooltip } from "@mui/material";

type Props = {
  placeholder: string;
  initialValue?: number | string;
  value?: number | string;
  callback?: ((v: string | number) => void) | null;
  icon?: IconProps;
  type?: "text" | "number";
  disabled?: boolean;
  tooltip?: string;
  multiline?: boolean;
  maxRows?: number;
  setValueCallback?: (value: string | number) => void;
};

const ContractValueInput = ({
  placeholder,
  initialValue,
  value,
  callback,
  icon,
  type = "text",
  disabled = false,
  tooltip = "",
  multiline = false,
  maxRows,
  setValueCallback,
}: Props) => {
  const [currentValue, setCurrentValue] = React.useState(initialValue || value);
  const onChange = (e: any) => {
    setCurrentValue(e.target.value);
    if (setValueCallback) {
      setValueCallback(e.target.value);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
      <TextField
        sx={{
          ml: 1,
          flex: 1,
          p: 0,
          flexGrow: 1,
        }}
        placeholder={placeholder}
        onChange={onChange}
        value={value || currentValue}
        type={type}
        disabled={disabled}
        multiline={multiline}
        maxRows={maxRows}
      />
      {tooltip && (
        <Tooltip title={tooltip}>
          {callback ? (
            <IconButton
              type="submit"
              sx={{ ml: "5px" }}
              onClick={() => currentValue && callback(currentValue)}
              disabled={disabled}
            >
              {icon}
            </IconButton>
          ) : (
            (icon as React.ReactElement)
          )}
        </Tooltip>
      )}
    </Box>
  );
};

export default ContractValueInput;
