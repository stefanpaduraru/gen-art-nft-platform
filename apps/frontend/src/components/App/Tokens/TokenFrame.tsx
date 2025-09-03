import React, { useCallback, useState } from "react";
import { Box, Typography } from "@mui/material";

const TokenFrame = ({
  script,
  hash,
  tokenId,
  width,
  height,
  rarityScore,
  rarityRank,
  fullscreen = false,
}: {
  script: string;
  hash: string;
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
  const scriptHead = `
  <head>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.js"></script>
    <script>
    let tokenData = {
      hash: "${hash}",
      tokenId: ${tokenId},
    };
    ${script}
    </script>
    <style type="text/css">
    html {
      height: 100%;
    }
    body {
      min-height: 100%;
      margin: 0;
      padding: 0;
    }
    canvas {
      padding: 0;
      margin: auto;
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }</style>
  </head>
  <body>
  </html>`;

  if (fullscreen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }

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
          srcDoc={scriptHead}
          title="frame"
        ></iframe>
      </Box>
      <Typography variant="h5" textAlign="center" sx={{ mt: 1 }}>
        Mint #{tokenId}
      </Typography>
      {rarityScore && rarityScore > 0 && (
        <Typography variant="subtitle1" textAlign="center" sx={{ mt: 1 }}>
          Rarity Score: {rarityScore} - #{rarityRank}
        </Typography>
      )}
    </Box>
  );
};

export default TokenFrame;
