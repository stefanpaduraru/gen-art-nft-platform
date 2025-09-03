import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { MAX_PROJECT_TOKENS } from "../../../../constants/default";
import { MintoriaGallery } from "../../../../types/galleries";
import { ExtendedProject } from "../../../../types/project";
import { Token } from "../../../../types/token";
import { getProjectPlaceholder } from "../../../../util/project";

type Props = {
  token: Token | null;
  project: ExtendedProject;
  gallery: MintoriaGallery;
};
const TokenLarge = ({ token, project, gallery }: Props) => {
  const coverImage =
    token && token.imageURL
      ? token.imageURL.replace(".thumb", "")
      : getProjectPlaceholder(project.id);
  const opacity = token && token.imageURL ? 1 : 0.5;

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: "transparent",
      }}
    >
      <CardContent
        sx={{
          pt: 4,
          pl: 0,
          pr: 0,
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={coverImage}
            alt={`${token?.token}`}
            style={{
              maxWidth: 550,
              maxHeight: 550,
              opacity: opacity,
            }}
          />
        </Box>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5" component="div" sx={{ mt: 1 }}>
            Mint #{token?.token ? token.token % MAX_PROJECT_TOKENS : ""}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenLarge;
