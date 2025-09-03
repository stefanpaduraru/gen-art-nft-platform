import React from "react";
import { Grid } from "@mui/material";
import { TextField } from "formik-mui";
import { Field } from "formik";
import FormTooltip from "../../../Common/FormTooltip";
import {
  ROYALTY_FEE_HELP,
  COLLABORATOR_ADDRESS_HELP,
  COLLABORATOR_PERCENTAGE_HELP,
} from "../../../../constants/text";

const ProjectEditRoyaltyInfo = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Field
          component={TextField}
          name="royaltyFeePercentage"
          type="number"
          label="Secondary Market Royalty Fee"
          sx={{ width: "80%", display: "inline-flex" }}
        />
        <FormTooltip content={ROYALTY_FEE_HELP} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Field
          component={TextField}
          name="collaboratorAddress"
          type="text"
          label="Collaborator Address"
          sx={{ width: "80%", display: "inline-flex" }}
        />
        <FormTooltip content={COLLABORATOR_ADDRESS_HELP} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Field
          component={TextField}
          name="collaboratorPercentage"
          type="number"
          label="Collaborator Percentage"
          sx={{ width: "80%", display: "inline-flex" }}
        />
        <FormTooltip content={COLLABORATOR_PERCENTAGE_HELP} />
      </Grid>
    </Grid>
  );
};

export default ProjectEditRoyaltyInfo;
