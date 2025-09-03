import TextField from "@mui/material/TextField";
import { fieldToTextField, TextFieldProps } from "formik-mui";
import React, { useCallback } from "react";

const FormTextField = (props: TextFieldProps) => {
  const {
    form: { setFieldValue },
    field: { name },
    maxRows,
    multiline,
    onChange,
    InputProps,
  } = props;
  const onChangeCallback = useCallback(
    (event) => {
      //event.preventDefault();
      if (onChange) {
        onChange(event);
      }
      const { value } = event.target;
      setFieldValue(name, value);
    },
    [setFieldValue, name, onChange]
  );
  return (
    <TextField
      {...fieldToTextField(props)}
      onChange={onChangeCallback}
      size="medium"
      multiline={multiline}
      maxRows={maxRows}
      InputProps={InputProps}
    />
  );
};

export default FormTextField;
