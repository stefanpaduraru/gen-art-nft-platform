import React from "react";
import { Button, Grid, MenuItem } from "@mui/material";
import { TextField, Select } from "formik-mui";
import { Field } from "formik";
import {
  PROJECT_SCRIPT_TYPE,
  SCRIPT_TYPE_HELP,
} from "../../../../constants/text";
import FormTooltip from "../../../Common/FormTooltip";
import CategoryIcon from "@mui/icons-material/Category";
import { ScriptTypes } from "../../../../types/project";

type Props = {
  executeScriptCallback: () => void;
  showViewButton: boolean;
};
const ProjectEditScript = ({
  executeScriptCallback,
  showViewButton,
}: Props) => {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Field
          component={Select}
          name="scriptType"
          type="select"
          label={PROJECT_SCRIPT_TYPE}
          sx={{ width: 200 }}
        >
          <MenuItem value={ScriptTypes.JAVASCRIPT}>Javascript</MenuItem>
          <MenuItem value={ScriptTypes.P5JS}>P5JS</MenuItem>
        </Field>
        <FormTooltip content={SCRIPT_TYPE_HELP} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Field
          component={TextField}
          name="script"
          type="text"
          label="Script"
          fullWidth
          maxRows={5}
          multiline
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Button
          onClick={executeScriptCallback}
          variant="outlined"
          startIcon={<CategoryIcon />}
          disabled={!showViewButton}
        >
          Script Live View
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProjectEditScript;
