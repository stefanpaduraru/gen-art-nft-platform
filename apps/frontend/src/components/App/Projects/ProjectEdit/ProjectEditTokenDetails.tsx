import React from "react";
import { Grid, MenuItem } from "@mui/material";
import { TextField } from "formik-mui";
import { Select } from "formik-mui";
import { Field } from "formik";
import FormTooltip from "../../../Common/FormTooltip";
import {
  TOKEN_PRICE_PER_TOKEN_IN_ETH,
  PRICE_PER_TOKEN_HELP,
  MAX_ITERATIONS_HELP,
  SCRIPT_LICENSE_HELP,
  SCRIPT_ASPECT_RATIO_HELP,
  TOKEN_MAX_ITERATIONS,
  PROJECT_LICENSE,
  PROJECT_ASPECT_RATIO,
  TOKEN_BASE_URI,
  TOKEN_BASE_URI_HELP,
  TOKEN_MAX_PER_ADDRESS,
  MAX_TOKEN_PER_ADDRESS_HELP,
} from "../../../../constants/text";

const ProjectEditTokenDetails = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Field
              component={TextField}
              name="pricePerTokenInEth"
              type="number"
              label={TOKEN_PRICE_PER_TOKEN_IN_ETH}
              sx={{ width: "80%", display: "inline-flex" }}
            />
            <FormTooltip content={PRICE_PER_TOKEN_HELP} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} alignItems="flex-end">
            <Field
              component={TextField}
              name="maxIterations"
              type="number"
              label={TOKEN_MAX_ITERATIONS}
              sx={{ width: "80%", display: "inline-flex" }}
            />
            <FormTooltip content={MAX_ITERATIONS_HELP} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid container spacing={0} sx={{ mt: 1 }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{ alignItems: "flex-end" }}
          >
            <Field
              component={TextField}
              name="maxTokensPerAddress"
              type="number"
              label={TOKEN_MAX_PER_ADDRESS}
              sx={{ width: "80%", display: "inline-flex" }}
            />
            <FormTooltip content={MAX_TOKEN_PER_ADDRESS_HELP} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Field
              component={TextField}
              name="aspectRatio"
              type="text"
              label={PROJECT_ASPECT_RATIO}
              sx={{ width: "80%", display: "inline-flex" }}
            />
            <FormTooltip content={SCRIPT_ASPECT_RATIO_HELP} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid container spacing={0} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ display: "flex" }}>
            <Field
              component={TextField}
              name="baseURI"
              type="text"
              label={TOKEN_BASE_URI}
              sx={{ width: "80%", display: "inline-flex" }}
              disabled
            />
            <FormTooltip content={TOKEN_BASE_URI_HELP} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{ alignItems: "flex-end" }}
          >
            <Field
              component={Select}
              name="license"
              type="select"
              label={PROJECT_LICENSE}
              sx={{ flexGrow: 1, width: 300 }}
              fullWidth
            >
              <MenuItem value={"NFT License"}>NFT License</MenuItem>
              <MenuItem value={"CC BY-NC-SA"}>CC BY-NC-SA</MenuItem>
              <MenuItem value={"CC BY-NC 4.0"}>CC BY-NC 4.0</MenuItem>
              <MenuItem value={"LGPL"}>
                GNU Lesser General Public License
              </MenuItem>
            </Field>
            <FormTooltip content={SCRIPT_LICENSE_HELP} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectEditTokenDetails;
