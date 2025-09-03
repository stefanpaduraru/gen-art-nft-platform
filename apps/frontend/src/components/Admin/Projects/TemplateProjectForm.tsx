import React, { useState } from "react";
import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";
import { ExtendedProject } from "../../../types/project";
import InfoRow from "../common/InfoRow";
import { formatAddress } from "../../../util/addressFormatter";
import SendIcon from "@mui/icons-material/Send";

type Props = {
  project: ExtendedProject;
  addProjectMainnetId?: (id: number) => void;
  addProjectTestnetId?: (id: number) => void;
};
const TemplateProjectForm = ({
  project,
  addProjectMainnetId,
  addProjectTestnetId,
}: Props) => {
  const artistAddress = project.user?.address || "";
  const formatedArtistAddress = formatAddress(artistAddress);

  const collabAddress = project.collaboratorAddress || "";
  const formatedCollabAddress = formatAddress(collabAddress);

  const [mainnetIdValue, setMainnetIdValue] = useState(0);
  const [testnetIdValue, setTestnetIdValue] = useState(0);
  return (
    <Grid container spacing={2}>
      <InfoRow
        title="Owner"
        value={`${formatedArtistAddress} - #${project.user?.id}`}
        tooltip={project.user?.address}
      />

      {project.testnetProject && (
        <InfoRow title="Testnet Id" value={project.testnetProject.chainId} />
      )}
      {!project.testnetProject && (
        <>
          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Testnet Id :</Typography>
          </Grid>
          <Grid item xs={8} sm={8} md={8}>
            <ChainIdProjectInput
              label="Add Testnet Project Id"
              callback={() =>
                !!addProjectTestnetId && addProjectTestnetId(testnetIdValue)
              }
              value={testnetIdValue}
              onChange={setTestnetIdValue}
            />
          </Grid>
        </>
      )}

      {project.mainnetProject && (
        <InfoRow title="Mainnet Id" value={project.mainnetProject.chainId} />
      )}
      {!project.mainnetProject && (
        <>
          <Grid item xs={4} sm={4} md={4}>
            <Typography variant="body2">Mainnet Id :</Typography>
          </Grid>
          <Grid item xs={8} sm={8} md={8}>
            <ChainIdProjectInput
              label="Add Mainnet Project Id"
              callback={() =>
                !!addProjectMainnetId && addProjectMainnetId(mainnetIdValue)
              }
              disabled={!project.testnetProject}
              value={mainnetIdValue}
              onChange={setMainnetIdValue}
            />
          </Grid>
        </>
      )}

      <InfoRow
        title="Iterations"
        value={`${project.iterations} / ${project.maxIterations}`}
      />

      <InfoRow
        title="Max Tokens Per Address"
        value={project.maxTokensPerAddress}
      />
      <InfoRow
        title="Price Per Token"
        value={`${ethers.utils.formatEther(
          project.pricePerTokenInWei || 0
        )}  Ξ`}
      />

      <InfoRow title="Website" value={project.website} />
      <InfoRow title="Script Type" value={project.scriptType} />
      <InfoRow title="Render Delay" value={project.renderDelay} />
      <InfoRow title="License" value={project.license} />
      <InfoRow title="Base URI" value={project.baseURI} />
      <InfoRow title="Base IPFS  URI" value={project.baseIpfsURI} />
      <InfoRow title="Metadata" value={project.metadata} />
      <InfoRow
        title="Collab Address"
        value={formatedCollabAddress}
        tooltip={project.collaboratorAddress}
      />
      <InfoRow
        title="Collab Percentage"
        value={project.collaboratorPercentage}
      />
      <InfoRow
        title="Royalty Percentage"
        value={project.royaltyFeePercentage}
      />
      <InfoRow title="Starting At" value={project.startingAt} />
      {project.isCompleted && (
        <InfoRow title="Completed At" value={project.completedAt} />
      )}
    </Grid>
  );
};

const ChainIdProjectInput = ({
  label,
  callback,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  callback: () => void;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}) => {
  return (
    <TextField
      name="chainId"
      type="number"
      label={label}
      sx={{ width: "50%", display: "inline-flex" }}
      multiline={false}
      value={value}
      disabled={disabled}
      onChange={(e: any) => {
        onChange(e.target.value);
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <IconButton aria-label="add feature" onClick={callback} edge="end">
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
export default TemplateProjectForm;
