import React from "react";
import { Link, Typography } from "@mui/material";
import { Project } from "../../../types/project";
import Routes from "../../../constants/routes";
import { Link as RouterLink } from "react-router-dom";
import { getGalleryByContractName } from "../../../util/gallery";

type Props = {
  project: Project;
};
const ProjectDescription = ({ project }: Props) => {
  const gallery = getGalleryByContractName(project.contract?.name || "");
  return (
    <>
      <Link
        component={RouterLink}
        to={Routes.getGalleryProjectDetails(project.chainId || 0, gallery)}
        sx={{ ml: 1 }}
        underline="none"
      >
        <Typography variant="h3" component="div" sx={{ mt: 0 }}>
          {project?.name}
        </Typography>
      </Link>
      <Typography variant="h5" component="div" sx={{ mt: 1 }}>
        by
        <Link
          component={RouterLink}
          to={Routes.getUserPage(project?.user?.address || "")}
          sx={{ ml: 1 }}
          underline="hover"
        >
          {project?.user?.name || project?.artist || "artist"}
        </Link>
      </Typography>
    </>
  );
};

export default ProjectDescription;
