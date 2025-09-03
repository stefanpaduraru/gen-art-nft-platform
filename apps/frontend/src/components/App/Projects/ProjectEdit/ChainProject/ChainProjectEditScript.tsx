import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import { InfoOutlined } from "@mui/icons-material";
import {
  ExtendedProject,
  ProjectMetadata,
  ScriptType,
  ScriptTypes,
} from "../../../../../types/project";
import { Web3ProjectDetails } from "../../../../../types/web3Project";
import ContractValueInput from "./ContractValueInput";
import GridItem from "./GridItem";
import RowTitle from "./RowTitle";
import { defaultStringMetadata } from "../../../../../util/project";

type Props = {
  project: ExtendedProject;
  testnetProjectDetails?: Web3ProjectDetails;
  mainnetProjectDetails?: Web3ProjectDetails;
  addScriptChunk?: (value: string | number) => void;
  updateProjectScriptChunk?: (index: number, value: string | number) => void;
  removeLastProjectScriptChunk?: () => void;
  updateMetadata?: (value: string | number) => void;
};

const ChainProjectEditScript = ({
  project,
  testnetProjectDetails,
  mainnetProjectDetails,
  addScriptChunk,
  updateProjectScriptChunk,
  removeLastProjectScriptChunk,
  updateMetadata,
}: Props) => {
  const chainProject = mainnetProjectDetails || testnetProjectDetails;
  const prevState = !!mainnetProjectDetails ? project.testnetProject : project;

  const metadata: ProjectMetadata = JSON.parse(
    prevState?.metadata || defaultStringMetadata
  );
  const chainMetadata: ProjectMetadata = JSON.parse(
    chainProject?.metadata || defaultStringMetadata
  );
  const [scriptType, setScriptType] = useState<ScriptType>(
    chainMetadata.scriptType as ScriptType
  );
  const [aspectRatio, setAspectRatio] = useState(chainMetadata.aspectRatio);
  const [newMetadata, setNewMetadata] = useState(
    JSON.stringify({ scriptType, aspectRatio })
  );

  let scriptChunks: string[];
  if (!!mainnetProjectDetails) {
    scriptChunks = mainnetProjectDetails?.scriptChunks || [];
  } else if (!!testnetProjectDetails) {
    scriptChunks = testnetProjectDetails?.scriptChunks || [];
  } else {
    scriptChunks = [];
  }

  const infoIcon = (
    <InfoOutlined color="secondary" sx={{ ml: 2, mt: 2, mr: 2.2 }} />
  );
  const infoText = !chainProject?.locked
    ? project.isMainnet
      ? "Original value from the testnet project"
      : "Original value from the project template"
    : "The project is locked, no further editing is possible.";

  const addNewChunk = (v: string | number) => {
    addScriptChunk && addScriptChunk(v);
  };
  const handleScriptTypeChange = (e: any) => {
    setScriptType(e.target.value);
    setNewMetadata(JSON.stringify({ scriptType: e.target.value, aspectRatio }));
  };

  const handleAspectRatioChange = (e: any) => {
    setAspectRatio(e.target.value);
    setNewMetadata(JSON.stringify({ scriptType, aspectRatio: e.target.value }));
  };

  return (
    <>
      {chainProject && (
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", alignItems: "center", pb: 2 }}
          >
            <Grid container spacing={0}>
              <Grid item sm={6} md={2} sx={{ alignItems: "center" }}>
                <Typography variant="body2" sx={{ fontWeight: "600" }}>
                  Script Type
                </Typography>
              </Grid>
              <Grid item sm={6} md={5}>
                <Typography variant="body1" sx={{ pl: 3 }}>
                  {metadata.scriptType}
                </Typography>
              </Grid>
              <Grid item sm={12} md={5} sx={{ pl: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Script Type
                  </InputLabel>
                  <Select
                    labelId="script-type"
                    id="scrip-type-select"
                    value={scriptType}
                    label="Script"
                    onChange={handleScriptTypeChange}
                    disabled={chainProject.locked}
                  >
                    <MenuItem value={ScriptTypes.JAVASCRIPT}>
                      Javascript
                    </MenuItem>
                    <MenuItem value={ScriptTypes.P5JS}>P5JS</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              pb: 2,
              alignItems: "center",
            }}
          >
            <Grid container spacing={0} sx={{ alignItems: "center" }}>
              <Grid item sm={6} md={2}>
                <Typography variant="body2" sx={{ fontWeight: "600" }}>
                  Aspect Ratio
                </Typography>
              </Grid>
              <Grid item sm={6} md={5}>
                <Typography variant="body1" sx={{ pl: 3 }}>
                  {metadata.aspectRatio}
                </Typography>
              </Grid>
              <Grid item sm={12} md={5} sx={{ pl: 1 }}>
                <TextField
                  sx={{ ml: 1, flex: 1, p: 0, flexGrow: 1, pr: 1 }}
                  placeholder={"Aspect Ratio"}
                  onChange={handleAspectRatioChange}
                  value={aspectRatio}
                  fullWidth
                  disabled={chainProject.locked}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              pb: 2,
              alignItems: "center",
            }}
          >
            <Grid item sm={7}></Grid>
            <Grid
              item
              sm={5}
              sx={{
                ml: 2,
                display: "flex",
              }}
            >
              <ContractValueInput
                placeholder={"Metadata"}
                value={newMetadata}
                callback={(v) => updateMetadata && updateMetadata(newMetadata)}
                icon={<PublishIcon />}
                tooltip={"Update script metadata"}
                disabled={chainProject.locked}
              />
            </Grid>
          </Grid>

          <RowTitle text="Script" />
          <GridItem>
            <ContractValueInput
              placeholder="Script"
              initialValue={prevState?.script || ""}
              disabled={true}
              tooltip={infoText}
              icon={infoIcon}
              multiline
              maxRows={5}
            />
          </GridItem>
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
                      callback={(v) =>
                        updateProjectScriptChunk &&
                        updateProjectScriptChunk(i, v)
                      }
                      icon={<PublishIcon />}
                      tooltip={"Update script chunk"}
                      multiline
                      maxRows={5}
                      disabled={chainProject.locked}
                    />
                  </Grid>
                ))}
              {!!scriptChunks.length && (
                <Grid item lg={12} key={"remove"} sx={{ mb: 1, width: "100%" }}>
                  <Button
                    onClick={removeLastProjectScriptChunk}
                    variant="contained"
                    sx={{ ml: 1 }}
                    color="error"
                    disabled={chainProject.locked}
                  >
                    Remove last script
                  </Button>
                </Grid>
              )}
              {!chainProject.locked && (
                <Grid
                  item
                  lg={12}
                  key={"add"}
                  sx={{ width: "100%", display: "flex" }}
                >
                  <ContractValueInput
                    placeholder="New chunk"
                    initialValue=""
                    callback={addNewChunk}
                    icon={<PublishIcon />}
                    tooltip={"Add new script chunk"}
                    multiline
                    maxRows={5}
                  />
                </Grid>
              )}
            </Grid>
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default ChainProjectEditScript;
