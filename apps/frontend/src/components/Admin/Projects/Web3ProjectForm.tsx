import React from "react";
import { Typography, Grid, Button } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import UnpublishedSharpIcon from "@mui/icons-material/UnpublishedSharp";
import { Web3ProjectDetails } from "../../../types/web3Project";
import GridItem from "../common/GridItem";
import ContractValueInput from "../common/ContractValueInput";

type Props = {
  web3ProjectDetails: Web3ProjectDetails;
  updateProjectName: (value: string | number) => void;
  updateArtistAddress: (value: string | number) => void;
  updateArtistName: (value: string | number) => void;
  updatePricePerTokenInWei: (value: string | number) => void;
  updateDescription: (value: string | number) => void;
  updateWebsite: (value: string | number) => void;
  updateLicense: (value: string | number) => void;
  updateMaxIterations: (value: string | number) => void;
  updateMaxTokensPerAddress: (value: string | number) => void;
  setProjectFeePercentage: (value: string | number) => void;
  updateCollaboratorAddress: (value: string | number) => void;
  updateCollaboratorPercentage: (value: string | number) => void;
  updateSecondaryPercentage: (value: string | number) => void;
  updateProjectScriptChunk: (index: number, value: string | number) => void;
  addProjectScriptChunk: (value: string | number) => void;
  removeLastProjectScriptChunk: () => void;
  updateProjectBaseURI: (value: string | number) => void;
  updateProjectBaseIpfsURI: (value: string | number) => void;
  updateProjectScriptMetadata: (value: string | number) => void;
  toggleActiveProject: () => void;
  togglePausedProject: () => void;
  toggleLockedProject: () => void;
};
const Web3ProjectForm = ({
  web3ProjectDetails,
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
  setProjectFeePercentage,
}: Props) => {
  const {
    name,
    artistAddress,
    artist,
    pricePerTokenInWei,
    description,
    website,
    license,
    iterations,
    maxIterations,
    maxTokensPerAddress,
    feePercentage,
    collaboratorAddress,
    collaboratorPercentage,
    royaltyFeePercentage,
    scriptChunks,
    // useStorage,
    baseURI,
    baseIpfsURI,
    active,
    paused,
    locked,
    metadata,
  } = web3ProjectDetails;
  const syncTooltipText = "Sync to contract";
  return (
    <Grid container spacing={10}>
      <Grid item xs={12} sm={12} md={6}>
        <Grid container>
          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Name:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="Name"
              initialValue={name}
              callback={updateProjectName}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
            />
          </GridItem>
          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Artist Address:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="Artist Address"
              initialValue={artistAddress}
              callback={updateArtistAddress}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
            />
          </GridItem>

          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Artist Name:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="Artist Name"
              initialValue={artist}
              callback={updateArtistName}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
            />
          </GridItem>

          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Price:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="Price"
              initialValue={pricePerTokenInWei}
              callback={updatePricePerTokenInWei}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
            />
          </GridItem>

          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Description:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="Description"
              initialValue={description}
              callback={updateDescription}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              multiline
              maxRows={3}
            />
          </GridItem>

          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Website:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="Website"
              initialValue={website}
              callback={updateWebsite}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
            />
          </GridItem>

          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">License:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="License"
              initialValue={license}
              callback={updateLicense}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
            />
          </GridItem>

          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Iterations:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="Iterations"
              initialValue={iterations}
              icon={
                <UnpublishedSharpIcon
                  sx={{ ml: "20px", mt: "16px", mr: "14px" }}
                />
              }
              type="number"
              disabled
            />
          </GridItem>

          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Max Iterations:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="Max Iterations"
              initialValue={maxIterations}
              callback={updateMaxIterations}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              type="number"
            />
          </GridItem>

          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Fee Percentage:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="Fee Percentage"
              initialValue={feePercentage}
              callback={setProjectFeePercentage}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              type="number"
            />
          </GridItem>

          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Max Tokens/Address:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="Max Tokens/Address"
              initialValue={maxTokensPerAddress}
              callback={updateMaxTokensPerAddress}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              type="number"
            />
          </GridItem>

          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Collaborator Address:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="Collaborator Address"
              initialValue={collaboratorAddress}
              callback={updateCollaboratorAddress}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
            />
          </GridItem>

          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Collaborator Percentage:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="Collaborator Percentage"
              initialValue={collaboratorPercentage}
              callback={updateCollaboratorPercentage}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              type="number"
            />
          </GridItem>

          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Royalty Percentage:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="Royalty Fee Percentage"
              initialValue={royaltyFeePercentage}
              callback={updateSecondaryPercentage}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
              type="number"
            />
          </GridItem>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Grid container>
          <Grid item xs={12} sx={{ mb: 5 }}>
            <Grid container>
              <Grid item xs={4} sm={4} md={4}>
                <Button
                  onClick={togglePausedProject}
                  variant="contained"
                  sx={{ ml: 1 }}
                  color={paused ? "success" : "info"}
                >
                  {paused ? "Unpause" : "Pause"}
                </Button>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <Button
                  onClick={toggleActiveProject}
                  variant="contained"
                  sx={{ ml: 1 }}
                  color={active ? "warning" : "success"}
                >
                  {active ? "Deactivate" : "Activate"}
                </Button>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <Button
                  onClick={toggleLockedProject}
                  variant="contained"
                  sx={{ ml: 1 }}
                  color={!locked ? "error" : "success"}
                  disabled={locked}
                >
                  {!locked ? "Lock" : "Locked"}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Base URI:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="Base URI"
              initialValue={baseURI}
              callback={updateProjectBaseURI}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
            />
          </GridItem>

          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Base IPFS URI:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="Base IPFS URI"
              initialValue={baseIpfsURI}
              callback={updateProjectBaseIpfsURI}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
            />
          </GridItem>

          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Script Metadata:</Typography>
          </Grid>
          <GridItem>
            <ContractValueInput
              placeholder="Script Metadata"
              initialValue={metadata}
              callback={updateProjectScriptMetadata}
              icon={<PublishIcon />}
              tooltip={syncTooltipText}
            />
          </GridItem>

          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Script:</Typography>
          </Grid>
          <GridItem>
            <Grid container>
              {scriptChunks &&
                scriptChunks.map((chunk, i) => (
                  <Grid
                    item
                    lg={12}
                    key={i}
                    sx={{ mb: 1, display: "flex", width: "100%" }}
                  >
                    <ContractValueInput
                      placeholder={`Chunk #${i}`}
                      initialValue={chunk}
                      callback={(v) => updateProjectScriptChunk(i, v)}
                      icon={<PublishIcon />}
                      tooltip={syncTooltipText}
                      multiline
                      maxRows={3}
                    />
                  </Grid>
                ))}
              {scriptChunks && (
                <Grid item lg={12} key={"remove"} sx={{ mb: 1, width: "100%" }}>
                  <Button
                    onClick={removeLastProjectScriptChunk}
                    variant="contained"
                    sx={{ ml: 1 }}
                    color="error"
                  >
                    Remove last script
                  </Button>
                </Grid>
              )}
              <Grid
                item
                lg={12}
                key={"add"}
                sx={{ width: "100%", display: "flex" }}
              >
                <ContractValueInput
                  placeholder="New chunk"
                  initialValue=""
                  callback={(v) => addProjectScriptChunk(v)}
                  icon={<PublishIcon />}
                  tooltip={syncTooltipText}
                  multiline
                  maxRows={3}
                />
              </Grid>
            </Grid>
          </GridItem>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Web3ProjectForm;
