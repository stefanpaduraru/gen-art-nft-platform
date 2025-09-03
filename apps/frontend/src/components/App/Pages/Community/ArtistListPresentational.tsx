/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import ArtistCard from "./ArtistCard";
import ProjectCardSkeleton from "../../Projects/common/ProjectCardSkeleton";
import { Artist } from "../../../../types/user";

type Props = {
  artists: Artist[];
  isLoading: boolean;
};
const ArtistListPresentational = ({ artists, isLoading }: Props) => {
  return (
    <>
      <Typography variant="h3" component="div" sx={{ mt: 8 }}>
        Mintoria Artists
      </Typography>

      <Grid container spacing={4} sx={{ mt: 1.5 }}>
        {!isLoading &&
          (artists.length ? (
            [...artists].map((artist, i) => {
              return (
                <Grid item xs={12} md={4} lg={4} key={i}>
                  <ArtistCard artist={artist} />
                </Grid>
              );
            })
          ) : (
            <Grid item>
              <Typography variant="body1" component="div">
                There are no published artists yet.
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

export default ArtistListPresentational;
