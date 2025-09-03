import React from "react";
import { Typography, Link, Grid, Chip, Box } from "@mui/material";
import { DropTypes, Project } from "../../../../types/project";
import MintButton from "../../../Common/Buttons/MintButton";
import VoteButton from "../../../Common/Buttons/VoteButton";
import { formatDateLong } from "../../../../util/dateFormatter";
import { ethers } from "ethers";
import Routes from "../../../../constants/routes";
import { Link as RouterLink } from "react-router-dom";
import OpenInNew from "@mui/icons-material/OpenInNew";

type Props = {
  project?: Project;
  mintCallback: Function;
  voteCallback: () => void;
  showVoteButton?: boolean;
  loading: boolean;
  galleryTitle: string;
  galleryURL: string;
  isMintingEnabled?: boolean;
};
const ProjectDescription = ({
  project,
  mintCallback,
  voteCallback,
  loading = false,
  showVoteButton = true,
  galleryTitle,
  galleryURL,
  isMintingEnabled = false,
}: Props) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography
          variant="h3"
          component="div"
          sx={{ mt: 3, display: "flex" }}
        >
          {project?.name}
        </Typography>
        <Chip
          clickable
          component={RouterLink}
          to={`/projects/${galleryURL}`}
          label={galleryTitle}
          variant="filled"
          sx={{ ml: 4, mt: 3, p: 0, borderRadius: 5 }}
        />
      </Box>
      <Typography
        variant="h5"
        component="div"
        sx={{
          mt: 3,
          mb: 1,
          color: "#8e8e8e",
          display: "flex",
          alignItems: "center",
        }}
      >
        by
        <Link
          component={RouterLink}
          to={Routes.getUserPage(project?.user?.address || "")}
          sx={{ ml: 1, color: "#8e8e8e" }}
          underline="hover"
        >
          {project?.user?.name || project?.artist || "artist"}
        </Link>
        {project?.website && (
          <Link href={project.website} sx={{ display: "flex" }} target="_blank">
            <OpenInNew sx={{ ml: 2, color: "#8e8e8e", alignSelf: "center" }} />
          </Link>
        )}
      </Typography>

      <Typography
        variant="body1"
        sx={{ mt: 3, fontSize: "15px", lineHeight: "25px" }}
      >
        {project?.description || "description"}
      </Typography>
      <Grid container spacing={0.5}>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 3.5 }}>
          <Typography
            variant="body1"
            component="span"
            sx={{ fontSize: "15px" }}
          >
            Price Per Token:{" "}
          </Typography>
          <Typography variant="body2" component="span" fontWeight={300}>
            {ethers.utils.formatEther(project?.pricePerTokenInWei || 0)}Ξ
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography
            variant="body1"
            component="span"
            sx={{ fontSize: "15px" }}
          >
            Minted:{" "}
          </Typography>
          <Typography variant="body2" component="span" fontWeight={300}>
            {project?.iterations}/{project?.maxIterations}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography
            variant="body1"
            component="span"
            sx={{ fontSize: "15px" }}
          >
            Max Tokens Per Address:{" "}
          </Typography>
          <Typography variant="body2" component="span" fontWeight={300}>
            {project?.maxTokensPerAddress}
          </Typography>
        </Grid>
        {project?.dropType && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              variant="body1"
              component="span"
              sx={{ fontSize: "15px" }}
            >
              Drop Type:{" "}
            </Typography>
            <Typography variant="body2" component="span" fontWeight={300}>
              {project.dropType === DropTypes.Fixed
                ? "Fixed Price"
                : "Dutch Auction"}
            </Typography>
          </Grid>
        )}
        {project?.dropDetails && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              variant="body1"
              component="span"
              sx={{ fontSize: "15px" }}
            >
              Drop Details:{" "}
            </Typography>
            <Typography variant="body2" component="span" fontWeight={300}>
              {project.dropDetails}
            </Typography>
          </Grid>
        )}
        {project?.additionalDetails && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              variant="body1"
              component="span"
              sx={{ fontSize: "15px" }}
            >
              Other Details:{" "}
            </Typography>

            <pre style={{ whiteSpace: "pre-wrap", margin: 0, padding: 0 }}>
              <Typography variant="body2" component="span" fontWeight={300}>
                {project.additionalDetails}
              </Typography>
            </pre>
          </Grid>
        )}
        {project?.completedAt && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              variant="body1"
              component="span"
              sx={{ fontSize: "15px" }}
            >
              Completed At:{" "}
            </Typography>
            <Typography variant="body2" component="span" fontWeight={300}>
              {formatDateLong(new Date(project?.completedAt))}
            </Typography>
          </Grid>
        )}
        {!!project?.votes && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              variant="body1"
              component="span"
              sx={{ fontSize: "15px" }}
            >
              Community Votes:{" "}
            </Typography>
            <Typography variant="body2" component="span" fontWeight={300}>
              {" "}
              {project?.votes}
            </Typography>
          </Grid>
        )}
      </Grid>
      {project && (
        <Grid container sx={{ mt: 1 }} spacing={4}>
          <Grid item xs={12} md={8}>
            <MintButton
              callback={mintCallback}
              loading={loading}
              disabled={!isMintingEnabled}
              completed={project.iterations === project.maxIterations}
            />
          </Grid>
          {showVoteButton && (
            <Grid item xs={12} md={4}>
              <VoteButton callback={voteCallback} disabled={false} />
            </Grid>
          )}
        </Grid>
      )}
      {/* <Typography variant="body1" component="div" sx={{ mt: 1 }}>
        License: {project?.license}
      </Typography> */}
    </>
  );
};

export default ProjectDescription;
