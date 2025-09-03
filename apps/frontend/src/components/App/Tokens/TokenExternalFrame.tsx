import React, { useCallback, useState } from "react";
import { Box, Typography } from "@mui/material";
import { TokenWithProject } from "../../../types/token";
import config from "../../../config/config";
import { MintoriaGallery } from "../../../types/galleries";
import { getGalleryByContractName } from "../../../util/gallery";

const TokenExternalFrame = ({
  token,
  tokenId,
  width,
  height,
  fullscreen = false,
}: {
  token: TokenWithProject;
  tokenId: number;
  width: number;
  height: number;
  rarityScore?: number;
  rarityRank?: number;
  fullscreen?: boolean;
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, []);

  window.addEventListener("resize", handleResize);

  if (fullscreen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }
  const gallery: MintoriaGallery = token.project.contract
    ? getGalleryByContractName(token.project.contract?.name)
    : "selected";
  const iframeURL = `${config.BE_URL}/token/${gallery}/${token.token}/render`;

  return (
    <Box>
      <Box
        style={
          fullscreen
            ? {
                position: "absolute",
                inset: "0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: windowWidth,
                height: windowHeight,
                background: "#000000",
              }
            : {}
        }
      >
        <iframe
          key={`${fullscreen ? windowWidth : width}-${
            fullscreen ? windowHeight : height
          }`}
          data-width={+fullscreen}
          frameBorder="false"
          width={fullscreen ? windowWidth : width}
          height={fullscreen ? windowHeight : height}
          src={iframeURL}
          title="frame"
        ></iframe>
        {fullscreen && (
          <Box
            sx={{
              position: "absolute",
              bottom: 15,
              right: 15,
              backgroundColor: "#000000b0",
              p: 1,
              pl: 2,
              pr: 2,
              borderRadius: 1,
            }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              sx={{
                color: "#fff",
              }}
            >
              {token.project.name} #{tokenId}
            </Typography>
            <Typography variant="h6" textAlign="center" sx={{ color: "#fff" }}>
              by {token.project.user?.name}
            </Typography>
          </Box>
        )}
      </Box>
      <Typography variant="h5" textAlign="center" sx={{ mt: 1 }}>
        {token.project.name} #{tokenId}
      </Typography>
    </Box>
  );
};

export default TokenExternalFrame;
