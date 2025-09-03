import { Grid, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import Routes from "../../../../constants/routes";
import { Themes } from "../../../../context/ThemeContext";
import { MintoriaGalleries } from "../../../../types/galleries";
import { Project } from "../../../../types/project";
import ProjectCardSkeleton from "../../Projects/common/ProjectCardSkeleton";
import GalleryProjectList from "./GalleryProjectList";

type Props = {
  selectedProjects: Project[];
  openworldProjects: Project[];
  isLoading: boolean;
};

const LinkStyled = styled(Link)(({ theme }) => ({
  "&&": {
    display: "flex",
    textDecoration: "none",
    color: theme.palette.mode === Themes.LIGHT ? "#000000de" : "#fff",
    alignItems: "center",
  },
  "&&:hover": {},
}));

const HomePagePresentational = ({
  selectedProjects,
  openworldProjects,
  isLoading,
}: Props) => {
  return (
    <>
      <Box sx={{ mt: 20 }}>
        <Box sx={{ mt: 15 }}>
          <LinkStyled to={Routes.mintoriaSelected}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: 400,
                fontSize: "40px",
                lineHeight: "48px",
                mt: 5,
              }}
              noWrap
            >
              Selected Projects {"→"}
            </Typography>
          </LinkStyled>
          {!isLoading && (
            <GalleryProjectList
              projects={selectedProjects}
              gallery={MintoriaGalleries.Selected}
            />
          )}

          {isLoading && <GallerySkeleton />}
        </Box>

        <Box sx={{ mt: 15 }}>
          <LinkStyled to={Routes.mintoriaOpenWorld}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: 400,
                fontSize: "40px",
                lineHeight: "48px",
                mt: 5,
              }}
              noWrap
            >
              Open World Projects {"→"}
            </Typography>
          </LinkStyled>
          {!isLoading && (
            <GalleryProjectList
              projects={openworldProjects}
              gallery={MintoriaGalleries.OpenWorld}
            />
          )}
          {isLoading && <GallerySkeleton />}
        </Box>
      </Box>
    </>
  );
};

const GallerySkeleton = () => (
  <Grid container spacing={4} sx={{ mt: 2 }}>
    <Grid item>
      <ProjectCardSkeleton />{" "}
    </Grid>
    <Grid item>
      <ProjectCardSkeleton />{" "}
    </Grid>
    <Grid item>
      <ProjectCardSkeleton />{" "}
    </Grid>
  </Grid>
);

export default HomePagePresentational;
