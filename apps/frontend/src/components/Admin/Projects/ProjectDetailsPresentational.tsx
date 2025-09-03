import React from "react";
import { Typography } from "@mui/material";
import { ExtendedProject } from "../../../types/project";
import { Web3ProjectDetails } from "../../../types/web3Project";
import ProjectTabs from "./ProjectTabs";
import { MintoriaGallery } from "../../../types/galleries";
import { TransferStateTypes } from "../../../types/transferRequest";

type Props = {
  project: ExtendedProject;
  web3ProjectDetails?: Web3ProjectDetails;
  gallery: MintoriaGallery;
  updateProjectName: (value: string | number) => void;
  updateArtistAddress: (value: string | number) => void;
  updateArtistName: (value: string | number) => void;
  updatePricePerTokenInWei: (value: string | number) => void;
  updateDescription: (value: string | number) => void;
  updateWebsite: (value: string | number) => void;
  updateLicense: (value: string | number) => void;
  updateMaxIterations: (value: string | number) => void;
  setProjectFeePercentage: (value: string | number) => void;
  updateMaxTokensPerAddress: (value: string | number) => void;
  updateCollaboratorAddress: (value: string | number) => void;
  updateCollaboratorPercentage: (value: string | number) => void;
  updateSecondaryPercentage: (value: string | number) => void;
  updateProjectScriptChunk: (index: number, value: string | number) => void;
  addProjectScriptChunk: (value: string | number) => void;
  removeLastProjectScriptChunk: () => void;
  toggleActiveProject: () => void;
  togglePausedProject: () => void;
  toggleLockedProject: () => void;
  updateProjectBaseURI: (value: string | number) => void;
  updateProjectBaseIpfsURI: (value: string | number) => void;
  updateProjectScriptMetadata: (value: string | number) => void;
  addProjectMainnetId?: (id: number) => void;
  addProjectTestnetId?: (id: number) => void;
  updateRequestCallback: (
    id: number,
    state: TransferStateTypes,
    comments: string
  ) => void;
};

const ProjectDetailsPresentational = ({
  project,
  web3ProjectDetails,
  gallery,
  updateProjectName,
  updateArtistAddress,
  updateArtistName,
  updatePricePerTokenInWei,
  updateDescription,
  updateWebsite,
  updateLicense,
  updateMaxIterations,
  updateMaxTokensPerAddress,
  updateCollaboratorAddress,
  updateCollaboratorPercentage,
  updateSecondaryPercentage,
  updateProjectScriptChunk,
  addProjectScriptChunk,
  removeLastProjectScriptChunk,
  toggleActiveProject,
  togglePausedProject,
  toggleLockedProject,
  updateProjectBaseURI,
  updateProjectBaseIpfsURI,
  updateProjectScriptMetadata,
  addProjectMainnetId,
  addProjectTestnetId,
  updateRequestCallback,
  setProjectFeePercentage,
}: Props) => {
  return (
    <>
      <Typography variant="h5" component="div" sx={{ mt: 8, mb: 3 }}>
        Project #{project.id} - {project.name}
      </Typography>
      <ProjectTabs
        project={project}
        web3ProjectDetails={web3ProjectDetails}
        updateProjectName={updateProjectName}
        updateArtistAddress={updateArtistAddress}
        updateArtistName={updateArtistName}
        updatePricePerTokenInWei={updatePricePerTokenInWei}
        updateDescription={updateDescription}
        updateWebsite={updateWebsite}
        updateLicense={updateLicense}
        updateMaxIterations={updateMaxIterations}
        updateMaxTokensPerAddress={updateMaxTokensPerAddress}
        updateCollaboratorAddress={updateCollaboratorAddress}
        updateCollaboratorPercentage={updateCollaboratorPercentage}
        updateSecondaryPercentage={updateSecondaryPercentage}
        updateProjectScriptChunk={updateProjectScriptChunk}
        addProjectScriptChunk={addProjectScriptChunk}
        removeLastProjectScriptChunk={removeLastProjectScriptChunk}
        toggleActiveProject={toggleActiveProject}
        togglePausedProject={togglePausedProject}
        toggleLockedProject={toggleLockedProject}
        updateProjectBaseURI={updateProjectBaseURI}
        updateProjectBaseIpfsURI={updateProjectBaseIpfsURI}
        updateProjectScriptMetadata={updateProjectScriptMetadata}
        addProjectMainnetId={addProjectMainnetId}
        addProjectTestnetId={addProjectTestnetId}
        gallery={gallery}
        updateRequestCallback={updateRequestCallback}
        setProjectFeePercentage={setProjectFeePercentage}
      />
    </>
  );
};
export default ProjectDetailsPresentational;
