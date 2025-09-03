import React from "react";
import Grid from "@mui/material/Grid";
import { ExtendedProject } from "../../../../types/project";
import TokenGallery from "../../Tokens/TokenGallery";
import TokenLarge from "./TokenLarge";
import ProjectDescription from "../common/ProjectDescription";
import {
  MintoriaGallery,
  MintoriaGalleryTitle,
} from "../../../../types/galleries";
import { Network } from "../../../../types/network";
import { Token } from "../../../../types/token";

interface Props {
  project: ExtendedProject;
  mintCallback: Function;
  loading: boolean;
  randomToken: Token | null;
  gallery: MintoriaGallery;
  network: Network;
}

const MyProjectPresentational = ({
  project,
  mintCallback,
  loading = false,
  randomToken = null,
  gallery,
  network,
}: Props) => {
  const chainProject =
    project?.mainnetProject || project?.testnetProject || project;

  const isMintingEnabled = chainProject.iterations < chainProject.maxIterations;

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
            sx={{ pl: "4em !important" }}
          >
            {!!project && (
              <ProjectDescription
                project={chainProject}
                mintCallback={mintCallback}
                loading={loading}
                voteCallback={() => {}}
                showVoteButton={false}
                galleryTitle={MintoriaGalleryTitle[gallery]}
                galleryURL={gallery}
                isMintingEnabled={isMintingEnabled}
              />
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 8 }}>
        {!!chainProject?.tokens?.length && !!project && (
          <TokenGallery
            tokens={project?.tokens || []}
            tokenURL={`/token/${gallery}/${network}`}
            project={project}
          />
        )}
      </Grid>
    </Grid>
  );
};
export default MyProjectPresentational;
