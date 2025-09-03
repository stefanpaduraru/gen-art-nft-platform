import React from "react";
import { Box } from "@mui/material";
import portalLoaderScript from "../../util/portalLoader";

const PortalLoader = ({
  hash,
  width,
  height,
}: {
  hash: string;
  width: number;
  height: number;
}) => {
  const scriptHead = `
  <head>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.js"></script>
    <script>
    let tokenData = {
      hash: "${hash}",
    };
    ${portalLoaderScript}
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

  return (
    <Box>
      <Box>
        <iframe
          data-width={width}
          frameBorder="false"
          width={width}
          height={height}
          srcDoc={scriptHead}
          title="frame"
        ></iframe>
      </Box>
    </Box>
  );
};

export default PortalLoader;
