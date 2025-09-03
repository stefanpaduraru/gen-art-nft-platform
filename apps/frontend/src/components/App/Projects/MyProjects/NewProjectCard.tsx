import React from "react";
import { CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import {
  MintoriaGalleries,
  MintoriaGallery,
} from "../../../../types/galleries";
import { styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import StyledCard from "../common/StyledCard";

type Props = {
  openCreateModalCallback: (gallery: MintoriaGallery) => void;
};
const NewProjectCard = ({ openCreateModalCallback }: Props) => {
  const coverImage = "/images/project-placeholder.png";

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="280"
        image={coverImage}
        alt="Project image"
        sx={{ opacity: 0.5 }}
      />
      <LinearProgress color="secondary" value={0} variant="determinate" />
      <CardContent>
        <Typography variant="h4" component="div" sx={{ fontSize: "1.87rem" }}>
          New Project
        </Typography>
        <Typography>
          Create a new project template by choosing a gallery bellow
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item sx={{ display: "flex" }} xs={6}>
            <GalleryProject
              text={"Selected"}
              openCreateModalCallback={() =>
                openCreateModalCallback(MintoriaGalleries.Selected)
              }
            />
          </Grid>
          <Grid item sx={{ display: "flex" }} xs={6}>
            <GalleryProject
              text={"Open World"}
              openCreateModalCallback={() =>
                openCreateModalCallback(MintoriaGalleries.OpenWorld)
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

const GalleryProject = ({
  text,
  openCreateModalCallback,
}: {
  text: string;
  openCreateModalCallback: () => void;
}) => {
  return (
    <GalleryButtonStyled
      sx={{ flexGrow: 1 }}
      onClick={openCreateModalCallback}
      variant="outlined"
    >
      {text}
    </GalleryButtonStyled>
  );
};

const GalleryButtonStyled = styled(LoadingButton)(({ theme }) => ({
  "&&": {
    width: "100%",
    height: 49,
    borderRadius: 49,
  },
  "&&:hover": {
    fontWeigh: "bold",
  },
}));

export default NewProjectCard;
