import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "../../../Common/TabPanel";
import ChainProjectEditMainDetails from "./ChainProject/ChainProjectEditDetails";
import ChainProjectEditTokenDetails from "./ChainProject/ChainProjectEditTokenDetails";
import ChainProjectEditRoyaltyInfo from "./ChainProject/ChainProjectEditRoyaltyInfo";
import ChainProjectEditScript from "./ChainProject/ChainProjectEditScript";
import ProjectEditMainDetails from "./ProjectEditMainDetails";
import ProjectTransfers from "./ProjectEditTransfer";
import ProjectEditTokenDetails from "./ProjectEditTokenDetails";
import ProjectEditRoyaltyInfo from "./ProjectEditRoyaltyInfo";
import ProjectEditScript from "./ProjectEditScript";
import ProjectEditFeatures from "./ProjectEditFeatures";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import CategoryIcon from "@mui/icons-material/Category";
import MoneyIcon from "@mui/icons-material/Money";
import DescriptionIcon from "@mui/icons-material/Description";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  PROJECT_SCRIPT,
  PROJECT_ROYALTY_INFO,
  PROJECT_TAB_DETAILS,
  PROJECT_TOKEN_DETAILS,
  PROJECT_FEATURES,
  PROJECT_SETTINGS,
} from "../../../../constants/text";
import ProjectValues from "./ProjectValues.interface";
import {
  DropType,
  ExtendedProject,
  ProjectTypes,
} from "../../../../types/project";
import { Web3ProjectDetails } from "../../../../types/web3Project";
import ProjectEditSettings from "./ProjectEditSettings";

type Props = {
  values: Partial<ProjectValues>;
  setValues: any;
  executeScriptCallback: () => void;
  showViewButton: boolean;
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

export default function ProjectTabs({
  values,
  setValues,
  executeScriptCallback,
  showViewButton,
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
}: Props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const chainProject =
    project.mainnetProject || project.testnetProject || project;

  return (
    <Box sx={{ mt: 5 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          textColor="primary"
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
          aria-label="project tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            icon={<SnippetFolderIcon />}
            label={PROJECT_TAB_DETAILS}
            {...a11yProps(0)}
            sx={{ m: 1 }}
          />
          <Tab
            icon={<CategoryIcon />}
            label={PROJECT_TOKEN_DETAILS}
            {...a11yProps(1)}
            sx={{ m: 1 }}
          />
          <Tab
            icon={<MoneyIcon />}
            label={PROJECT_ROYALTY_INFO}
            {...a11yProps(2)}
            sx={{ m: 1 }}
          />
          <Tab
            icon={<DescriptionIcon />}
            label={PROJECT_SCRIPT}
            {...a11yProps(3)}
            sx={{ m: 1 }}
          />

          <Tab
            icon={
              project.isTestnet || project.isMainnet ? (
                <SettingsIcon />
              ) : (
                <AutoAwesomeMotionIcon />
              )
            }
            label={
              project.isTestnet || project.isMainnet
                ? PROJECT_SETTINGS
                : PROJECT_FEATURES
            }
            {...a11yProps(4)}
            sx={{ m: 1 }}
          />

          <Tab
            icon={<DriveFileMoveIcon />}
            label="Transfers"
            {...a11yProps(5)}
            sx={{ m: 1 }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {chainProject.type === ProjectTypes.Template && (
          <ProjectEditMainDetails />
        )}
        {(chainProject.type === ProjectTypes.Testnet ||
          chainProject.type === ProjectTypes.Mainnet) && (
          <ChainProjectEditMainDetails
            project={project}
            testnetProjectDetails={testnetProjectDetails}
            mainnetProjectDetails={mainnetProjectDetails}
            updateProjectName={updateProjectName}
            updateArtistName={updateArtistName}
            updateDescription={updateDescription}
            updateWebsite={updateWebsite}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {chainProject.type === ProjectTypes.Template && (
          <ProjectEditTokenDetails />
        )}
        {(chainProject.type === ProjectTypes.Testnet ||
          chainProject.type === ProjectTypes.Mainnet) && (
          <ChainProjectEditTokenDetails
            project={project}
            testnetProjectDetails={testnetProjectDetails}
            mainnetProjectDetails={mainnetProjectDetails}
            updatePricePerTokenInWei={updatePricePerTokenInWei}
            updateLicense={updateLicense}
            updateMaxIterations={updateMaxIterations}
            updateMaxTokensPerAddress={updateMaxTokensPerAddress}
            updateBaseURI={updateBaseURI}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {chainProject.type === ProjectTypes.Template && (
          <ProjectEditRoyaltyInfo />
        )}
        {(chainProject.type === ProjectTypes.Testnet ||
          chainProject.type === ProjectTypes.Mainnet) && (
          <ChainProjectEditRoyaltyInfo
            project={project}
            testnetProjectDetails={testnetProjectDetails}
            mainnetProjectDetails={mainnetProjectDetails}
            updateSecondaryPercentage={updateSecondaryPercentage}
            updateCollaboratorInfo={updateCollaboratorInfo}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {chainProject.type === ProjectTypes.Template && (
          <ProjectEditScript
            executeScriptCallback={executeScriptCallback}
            showViewButton={showViewButton}
          />
        )}
        {(chainProject.type === ProjectTypes.Testnet ||
          chainProject.type === ProjectTypes.Mainnet) && (
          <ChainProjectEditScript
            project={project}
            testnetProjectDetails={testnetProjectDetails}
            mainnetProjectDetails={mainnetProjectDetails}
            addScriptChunk={addScriptChunk}
            updateProjectScriptChunk={updateProjectScriptChunk}
            removeLastProjectScriptChunk={removeLastProjectScriptChunk}
            updateMetadata={updateMetadata}
          />
        )}
      </TabPanel>

      <TabPanel value={value} index={4}>
        {chainProject.type === ProjectTypes.Template && (
          <ProjectEditFeatures values={values} setValues={setValues} />
        )}

        {(chainProject.type === ProjectTypes.Testnet ||
          chainProject.type === ProjectTypes.Mainnet) && (
          <ProjectEditSettings
            project={project}
            submitProjectSettings={submitProjectSettings}
          />
        )}
      </TabPanel>

      <TabPanel value={value} index={5}>
        <ProjectTransfers project={project} />
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
