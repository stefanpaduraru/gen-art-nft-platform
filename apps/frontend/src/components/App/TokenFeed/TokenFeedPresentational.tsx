import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { MAX_PROJECT_TOKENS } from "../../../constants/default";
import { ProjectMetadata, ScriptTypes } from "../../../types/project";
import { TokenWithProject } from "../../../types/token";
import TokenButtons from "../Tokens/TokenButtons";
import TokenExternalFrame from "../Tokens/TokenExternalFrame";

type Props = {
  token: TokenWithProject;
  isLoading: boolean;
};
const TokenFeedPresentational = ({ token, isLoading }: Props) => {
  const metadata: ProjectMetadata = JSON.parse(
    token.project?.metadata ||
      `{"aspectRatio": 1, "scriptType": "${ScriptTypes.P5JS}"}`
  );
  const aspectRatio = metadata.aspectRatio;
  const [fullscreen, setFullscreen] = useState(false);

  let width = window.innerWidth;
  let height = window.innerHeight;
  if (aspectRatio < 1) {
    height = Math.min(height, 520);
    width = height * aspectRatio;
  } else if (aspectRatio === 1) {
    width = Math.min(width - 48, 520);
    height = width / aspectRatio;
  } else {
    width = Math.min(width - 48, 1152);
    height = width / aspectRatio;
  }

  const openTokenImage = () => {
    const url = token?.imageURL?.replace(".thumb", "");
    if (!url) {
      return;
    }
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const openTokenLiveView = () => {
    const url = token?.liveViewURL;
    if (!url) {
      return;
    }
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const toggleFullScreen = async (on: boolean) => {
    if (on) {
      window.scrollTo(0, 0);
      await document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  };

  const enterFullScreen = useCallback(async () => {
    setFullscreen(true);
    await toggleFullScreen(true);
  }, []);

  const fullscreenChangeHandler = async (event: any) => {
    if (!document.fullscreenElement) {
      setFullscreen(false);
    }
  };

  document.onfullscreenchange = fullscreenChangeHandler;
  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          position: fullscreen ? "initial" : "relative",
        }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box
            sx={{
              height: height,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {!!token && (
              <TokenExternalFrame
                tokenId={token.token % MAX_PROJECT_TOKENS}
                token={token}
                height={height}
                width={width}
                fullscreen={fullscreen}
              />
            )}
          </Box>

          {!fullscreen && (
            <Box sx={{ position: "absolute", right: 0, bottom: 0 }}>
              <TokenButtons
                openTokenImage={openTokenImage}
                openTokenLiveView={openTokenLiveView}
                openFullscreen={enterFullScreen}
              />
            </Box>
          )}
        </Grid>
      </Grid>
      <Grid container sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="body2">{token.project.description}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default TokenFeedPresentational;
