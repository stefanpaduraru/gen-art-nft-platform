/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import ProjectCard from "../Projects/GalleryProjects/GalleryProjectCard";
import { Project } from "../../../types/project";
import { getGalleryByContractName } from "../../../util/gallery";
import { Networks } from "../../../types/network";

type Props = {
  projects: Project[];
};
function UserProjectGallery({ projects }: Props) {
  return (
    <>
      <Grid container spacing={4} sx={{ mt: 1.5, mb: 5 }}>
        {projects.length ? (
          [...projects].map((project, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={i}>
                <ProjectCard
                  project={project}
                  disableEditing={true}
                  gallery={getGalleryByContractName(
                    project.contract?.name || ""
                  )}
                  network={Networks.Mainnet}
                />
              </Grid>
            );
          })
        ) : (
          <Grid item>
            <Typography variant="body1" component="div">
              The user has no published projects.
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default UserProjectGallery;
