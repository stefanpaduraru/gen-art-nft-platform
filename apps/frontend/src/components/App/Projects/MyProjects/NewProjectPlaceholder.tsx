import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  MintoriaGalleries,
  MintoriaGallery,
} from "../../../../types/galleries";
import CTAButton from "../../../Common/Buttons/CTAButton";

type Props = {
  openCreateModalCallback: (gallery: MintoriaGallery) => void;
};
const NewProjectPlaceholder = ({ openCreateModalCallback }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="div" sx={{ mt: 3, mb: 3 }}>
        Start Creating Projects
      </Typography>
      <Typography sx={{ mb: 2 }}>
        You can create a project template by choosing one of the options bellow.
      </Typography>

      <Grid container spacing={5} sx={{ mt: 1 }}>
        <Grid item sx={{ display: "flex" }} xs={12} md={6}>
          <GalleryProject
            title="Mintoria Selected"
            text="Selected is Mintoria's curated gallery.
            It's comprised of projects submitted by established artists, or by the artists most voted by the community."
            openCreateModalCallback={() =>
              openCreateModalCallback(MintoriaGalleries.Selected)
            }
          />
        </Grid>
        <Grid item sx={{ display: "flex" }} xs={12} md={6}>
          <GalleryProject
            title="Mintoria Open World"
            text="Open World is the gallery for young artists, without a proven track record in generative art or who don't want to wait for their projects to be curated."
            openCreateModalCallback={() =>
              openCreateModalCallback(MintoriaGalleries.OpenWorld)
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

type GalleryProjectProps = {
  title: string;
  text: string;
  openCreateModalCallback: () => void;
};
const GalleryProject = ({
  title,
  text,
  openCreateModalCallback,
}: GalleryProjectProps) => {
  return (
    <Paper
      elevation={1}
      sx={{
        minHeight: 250,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          mt: 4,
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {title}
      </Typography>
      <Typography
        component="div"
        variant="body1"
        fontWeight={"light"}
        sx={{
          display: "flex",
          flexGrow: 1,
          mt: 3,
          mb: 3,
          pl: 5,
          pr: 5,
        }}
      >
        {text}
      </Typography>
      <CTAButton
        callback={openCreateModalCallback}
        variant="contained"
        sx={{
          alignSelf: "center",
          mb: 4,
          mt: 4,
          width: "60% !important",
        }}
        text="Create Project"
      />
    </Paper>
  );
};

export default NewProjectPlaceholder;
