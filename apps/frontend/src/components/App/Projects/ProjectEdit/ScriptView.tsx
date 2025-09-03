import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import {
  Project,
  ProjectMetadata,
  ScriptType,
  ScriptTypes,
} from "../../../../types/project";
import generateRandomHex from "../../../../util/randomHex";
import scriptContainerHTML from "../../../../util/scriptContainerHTML";
import { MAX_PROJECT_TOKENS } from "../../../../constants/default";

const ScriptView = ({
  project,
  width,
  height,
  closeScriptViewWindow,
}: {
  project?: Project;
  width: number;
  height: number;
  closeScriptViewWindow: () => void;
}) => {
  const [hash, setHash] = useState<string>(generateRandomHex(64));
  const [tokenId, setTokenId] = useState<number>(
    Math.random() * (199999 - MAX_PROJECT_TOKENS) + MAX_PROJECT_TOKENS
  );
  const [fullScreen, setFullScreen] = useState(false);
  const [features, setFeatures] = useState<{ [key: string]: any }>({});

  const refreshCallback = () => {
    setHash(generateRandomHex(64));
    setTokenId(
      parseInt(
        `${Math.floor(
          Math.random() * (199999 - MAX_PROJECT_TOKENS) + MAX_PROJECT_TOKENS
        )}`,
        10
      )
    );
  };
  const metadata: ProjectMetadata = JSON.parse(project?.metadata || "");
  const scriptType: ScriptType =
    (metadata.scriptType as ScriptType) || ScriptTypes.P5JS;
  const html = scriptContainerHTML(hash, tokenId, scriptType);
  const srcdoc = html.replace("SCRIPT_CODE", project?.script || "");

  useEffect(() => {
    window.addEventListener("message", function (event) {
      if (event && event?.data?.event === "features") {
        setFeatures(event.data?.features || {});
      }
    });
  });

  const onChangeHash = (event: any) => {
    const value = event.target.value;

    setHash(value);
  };

  const onChangeTokenId = (event: any) => {
    const value = event.target.value;

    setTokenId(value);
  };

  const fullscreenChangeHandler = (event: any) => {
    if (!fullScreen) {
      setTimeout(() => {
        setFullScreen(!fullScreen);
      }, 100);
    } else {
      setFullScreen(false);
    }
  };

  document.onfullscreenchange = fullscreenChangeHandler;
  if (fullScreen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }

  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      PaperProps={{
        sx: { maxWidth: "950px !important" },
      }}
    >
      <DialogTitle id="alert-dialog-title">{"Script Live View"}</DialogTitle>
      <DialogContent
        sx={
          fullScreen
            ? { maxWidth: "100%", width: "100%" }
            : {
                display: "flex",
                flexDirection: "row",
              }
        }
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            mt: 2,
            ml: 0,
            width: "100%",
          }}
        >
          <Box
            sx={{
              alignContent: "center",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
              display: "flex",
            }}
          >
            <iframe
              frameBorder="false"
              width={width}
              height={height}
              srcDoc={srcdoc}
              title="frame"
              style={{ display: "block", border: "1px solid #00000090" }}
            ></iframe>
          </Box>
        </Box>
        <Box sx={{ mt: 2, ml: 2, mr: 0, minWidth: "40%" }}>
          <TextField
            sx={{ flex: 1, p: 0, flexGrow: 1 }}
            placeholder={"Hash"}
            onChange={onChangeHash}
            value={hash}
            type={"text"}
            fullWidth
            label="Hash"
            variant="outlined"
          />

          <TextField
            sx={{ flex: 1, p: 0, flexGrow: 1, mt: 2 }}
            label="TokenId"
            variant="outlined"
            placeholder={"TokenId"}
            onChange={onChangeTokenId}
            value={tokenId}
            type={"number"}
            fullWidth
          />

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Token features:</Typography>
            <Box
              sx={{
                mt: 2,
                overflow: "scroll",
                height: "280px",
              }}
            >
              {Object.keys(features).map((key: string) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottom: "1px solid #191919",
                    pb: 0.5,
                    pt: 0.5,
                  }}
                  key={key}
                >
                  <Typography sx={{ lineHeight: 1.8, ml: 1 }}>
                    {key}:{" "}
                  </Typography>
                  <Typography sx={{ lineHeight: 1.8, ml: 1.5 }} variant="body2">
                    {features[key]}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => refreshCallback()} autoFocus>
          Refresh
        </Button>
        <Button onClick={closeScriptViewWindow}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScriptView;
