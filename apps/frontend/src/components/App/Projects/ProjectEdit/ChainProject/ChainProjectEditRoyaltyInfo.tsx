import React, { useState } from "react";
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
  updateSecondaryPercentage?: (value: string | number) => void;
  updateCollaboratorInfo?: (address: string, percentage: number) => void;
};

const ChainProjectEditRoyaltyInfo = ({
  project,
  testnetProjectDetails,
  mainnetProjectDetails,
  updateSecondaryPercentage,
  updateCollaboratorInfo,
}: Props) => {
  const chainProject = mainnetProjectDetails || testnetProjectDetails;
  const prevState = !!mainnetProjectDetails ? project.testnetProject : project;

  const [collaboratorAddress, setCollaboratorAddress] = useState("");
  const updateCollaboratorAddress = (address: string | number) => {
    setCollaboratorAddress(address as string);
  };

  const syncTooltipText = "Sync to contract";
  const infoIcon = (
    <InfoOutlined color="secondary" sx={{ ml: 2, mt: 2, mr: 2.2 }} />
  );
  const infoText = !chainProject?.locked
    ? project.isMainnet
      ? "Original value from the testnet project"
      : "Original value from the project template"
    : "The project is locked, no further editing is possible.";

  const updateCollaboratorDetails = (percentage: string | number) => {
    if (updateCollaboratorInfo) {
      updateCollaboratorInfo(
        collaboratorAddress,
        percentage as unknown as number
      );
    }
  };
  return (
    <>
      {chainProject && (
        <Grid container>
          <RowTitle text={`Royalty Fee Percentage: `} />
          <GridItem>
            <ContractValueInput
              placeholder="Royalty Fee Percentage"
              initialValue={prevState?.royaltyFeePercentage || 0}
              disabled={true}
              tooltip={infoText}
              icon={infoIcon}
            />
          </GridItem>
          <GridItem>
            <ContractValueInput
              placeholder="Secondary Market Percentage"
              initialValue={chainProject?.royaltyFeePercentage || 0}
              callback={updateSecondaryPercentage}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              disabled={chainProject.locked}
            />
          </GridItem>

          <RowTitle text={`Collaborator Address: `} />
          <GridItem>
            <ContractValueInput
              placeholder="Collaborator Address"
              initialValue={prevState?.collaboratorAddress || ""}
              disabled={true}
              tooltip={infoText}
              icon={infoIcon}
            />
          </GridItem>
          <GridItem>
            <ContractValueInput
              placeholder="Collaborator Address"
              initialValue={chainProject?.collaboratorAddress || ""}
              icon={
                <PublishIcon sx={{ ml: 2.4, mt: 2, mr: 2, opacity: 0.3 }} />
              }
              tooltip={"Use the sync button for the collaborator percentage"}
              setValueCallback={updateCollaboratorAddress}
              disabled={chainProject.locked}
            />
          </GridItem>

          <RowTitle text={`Collaborator Percentage: `} />
          <GridItem>
            <ContractValueInput
              placeholder="Collaborator Percentage"
              initialValue={prevState?.collaboratorPercentage || 0}
              disabled={true}
              tooltip={infoText}
              icon={infoIcon}
            />
          </GridItem>
          <GridItem>
            <ContractValueInput
              placeholder="Collaborator Percentage"
              initialValue={chainProject?.collaboratorPercentage || 0}
              callback={updateCollaboratorDetails}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              disabled={chainProject.locked}
            />
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default ChainProjectEditRoyaltyInfo;
