import React from "react";
import {
  DropType,
  ExtendedProject,
  ProjectTypes,
} from "../../../../types/project";
import ProjectEditForm from "./ProjectEditForm";
import { Token } from "../../../../types/token";
import { Box, Chip, Typography } from "@mui/material";
import ProjectValues from "./ProjectValues.interface";
import { Web3ProjectDetails } from "../../../../types/web3Project";
interface Props {
  project: ExtendedProject;
  tokens?: Token[];
  submitCallback: Function;
  requestTransfer: () => void;
  isSubmitting: boolean;
  values: Partial<ProjectValues>;
  setValues: any;
  executeScriptCallback: () => void;
  showViewButton: boolean;
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
  addScriptChunk?: (value: string | number) => void;
  updateProjectScriptChunk?: (index: number, value: string | number) => void;
  removeLastProjectScriptChunk?: () => void;
  updateCollaboratorInfo?: (address: string, percentage: number) => void;
  updateBaseURI?: (baseURI: string | number) => void;
  updateMetadata?: (value: string | number) => void;
  isLoading?: boolean;
  showTransferButton: boolean;
  submitProjectSettings: (
    dropType: DropType,
    dropDetails: string,
    additionalDetails: string,
    renderDelay: number
  ) => void;
}

const ProjectEditPresentational = ({
  project,
  tokens = [],
  submitCallback,
  requestTransfer,
  isSubmitting,
  values,
  setValues,
  executeScriptCallback,
  showViewButton,
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
  isLoading = false,
  showTransferButton,
  submitProjectSettings,
}: Props) => {
  const chainProject =
    project.mainnetProject || project.testnetProject || project;
  return (
    <>
      {/*<LinearProgress sx={{ width: isSubmitting ? "auto" : 0 }} />*/}
      <Box sx={{ display: "flex", alignItems: "center", mt: 8 }}>
        <Typography
          variant="h3"
          component="div"
          sx={{ display: "inline-flex" }}
        >
          {`Edit ${project.name}`}
        </Typography>
        {chainProject.type === ProjectTypes.Mainnet && (
          <Chip label="Live on Mainnet" variant="filled" sx={{ ml: 4 }} />
        )}
        {chainProject.type === ProjectTypes.Testnet && (
          <Chip label="Testnet" variant="outlined" sx={{ ml: 4 }} />
        )}
        {chainProject.type === ProjectTypes.Template && (
          <Chip label="Template" variant="outlined" sx={{ ml: 4 }} />
        )}
      </Box>

      <ProjectEditForm
        submitCallback={submitCallback}
        requestTransfer={requestTransfer}
        values={values}
        setValues={setValues}
        executeScriptCallback={executeScriptCallback}
        showViewButton={showViewButton}
        showTransferButton={showTransferButton}
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
    </>
  );
};
export default ProjectEditPresentational;
