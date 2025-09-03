import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import ProjectCard from "../../Projects/GalleryProjects/GalleryProjectCard";
import { Project } from "../../../../types/project";

import { MintoriaGallery } from "../../../../types/galleries";
import { Networks } from "../../../../types/network";

type Props = {
  gallery: MintoriaGallery;
  projects: Project[];
};
function GalleryProjectList({ gallery, projects }: Props) {
  return (
    <>
      <Grid container spacing={4} sx={{ mt: 0 }}>
        {projects.length ? (
          [...projects].map((project, i) => {
            return (
              <Grid item xs={12} md={4} lg={4} key={i}>
                <ProjectCard
                  project={project}
                  disableEditing={true}
                  gallery={gallery}
                  network={Networks.Mainnet}
                />
              </Grid>
            );
          })
        ) : (
          <Grid item>
            <Typography variant="body1" component="div">
              There are no published projects yet. Stay tuned!
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default GalleryProjectList;
