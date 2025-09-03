import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DescriptionIcon from "@mui/icons-material/Description";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import CategoryIcon from "@mui/icons-material/Category";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import TabPanel from "../../Common/TabPanel";
import TemplateProjectForm from "./TemplateProjectForm";
import Web3ProjectForm from "./Web3ProjectForm";
import TransferRequests from "./TransferRequests";
import { ExtendedProject } from "../../../types/project";
import { Web3ProjectDetails } from "../../../types/web3Project";
import TokenGallery from "../common/TokenGallery";
import { MintoriaGallery } from "../../../types/galleries";
import { Token } from "../../../types/token";
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

export default function ProjectTabs({
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
}: Props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tokens: Token[] =
    project.mainnetProject?.tokens ||
    project.testnetProject?.tokens ||
    project?.tokens ||
    [];

  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          value={value}
          onChange={handleChange}
          aria-label="project tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            icon={<SnippetFolderIcon />}
            label="Template Details"
            {...a11yProps(0)}
            sx={{ m: 1 }}
          />
          <Tab
            icon={<DescriptionIcon />}
            label="On Chain"
            {...a11yProps(1)}
            sx={{ m: 1 }}
          />
          <Tab
            icon={<CategoryIcon />}
            label="Tokens"
            {...a11yProps(1)}
            sx={{ m: 1 }}
          />
          <Tab
            icon={<DoubleArrowIcon />}
            label="Transfer"
            {...a11yProps(1)}
            sx={{ m: 1 }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {project && (
          <TemplateProjectForm
            project={project}
            addProjectMainnetId={addProjectMainnetId}
            addProjectTestnetId={addProjectTestnetId}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {web3ProjectDetails && (
          <Web3ProjectForm
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
            setProjectFeePercentage={setProjectFeePercentage}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {!!tokens.length && (
          <TokenGallery
            tokens={tokens}
            itemsPerPage={50}
            project={project}
            gallery={gallery}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TransferRequests
          project={project}
          updateRequestCallback={updateRequestCallback}
        />
      </TabPanel>
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
