import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { ExtendedProject } from "../../../types/project";
import { MAX_PROJECT_TOKENS } from "../../../constants/default";
import { MintoriaGallery } from "../../../types/galleries";
import config from "../../../config/config";

type Props = {
  tokenId: number;
  project: ExtendedProject;
  gallery: MintoriaGallery;
};
const TokenLarge = ({ tokenId, project, gallery }: Props) => {
  const chainProject =
    project?.mainnetProject || project?.testnetProject || project;

  const coverImage =
    chainProject.chainId && chainProject.iterations
      ? config.BE_URL + `/token/${tokenId}/${chainProject.id}/image`
      : "/images/project-placeholder.png";
  return (
    <Card elevation={0} sx={{ display: "flex", justifyContent: "center" }}>
      <CardContent>
        <div>
          <img
            src={coverImage}
            height="100%"
            width="100%"
            alt={`${tokenId}`}
            style={{ maxWidth: 400 }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body1" component="div" sx={{ mt: 0.3 }}>
            Mint #{tokenId ? tokenId % MAX_PROJECT_TOKENS : ""}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenLarge;
