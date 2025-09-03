import React from "react";
import { Grid, FormControlLabel } from "@mui/material";
import { Switch, TextField } from "formik-mui";
import { Field } from "formik";
import { DateTimePicker } from "formik-mui-lab";
import FormTooltip from "../../../Common/FormTooltip";
import {
  PROJECT_DATE_HELP,
  PROJECT_NAME_HELP,
  PROJECT_WEBSITE_HELP,
  PROJECT_DESCRIPTION_HELP,
  PROJECT_TERMS_HELP,
} from "../../../../constants/text";

const ProjectEditMainDetails = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Field
          component={TextField}
          name="name"
          type="text"
          label="Name"
          sx={{ width: "80%", display: "inline-flex" }}
        />

        <FormTooltip content={PROJECT_NAME_HELP} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Field
          component={TextField}
          name="website"
          type="text"
          label="Website"
          sx={{ width: "80%", display: "inline-flex" }}
        />
        <FormTooltip content={PROJECT_DESCRIPTION_HELP} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Field
          component={TextField}
          name="description"
          type="text"
          label="Description"
          sx={{ width: "80%", display: "inline-flex" }}
          multiline
        />
        <FormTooltip content={PROJECT_WEBSITE_HELP} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Field
          component={DateTimePicker}
          label="Starting At"
          name="startingAt"
          textField={{ helperText: "Time and date of the project drop" }}
          inputFormat="yyyy-MM-dd hh:mm:ss"
          sx={{ width: "80%", display: "inline-flex" }}
        />
        <FormTooltip content={PROJECT_DATE_HELP} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <FormControlLabel
          control={
            <Field component={Switch} type="checkbox" name="termsAccepted" />
          }
          label="I accept the terms and conditions of project submission"
          color="secondary"
        />
        <FormTooltip mt={0} content={PROJECT_TERMS_HELP} />
      </Grid>
    </Grid>
  );
};

export default ProjectEditMainDetails;
