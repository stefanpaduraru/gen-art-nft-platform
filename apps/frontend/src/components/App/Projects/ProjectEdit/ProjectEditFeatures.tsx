import React from "react";
import {
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";

import { Field } from "formik";
import {
  ADD_FEATURE,
  FEATURES_HELP,
  CURRENT_FEATURES,
} from "../../../../constants/text";
import FormTooltip from "../../../Common/FormTooltip";
import ProjectValues from "./ProjectValues.interface";
import TextField from "../../../Common/TextFields/TextField";
import SendIcon from "@mui/icons-material/Send";

type Props = {
  values: Partial<ProjectValues>;
  setValues: any;
};

const ProjectEditFeatures = ({ values, setValues }: Props) => {
  const addFeature = (e: any) => {
    const idx = (values.features || []).findIndex(
      (f) => f.name === values.newLabel
    );
    if (idx > -1) {
      values.newLabel = "";
      setValues(values);
      return;
    }
    (values.features || []).push({
      id: 0,
      name: values.newLabel || "",
    });
    values.newLabel = "";
    setValues(values);
  };

  const removeFeature = (feature: string) => {
    const features = (values.features || []).filter(
      (value) => value.name !== feature
    );
    values.features = features;
    setValues(values);
  };

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={12} sm={10} md={10} lg={10}>
        <Field
          component={TextField}
          name="newLabel"
          type="ntext"
          label={ADD_FEATURE}
          sx={{ width: "80%", display: "inline-flex" }}
          multiline={false}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="add feature"
                  onClick={addFeature}
                  edge="end"
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormTooltip content={FEATURES_HELP} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 3 }}>
        <Typography variant="body1">{CURRENT_FEATURES}</Typography>
      </Grid>
      <Grid item>
        {values.features?.map((feature) => (
          <Chip
            label={feature.name}
            variant="outlined"
            onDelete={(e) => removeFeature(feature.name)}
            key={feature.name}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default ProjectEditFeatures;
