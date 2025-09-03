import React from "react";
import { Box, Typography } from "@mui/material";
import ProjectTabs from "./ProjectTabs";
import ProjectValues from "./ProjectValues.interface";
import {
  DropType,
  ExtendedProject,
  ProjectTypes,
} from "../../../../types/project";
import { Web3ProjectDetails } from "../../../../types/web3Project";
import FormTooltip from "../../../Common/FormTooltip";
import { TransferStateTypes } from "../../../../types/transferRequest";
import CTAButton from "../../../Common/Buttons/CTAButton";

type Props = {
  submitCallback: any;
  requestTransfer?: () => void;
  values: Partial<ProjectValues>;
  setValues: any;
  executeScriptCallback: () => void;
  showViewButton: boolean;
  showTransferButton: boolean;
  project: ExtendedProject;
  testnetProjectDetails?: Web3ProjectDetails;
  mainnetProjectDetails?: Web3ProjectDetails;
  updateProjectName?: (value: string | number) => void;
  updateArtistName?: (value: string | number) => void;
  updateDescription?: (value: string | number) => void;
  updateWebsite?: (value: string | number) => void;
  updatePricePerTokenInWei?: (value: string | number) => void;
  updateLicense?: (value: string | number) => void;
  updateMaxIterations?: (value: string | number) => void;
  updateMaxTokensPerAddress?: (value: string | number) => void;
  updateSecondaryPercentage?: (value: string | number) => void;
  updateCollaboratorInfo?: (address: string, percentage: number) => void;
  addScriptChunk?: (value: string | number) => void;
  updateProjectScriptChunk?: (index: number, value: string | number) => void;
  removeLastProjectScriptChunk?: () => void;
  updateBaseURI?: (uri: string | number) => void;
  updateMetadata?: (uri: string | number) => void;
  submitProjectSettings: (
    dropType: DropType,
    dropDetails: string,
    additionalDetails: string,
    renderDelay: number
  ) => void;
};
const ProjectEditForm = ({
  values,
  setValues,
  submitCallback,
  requestTransfer,
  executeScriptCallback,
  showViewButton,
  showTransferButton,
  project,
  testnetProjectDetails,
  mainnetProjectDetails,
  updateProjectName,
  updateArtistName,
  updateDescription,
  updateWebsite,
  updatePricePerTokenInWei,
  updateLicense,
  updateMaxIterations,
  updateMaxTokensPerAddress,
  updateSecondaryPercentage,
  updateCollaboratorInfo,
  addScriptChunk,
  updateProjectScriptChunk,
  removeLastProjectScriptChunk,
  updateBaseURI,
  updateMetadata,
  submitProjectSettings,
}: Props) => {
  const chainProject =
    project.mainnetProject || project.testnetProject || project;

  const transferTo =
    chainProject.type === ProjectTypes.Template ? "Testnet" : "Mainnet";

  const existingTransfers = !!project?.transferRequests?.filter(
    (t) => t.state === TransferStateTypes.Created
  ).length;

  const deniedTransfers = (project?.transferRequests || []).filter(
    (t) => t.state === TransferStateTypes.Denied
  );

  return (
    <>
      <ProjectTabs
        values={values}
        setValues={setValues}
        executeScriptCallback={executeScriptCallback}
        showViewButton={showViewButton}
        project={project}
        testnetProjectDetails={testnetProjectDetails}
        mainnetProjectDetails={mainnetProjectDetails}
        updateProjectName={updateProjectName}
        updateArtistName={updateArtistName}
        updateDescription={updateDescription}
        updateWebsite={updateWebsite}
        updatePricePerTokenInWei={updatePricePerTokenInWei}
        updateLicense={updateLicense}
        updateMaxIterations={updateMaxIterations}
        updateMaxTokensPerAddress={updateMaxTokensPerAddress}
        updateSecondaryPercentage={updateSecondaryPercentage}
        updateCollaboratorInfo={updateCollaboratorInfo}
        addScriptChunk={addScriptChunk}
        updateProjectScriptChunk={updateProjectScriptChunk}
        removeLastProjectScriptChunk={removeLastProjectScriptChunk}
        updateBaseURI={updateBaseURI}
        updateMetadata={updateMetadata}
        submitProjectSettings={submitProjectSettings}
      />

      <Box
        sx={{
          mt: 3,
          mb: 5,
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          alignItems: "center",
        }}
      >
        {chainProject.type === ProjectTypes.Template && (
          <Box
            sx={{
              minWidth: { xs: "100%", sm: "100%", md: "30%" },
              mb: { xs: 2.5, sm: 2.5, md: 0 },
              mr: { xs: 0, sm: 0, md: 4 },
            }}
          >
            <CTAButton callback={submitCallback} text="Save" />
          </Box>
        )}
        {chainProject.type !== ProjectTypes.Mainnet && (
          <Box
            sx={{
              minWidth: { xs: "100%", sm: "100%", md: "30%" },
              mb: { xs: 2.5, sm: 2.5, md: 0 },
            }}
          >
            <CTAButton
              disabled={!showTransferButton}
              variant="outlined"
              callback={() => !!requestTransfer && requestTransfer()}
              text={`Request Transfer to ${transferTo}`}
            />
          </Box>
        )}
        {chainProject.type !== ProjectTypes.Mainnet && existingTransfers && (
          <Box sx={{ ml: 0, display: "inline-flex" }}>
            <FormTooltip
              mt={0}
              content={
                <Typography color="inherit">
                  {
                    "An on-going transfer request for this project has already been submitted"
                  }
                </Typography>
              }
            />
          </Box>
        )}
        {chainProject.type !== ProjectTypes.Mainnet &&
          !!deniedTransfers &&
          !!deniedTransfers.length && (
            <Box sx={{ ml: 0, display: "inline-flex" }}>
              <FormTooltip
                mt={0}
                content={
                  <Typography color="inherit">{`Your request has been denied. 
                Check the transfers tab for more info`}</Typography>
                }
              />
            </Box>
          )}
        {chainProject.type !== ProjectTypes.Mainnet &&
          !showTransferButton &&
          !deniedTransfers?.length &&
          !existingTransfers && (
            <Box sx={{ ml: 0, display: "inline-flex" }}>
              <FormTooltip
                mt={0}
                content={
                  "Your project is ineligible for transfer. Please fill in all the fields."
                }
              />
            </Box>
          )}
      </Box>
    </>
  );
};

export default ProjectEditForm;
