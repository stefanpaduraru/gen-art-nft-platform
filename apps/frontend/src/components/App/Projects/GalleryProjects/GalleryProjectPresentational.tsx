import React from "react";
import { Project } from "../../../../types/project";
import Grid from "@mui/material/Grid";
import TokenGallery from "../../Tokens/TokenGallery";
import TokenLarge from "../../Tokens/TokenLarge";
import ProjectDescription from "../common/ProjectDescription";
import { Token } from "../../../../types/token";
import {
  MintoriaGallery,
  MintoriaGalleryTitle,
} from "../../../../types/galleries";

interface Props {
  project: Project;
  tokens: Token[];
  mintCallback: Function;
  voteCallback: () => void;
  loading: boolean;
  randomToken: Token | null;
  gallery: MintoriaGallery;
}

const GalleryProjectPresentational = ({
  project,
  tokens = [],
  mintCallback,
  loading = false,
  randomToken = null,
  gallery,
  voteCallback,
}: Props) => {
  const isMintingEnabled =
    project.active &&
    !project.paused &&
    project.iterations < project.maxIterations;

  return (
    <Grid container spacing={0} justifyContent={"center"}>
      <Grid item xs={12}>
        <Grid
          container
          spacing={3}
          sx={{
            mt: 8,
            width: "100% !important",
            ml: 0,
          }}
        >
          <Grid
            item
            sm={12}
            md={6}
            lg={6}
            sx={{
              display: { sm: "none", xs: "none", md: "block" },
              pl: 4,
            }}
          >
            {!!project && (
              <TokenLarge
                token={randomToken}
                project={project}
                gallery={gallery}
              />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              pl: {
                sm: "0 !important",
                xs: "0 !important",
                md: "4em !important",
              },
            }}
          >
            {!!project && (
              <ProjectDescription
                project={project}
                mintCallback={mintCallback}
                loading={loading}
                voteCallback={voteCallback}
                galleryTitle={MintoriaGalleryTitle[gallery]}
                galleryURL={gallery}
                isMintingEnabled={isMintingEnabled}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ mt: 8 }}>
        {!!tokens.length && !!project && (
          <TokenGallery
            project={project}
            tokens={tokens}
            tokenURL={`/token/${gallery}`}
          />
        )}
      </Grid>
    </Grid>
  );
};
export default GalleryProjectPresentational;
