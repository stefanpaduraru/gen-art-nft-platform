import React from "react";
import { Grid } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import { InfoOutlined } from "@mui/icons-material";

import { ExtendedProject } from "../../../../../types/project";
import { Web3ProjectDetails } from "../../../../../types/web3Project";
import ContractValueInput from "./ContractValueInput";
import RowTitle from "./RowTitle";
import GridItem from "./GridItem";

type Props = {
  project: ExtendedProject;
  testnetProjectDetails?: Web3ProjectDetails;
  mainnetProjectDetails?: Web3ProjectDetails;
  updateProjectName?: (value: string | number) => void;
  updateArtistName?: (value: string | number) => void;
  updateDescription?: (value: string | number) => void;
  updateWebsite?: (value: string | number) => void;
};

const ChainProjectEditMainDetails = ({
  project,
  testnetProjectDetails,
  mainnetProjectDetails,
  updateProjectName,
  updateArtistName,
  updateDescription,
  updateWebsite,
}: Props) => {
  const chainProject = mainnetProjectDetails || testnetProjectDetails;
  const prevState = !!mainnetProjectDetails ? project.testnetProject : project;
  const syncTooltipText = "Sync to contract";
  const infoIcon = (
    <InfoOutlined color="secondary" sx={{ ml: 2, mt: 0, mr: 2.2 }} />
  );
  const infoText = !chainProject?.locked
    ? project.isMainnet
      ? "Original value from the testnet project"
      : "Original value from the project template"
    : "The project is locked, no further editing is possible.";

  return (
    <>
      {chainProject && (
        <Grid container>
          <RowTitle text={"Name:"} />
          <GridItem>
            <ContractValueInput
              placeholder="Name"
              initialValue={prevState?.name || ""}
              disabled={true}
              tooltip={infoText}
              icon={infoIcon}
            />
          </GridItem>
          <GridItem>
            <ContractValueInput
              placeholder="Name"
              initialValue={chainProject?.name || ""}
              callback={updateProjectName}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              disabled={chainProject.locked}
            />
          </GridItem>

          <RowTitle text={"Artist name:"} />
          <GridItem>
            <ContractValueInput
              placeholder="Artist name"
              initialValue={prevState?.artist || ""}
              disabled={true}
              tooltip={infoText}
              icon={infoIcon}
            />
          </GridItem>
          <GridItem>
            <ContractValueInput
              placeholder="Artist Name"
              initialValue={chainProject?.artist || ""}
              callback={updateArtistName}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              disabled={chainProject.locked}
            />
          </GridItem>

          <RowTitle text={"Website:"} />
          <GridItem>
            <ContractValueInput
              placeholder="Website"
              initialValue={prevState?.website || ""}
              disabled={true}
              tooltip={infoText}
              icon={infoIcon}
            />
          </GridItem>
          <GridItem>
            <ContractValueInput
              placeholder="Website"
              initialValue={chainProject?.website || ""}
              callback={updateWebsite}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              disabled={chainProject.locked}
            />
          </GridItem>

          <RowTitle text={"Description:"} />
          <GridItem>
            <ContractValueInput
              placeholder="Description"
              initialValue={prevState?.description || ""}
              disabled={true}
              tooltip={infoText}
              icon={infoIcon}
              multiline
              maxRows={3}
            />
          </GridItem>
          <GridItem>
            <ContractValueInput
              placeholder="Description"
              initialValue={chainProject?.description || ""}
              callback={updateDescription}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              multiline
              maxRows={3}
              disabled={chainProject.locked}
            />
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default ChainProjectEditMainDetails;
