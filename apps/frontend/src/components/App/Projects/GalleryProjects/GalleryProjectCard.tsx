import React from "react";
import {
  CardActionArea,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Project } from "../../../../types/project";
import { ethers } from "ethers";
import CardMedia from "@mui/material/CardMedia";

import {
  ACTIVE,
  INACTIVE,
  MINTING_PAUSED,
  MINTING_UNPAUSED,
  LOCKED,
  UNLOCKED,
} from "../../../../constants/text";
import Routes from "../../../../constants/routes";
import { Network } from "../../../../types/network";
import {
  MintoriaGalleries,
  MintoriaGallery,
} from "../../../../types/galleries";
import StyledCard from "../common/StyledCard";
import ProjectCardLabel from "../common/ProjectCardLabel";
import { getProjectPlaceholder } from "../../../../util/project";
import LabelContainer from "../common/LabelContainer";
import { formatDateShort } from "../../../../util/dateFormatter";

type Props = {
  project: Project;
  disableEditing?: boolean;
  gallery?: MintoriaGallery;
  network: Network;
};
const ProjectCard = ({
  project,
  disableEditing = false,
  gallery,
  network,
}: Props) => {
  const coverImage =
    project.featuredToken && project.featuredToken.imageURL
      ? project.featuredToken.imageURL
      : getProjectPlaceholder(project.id);

  const linkTo = Routes.getGalleryProjectDetails(
    project.chainId || project.id,
    gallery || MintoriaGalleries.Selected
  );
  const artist = project.user?.name || project.artist;
  const progress =
    100 *
    (parseInt(project.iterations, 10) /
      parseInt(`${project.maxIterations}`, 10));
  const isUpcomingProject =
    !!project.startingAt &&
    new Date(project.startingAt).getTime() >= Date.now();
  return (
    <StyledCard>
      <CardActionArea component={Link} to={linkTo}>
        <CardMedia
          component="img"
          height="280"
          image={coverImage}
          alt="Project image"
        />

        <LabelContainer>
          {isUpcomingProject && (
            <ProjectCardLabel text="Upcoming" type="upcoming" />
          )}
          {project.pricePerTokenInWei === "0" && (
            <ProjectCardLabel text="Giveaway" type="giveaway" />
          )}
        </LabelContainer>

        <LinearProgress
          color="secondary"
          value={progress}
          variant="determinate"
        />
        <CardContent>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontSize: "1.87rem" }}
            noWrap
          >
            {project.name}
          </Typography>
          <Typography>by {artist}</Typography>

          {isUpcomingProject && (
            <Typography sx={{ mt: 1 }} color="text.secondary" noWrap>
              Dropping on {formatDateShort(new Date(project.startingAt))}
            </Typography>
          )}

          {!isUpcomingProject && (
            <Typography sx={{ mt: 1 }} color="text.secondary" noWrap>
              Minted {project?.iterations}/{project?.maxIterations} @{" "}
              {project?.pricePerTokenInWei &&
                ethers.utils.formatEther(project?.pricePerTokenInWei)}
              Ξ
              {project.completedAt
                ? " / Completed"
                : project?.paused
                ? ` / ${MINTING_PAUSED}`
                : ` / ${MINTING_UNPAUSED}`}
            </Typography>
          )}

          {!disableEditing &&
            (!project.completedAt || project.iterations) <
              project.maxIterations && (
              <Typography color="text.secondary">
                {!project.isDeployed
                  ? "Not deployed"
                  : `Deployed on ${
                      project.isMainnet ? "mainnet" : "testnet"
                    }`}{" "}
                {" | "}
                {project?.active ? ACTIVE : INACTIVE} {" | "}
                {project?.locked ? LOCKED : UNLOCKED}
              </Typography>
            )}
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default ProjectCard;
