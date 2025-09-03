import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  LinearProgress,
  styled,
  Typography,
} from "@mui/material";

import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Project, ProjectTypes } from "../../../../types/project";
import { ethers } from "ethers";
import EditIcon from "@mui/icons-material/Edit";
import CardMedia from "@mui/material/CardMedia";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import {
  EDIT,
  ACTIVE,
  INACTIVE,
  PAUSED,
  UNPAUSED,
  UNPAUSE_MINTING,
  PAUSE_MINTING,
} from "../../../../constants/text";
import Routes from "../../../../constants/routes";
import { Network } from "../../../../types/network";
import {
  MintoriaGalleries,
  MintoriaGallery,
} from "../../../../types/galleries";
import { getProjectPlaceholder } from "../../../../util/project";
import ProjectCardLabel from "../common/ProjectCardLabel";
import LabelContainer from "../common/LabelContainer";
import { Themes } from "../../../../context/ThemeContext";

type Props = {
  project: Project;
  disableEditing?: boolean;
  gallery?: MintoriaGallery;
  network: Network;
  projectId: number;
  toggleMintingPaused: (project: Project) => void;
};
const ProjectCard = ({
  project,
  disableEditing = false,
  gallery,
  network,
  projectId,
  toggleMintingPaused,
}: Props) => {
  const history = useHistory();
  const editProject = (id: string | number) => {
    const gallery =
      project.contract?.name === "Mintoria Selected"
        ? MintoriaGalleries.Selected
        : MintoriaGalleries.OpenWorld;
    history.push(Routes.getMyProjectEdit(id, network, gallery));
  };

  const coverImage =
    project.chainId && project.iterations && project.featuredToken
      ? project.featuredToken.imageURL
      : getProjectPlaceholder(project.id);
  const opacity =
    project.chainId && project.iterations && project.featuredToken ? 1 : 0.5;

  const linkTo = Routes.getMyProjectDetails(projectId, network);
  const progress = project.iterations
    ? 100 *
      (parseInt(project.iterations, 10) /
        parseInt(`${project.maxIterations}`, 10))
    : 0;

  const isDeployed =
    project.type === ProjectTypes.Mainnet ||
    project.type === ProjectTypes.Testnet;

  return (
    <CardStyled>
      <CardActionArea component={Link} to={linkTo}>
        <CardMedia
          component="img"
          height="280"
          image={coverImage}
          alt="Project image"
          sx={{ opacity }}
        />
        <LabelContainer>
          {!!project.startingAt &&
            new Date(project.startingAt).getTime() >= Date.now() && (
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
          <Typography noWrap>
            {project.contract?.name} | {network}
          </Typography>

          <Typography sx={{ mt: 1 }} color="text.secondary" noWrap>
            Minted {project?.iterations}/{project?.maxIterations} @{" "}
            {project?.pricePerTokenInWei &&
              ethers.utils.formatEther(project?.pricePerTokenInWei)}
            Ξ
          </Typography>

          <Typography color="text.secondary">
            {project.completedAt ? (
              "Completed"
            ) : (
              <>
                {project?.active ? ACTIVE : INACTIVE} {" | "}
                {project?.paused ? PAUSED : UNPAUSED}
              </>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>

      {!disableEditing && (
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => editProject(projectId)}
            startIcon={<EditIcon />}
            disabled={!!project.completedAt}
          >
            {EDIT}
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => toggleMintingPaused(project)}
            startIcon={
              project.paused ? (
                <PlayCircleOutlineIcon />
              ) : (
                <PauseCircleOutlineIcon />
              )
            }
            disabled={!!project.completedAt || !isDeployed}
          >
            {project.paused ? UNPAUSE_MINTING : PAUSE_MINTING}
          </Button>
        </CardActions>
      )}
    </CardStyled>
  );
};

const CardStyled = styled(Card)(({ theme }) => ({
  "&&": {
    borderRadius: "0.75rem",
    boxShadow:
      theme.palette.mode === Themes.LIGHT
        ? "0 22px 44px rgb(0 0 0 / 5%)"
        : "0 22px 44px rgb(255 255 255 / 0%)",
  },
}));

export default ProjectCard;
