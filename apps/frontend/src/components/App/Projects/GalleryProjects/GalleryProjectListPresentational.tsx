/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import ProjectCard from "./GalleryProjectCard";
import ProjectCardSkeleton from "../common/ProjectCardSkeleton";
import { Project } from "../../../../types/project";
import { Networks } from "../../../../types/network";
import { MintoriaGallery } from "../../../../types/galleries";

type Props = {
  title: string;
  projects: Project[];
  isLoading: boolean;
  gallery: MintoriaGallery;
};
const GalleryProjectListPresentational = ({
  title,
  projects,
  gallery,
  isLoading,
}: Props) => {
  return (
    <>
      <Typography variant="h3" component="div" sx={{ mt: 8 }}>
        {title}
      </Typography>
      {/* {gallery === MintoriaGalleries.Selected && <SelectedUSP />} */}
      {/* <Typography variant="h6" sx={{ mt: 2.5 }}>
        {gallery === MintoriaGalleries.Selected ? selectedText : openworldText}{" "}
      </Typography> */}
      <Grid container spacing={4} sx={{ mt: 1.5 }}>
        {!isLoading &&
          (projects.length ? (
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
                There are no published projects yet.
              </Typography>
            </Grid>
          ))}

        {isLoading && (
          <>
            <Grid item>
              <ProjectCardSkeleton />{" "}
            </Grid>
            <Grid item>
              <ProjectCardSkeleton />{" "}
            </Grid>
            <Grid item>
              <ProjectCardSkeleton />{" "}
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default GalleryProjectListPresentational;
