import React, { useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FormTooltip from "../../../Common/FormTooltip";
import {
  DropType,
  DropTypes,
  ExtendedProject,
} from "../../../../types/project";
import CTAButton from "../../../Common/Buttons/CTAButton";

type Props = {
  project: ExtendedProject;
  submitProjectSettings: (
    dropType: DropType,
    dropDetails: string,
    additionalDetails: string,
    renderDelay: number
  ) => void;
};

const ProjectEditSettings = ({ project, submitProjectSettings }: Props) => {
  const chainProject =
    project.mainnetProject || project.testnetProject || project;

  const [dropType, setDropType] = useState<DropType>(chainProject.dropType);
  const [dropDetails, setDropDetails] = useState<string>(
    chainProject.dropDetails || ""
  );
  const [additionalDetails, setAdditionalDetails] = useState<string>(
    chainProject.additionalDetails || ""
  );

  const [renderDelay, setRenderDelay] = useState<number>(
    chainProject.renderDelay || 1
  );

  const handleRenderDelayChange = (e: any) => {
    setRenderDelay(e.target.value);
  };

  const handleAdditionalDetailsChange = (e: any) => {
    setAdditionalDetails(e.target.value);
  };

  const handleDropDetailsChange = (e: any) => {
    setDropDetails(e.target.value);
  };

  const handleDropTypeChange = (e: any) => {
    setDropType(e.target.value);
  };

  const submit = () => {
    submitProjectSettings(
      dropType,
      dropDetails,
      additionalDetails,
      renderDelay
    );
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FormControl sx={{ width: "80%" }}>
            <InputLabel id="drop-type">Drop Type</InputLabel>
            <Select
              labelId="drop-type"
              id="drop-type-select"
              value={dropType}
              label={"Drop Type"}
              onChange={handleDropTypeChange}
            >
              <MenuItem value={DropTypes.Fixed}>Fixed Price</MenuItem>
              <MenuItem value={DropTypes.Dutch}>Dutch Action</MenuItem>
            </Select>
          </FormControl>
          <FormTooltip
            content={
              "Additional details about the project i.e. how to use, keyboard shortcuts etc"
            }
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            type="text"
            label={"Drop Details"}
            sx={{ width: "80%", display: "inline-flex" }}
            multiline={true}
            maxRows={3}
            value={dropDetails}
            onChange={handleDropDetailsChange}
          />
          <FormTooltip
            content={"Additional details about the drop i.e. drop mechanic"}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            type="text"
            label={"Additional Details"}
            sx={{ width: "80%", display: "inline-flex" }}
            multiline={true}
            maxRows={3}
            value={additionalDetails}
            onChange={handleAdditionalDetailsChange}
          />
          <FormTooltip
            content={
              "Additional details about the project i.e. how to use, keyboard shortcuts etc"
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            type="text"
            label={"Render Delay (in seconds)"}
            sx={{ width: "80%", display: "inline-flex" }}
            multiline={false}
            value={renderDelay}
            onChange={handleRenderDelayChange}
          />
          <FormTooltip
            content={
              "How much time the renderer should wait before creating the snapshot. Play with this value to make sure the tokens are rendered correctly."
            }
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4} sx={{ mt: 5 }}>
          <CTAButton callback={submit} text="Save" sx={{ maxWidth: "80%" }} />
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectEditSettings;
