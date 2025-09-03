import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ExtendedProject } from "../../../types/project";
import { ethers } from "ethers";
import CardMedia from "@mui/material/CardMedia";
import {
  ACTIVE,
  INACTIVE,
  PAUSED,
  UNPAUSED,
  LOCKED,
  UNLOCKED,
} from "../../../constants/text";
import Routes from "../../../constants/routes";
import { Network } from "../../../types/network";
import { Contract } from "../../../types/contract";
import { MintoriaGallery } from "../../../types/galleries";

const ProjectCard = ({
  projectId,
  project,
  network,
  contract,
  gallery,
}: {
  projectId: number;
  project: ExtendedProject;
  network: Network;
  contract: Contract;
  gallery: MintoriaGallery;
}) => {
  const chainProject =
    project.mainnetProject || project.testnetProject || project;

  const coverImage =
    chainProject.featuredToken && chainProject.iterations
      ? chainProject.featuredToken.imageURL
      : "/images/project-placeholder.png";

  return (
    <Card elevation={1}>
      <CardActionArea
        component={Link}
        to={Routes.getAdminProjectDetails(projectId)}
      >
        <CardMedia
          component="img"
          height="140"
          image={coverImage}
          alt="Project image"
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {chainProject.name}
          </Typography>

          <Typography sx={{ mt: 1, mb: 0.5 }} color="text.secondary">
            Minted {chainProject?.iterations}/{chainProject?.maxIterations} @{" "}
            {chainProject?.pricePerTokenInWei &&
              ethers.utils.formatEther(chainProject?.pricePerTokenInWei)}
            Ξ
          </Typography>

          {(!chainProject.completedAt ||
            chainProject.iterations < chainProject.maxIterations) && (
            <Typography color="text.secondary">
              {!project.isDeployed
                ? "Not deployed"
                : `Deployed on ${
                    project.isMainnet ? "mainnet" : "testnet"
                  }`}{" "}
              {" | "}
              {chainProject?.active ? ACTIVE : INACTIVE} {" | "}
              {chainProject?.paused ? PAUSED : UNPAUSED} {" | "}
              {chainProject?.locked ? LOCKED : UNLOCKED}
            </Typography>
          )}
          {chainProject.completedAt &&
            chainProject.iterations === chainProject.maxIterations && (
              <Typography color="text.secondary">
                Project is complete
              </Typography>
            )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;
