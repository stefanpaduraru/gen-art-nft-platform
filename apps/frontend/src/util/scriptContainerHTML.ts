import { ScriptType, ScriptTypes } from "../types/project";

const scriptContainerHTML = (
  hash: string,
  tokenId: number,
  scriptType: ScriptType
) => {
  let lib = "";
  switch (scriptType) {
    case ScriptTypes.P5JS:
      lib = "https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.js";
      break;
    case ScriptTypes.JAVASCRIPT:
      lib = "";
      break;
  }

  return `<html>
  <head>
    <meta charset="utf-8" />
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
      }
      canvas {
        padding: 0;
        margin: 0;
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    </style>
  </head>
  <body>
    <script src="${lib}"></script>
    <script type="text/javascript">
      let tokenData = {
        hash: '${hash}',
        tokenId: '${tokenId}',
      };
      SCRIPT_CODE;

      const notifyParent =  () => {
        const features = getFeatures ? getFeatures(tokenData) : {};
        const featuresMsg = {"event": "features", "features": features}
        window.parent.postMessage(featuresMsg);
      }
     
      window.setTimeout(notifyParent, 100)
    </script>
  </body>
</html>
`;
};

export default scriptContainerHTML;
