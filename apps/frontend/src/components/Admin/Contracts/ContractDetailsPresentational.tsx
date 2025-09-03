import React, { FunctionComponent } from "react";
import {
  Typography,
  Grid,
  Divider,
  Button,
  TextField,
  Tooltip,
  IconButton,
} from "@mui/material";

import PublishIcon from "@mui/icons-material/Publish";
import UnpublishedSharpIcon from "@mui/icons-material/UnpublishedSharp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AdminContract } from "../../../types/contract";
import { Web3ContractDetails } from "../../../types/web3Contract";
import ProjectCard from "./ProjectCard";
import ContractValueInput from "../common/ContractValueInput";
import InfoRow from "../common/InfoRow";
import { Network, Networks } from "../../../types/network";
import { formatAddress } from "../../../util/addressFormatter";
import { MintoriaGalleries } from "../../../types/galleries";

type Props = {
  contract: AdminContract;
  web3ContractDetails?: Web3ContractDetails;
  network: Network;
  updateRandomizerAddress: (value: string | number) => void;
  updateAdminPercentageAddress: (value: string | number) => void;
  updateMNAAddress: (value: string | number) => void;
  updateMNAPercentage: (value: string | number) => void;
  addOperator: (value: string | number) => void;
  checkOperator: (value: string | number) => void;
  removeOperator: (value: string | number) => void;
  addMinter: (value: string | number) => void;
  checkMinter: (value: string | number) => void;
  removeMinter: (value: string | number) => void;
  toggleShowNewProjectForm: (value: boolean) => void;
  toggleShowProjectDetails: (value: boolean) => void;
  toggleShowMintForm: (value: boolean) => void;
};

const ContractDetailsPresentational = ({
  contract,
  web3ContractDetails,
  network,
  updateRandomizerAddress,
  updateAdminPercentageAddress,
  updateMNAAddress,
  updateMNAPercentage,
  addOperator,
  checkOperator,
  removeOperator,
  addMinter,
  checkMinter,
  removeMinter,
  toggleShowNewProjectForm,
  toggleShowProjectDetails,
  toggleShowMintForm,
}: Props) => {
  const syncTooltipText = "Sync to contract";
  const [operatorAddress, setOperatorAddress] = React.useState("");
  const onChangeOperator = (e: any) => {
    setOperatorAddress(e.target.value);
  };
  const [minterAddress, setMinterAddress] = React.useState("");
  const onChangeMinter = (e: any) => {
    setMinterAddress(e.target.value);
  };
  const formatedMainAddress = formatAddress(contract.address);
  const formatedTestAddress = formatAddress(contract.testnetAddress);
  return (
    <>
      <Typography variant="h5" component="div" sx={{ mt: 8, mb: 3 }}>
        Contract #{contract.id} - {contract.name} | {network}
      </Typography>
      <Grid container spacing={4} sx={{ mt: 1.5 }}>
        {contract.type === "core" && (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mr: 8,
              mb: 2,
              pt: "0 !important",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              sx={{ flexGrow: 0, width: "auto" }}
              onClick={() => toggleShowNewProjectForm(true)}
              color="success"
            >
              New Project
            </Button>

            <Button
              fullWidth
              variant="contained"
              sx={{ flexGrow: 0, width: "auto", ml: 2 }}
              onClick={() => toggleShowProjectDetails(true)}
            >
              Project Details
            </Button>

            <Button
              fullWidth
              variant="contained"
              sx={{ flexGrow: 0, width: "auto", ml: 2 }}
              onClick={() => toggleShowMintForm(true)}
              color="secondary"
            >
              Mint Token
            </Button>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={6}>
          <Grid container spacing={2}>
            <InfoRow title="Type" value={contract.type} />
            <InfoRow
              title="Mainnet Address"
              value={formatedMainAddress}
              tooltip={contract.address}
            />
            <InfoRow
              title="Testnet Address"
              value={formatedTestAddress}
              tooltip={contract.testnetAddress}
            />
            <InfoRow title="Partner" value={contract.partner.name} />
            <InfoRow title="# of projects" value={contract.projects.length} />
            <InfoRow title="Created at" value={contract.createdAt} />
          </Grid>
        </Grid>
        {web3ContractDetails && (
          <Grid item xs={12} sm={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={4}>
                <Typography variant="body2">Randomizer Address:</Typography>
              </Grid>
              <GridItem>
                <ContractValueInput
                  placeholder="Contract Address"
                  initialValue={web3ContractDetails.mintoriaRandomizerContract}
                  callback={updateRandomizerAddress}
                  icon={<PublishIcon />}
                  tooltip={syncTooltipText}
                />
              </GridItem>
              <Grid item xs={4} sm={4} md={4}>
                <Typography variant="body2">Admin Address:</Typography>
              </Grid>
              <GridItem>
                <ContractValueInput
                  placeholder="Mintoria Address"
                  initialValue={web3ContractDetails.adminAddress}
                  icon={
                    <UnpublishedSharpIcon
                      sx={{ ml: "20px", mt: "16px", mr: "14px" }}
                    />
                  }
                  type="text"
                  disabled={true}
                  tooltip={"Syncing disabled"}
                />
              </GridItem>

              <Grid item xs={4} sm={4} md={4}>
                <Typography variant="body2">Admin Percentage:</Typography>
              </Grid>
              <GridItem>
                <ContractValueInput
                  placeholder="Admin Percentage"
                  initialValue={web3ContractDetails.adminFeeSplitPercentage}
                  callback={updateAdminPercentageAddress}
                  icon={<PublishIcon />}
                  type="number"
                  tooltip={syncTooltipText}
                />
              </GridItem>
              <Grid item xs={4} sm={4} md={4}>
                <Typography variant="body2">Mintoria Address:</Typography>
              </Grid>
              <GridItem>
                <ContractValueInput
                  placeholder="Mintoria Address"
                  initialValue={web3ContractDetails.mintoriaAddress}
                  callback={updateMNAAddress}
                  icon={<PublishIcon />}
                  type="text"
                  tooltip={syncTooltipText}
                />
              </GridItem>
              <Grid item xs={4} sm={4} md={4}>
                <Typography variant="body2">Mintoria Percentage:</Typography>
              </Grid>
              <GridItem>
                <ContractValueInput
                  placeholder="MNA Percentage"
                  initialValue={web3ContractDetails.mintoriaFeeSplitPercentage}
                  callback={updateMNAPercentage}
                  icon={<PublishIcon />}
                  type="number"
                  tooltip={syncTooltipText}
                />
              </GridItem>

              <Grid item xs={4} sm={4} md={4}>
                <Typography variant="body2">Operator:</Typography>
              </Grid>
              <Grid
                item
                xs={8}
                sm={8}
                md={8}
                sx={{
                  display: "flex",
                  pt: "0px !important",
                  pl: "8px !important",
                  mb: "10px",
                }}
              >
                <TextField
                  sx={{ ml: 1, flex: 1, p: 0, flexGrow: 1 }}
                  placeholder={"Operator"}
                  onChange={onChangeOperator}
                  value={operatorAddress}
                  type={"text"}
                />
                <Tooltip title={"Check operator exists"}>
                  <IconButton
                    type="submit"
                    sx={{ p: "15px", ml: "5px" }}
                    onClick={() => checkOperator(operatorAddress)}
                  >
                    <CheckCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Add operator"}>
                  <IconButton
                    type="submit"
                    sx={{ p: "15px", ml: "5px" }}
                    onClick={() => addOperator(operatorAddress)}
                  >
                    <PublishIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Remove operator"}>
                  <IconButton
                    type="submit"
                    sx={{ p: "15px", ml: "5px" }}
                    onClick={() => removeOperator(operatorAddress)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </Grid>

              <Grid item xs={4} sm={4} md={4}>
                <Typography variant="body2">Minter:</Typography>
              </Grid>
              <Grid
                item
                xs={8}
                sm={8}
                md={8}
                sx={{
                  display: "flex",
                  pt: "0px !important",
                  pl: "8px !important",
                  mb: "10px",
                }}
              >
                <TextField
                  sx={{ ml: 1, flex: 1, p: 0, flexGrow: 1 }}
                  placeholder={"Minter"}
                  onChange={onChangeMinter}
                  value={minterAddress}
                  type={"text"}
                />
                <Tooltip title={"Check minter exists"}>
                  <IconButton
                    type="submit"
                    sx={{ p: "15px", ml: "5px" }}
                    onClick={() => checkMinter(minterAddress)}
                  >
                    <CheckCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Add minter"}>
                  <IconButton
                    type="submit"
                    sx={{ p: "15px", ml: "5px" }}
                    onClick={() => addMinter(minterAddress)}
                  >
                    <PublishIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Remove minter"}>
                  <IconButton
                    type="submit"
                    sx={{ p: "15px", ml: "5px" }}
                    onClick={() => removeMinter(minterAddress)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </Grid>

              <Grid item xs={4} sm={4} md={4}>
                <Typography variant="body2">Next Project Id:</Typography>
              </Grid>
              <Grid item xs={8} sm={8} md={8}>
                <Typography variant="body2" sx={{ fontWeight: "600" }}>
                  {web3ContractDetails.nextProjectId}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sx={{ mb: 5 }}>
          <Grid container spacing={4}>
            {contract.projects
              .filter((c) =>
                network === Networks.Mainnet ? c.isMainnet : c.isTestnet
              )
              .map((project) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                  <ProjectCard
                    project={project}
                    projectId={project.id}
                    network={network}
                    contract={contract}
                    gallery={
                      contract.name === "Mintoria Selected"
                        ? MintoriaGalleries.Selected
                        : MintoriaGalleries.OpenWorld
                    }
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default ContractDetailsPresentational;

type GridProps = {};

const GridItem: FunctionComponent<GridProps> = ({ children }) => (
  <Grid
    item
    xs={8}
    sm={8}
    md={8}
    sx={{
      display: "flex",
      pt: "0px !important",
      pl: "8px !important",
      mb: "10px",
    }}
  >
    {children}
  </Grid>
);
