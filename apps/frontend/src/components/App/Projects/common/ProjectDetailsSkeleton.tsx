import React from "react";
import { Box, Grid, Skeleton } from "@mui/material";

const ProjectDetailsSkeleton = () => (
  <>
    <Grid container spacing={0} justifyContent={"center"}>
      <Grid item xs={12}>
        <Grid
          container
          spacing={3}
          sx={{
            mt: 8,
            width: "100% !important",
            ml: 0,
          }}
        >
          <Grid
            item
            sm={12}
            md={6}
            lg={6}
            sx={{
              display: { sm: "none", xs: "none", md: "block" },
            }}
          >
            <Skeleton variant="rectangular" width={"100%"} height={550} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              pl: {
                xs: "0px !important",
                sm: "0px !important",
                md: "4em !important",
              },
            }}
          >
            <Box sx={{ m: 0, flexGrow: 1, alignItems: "flex-start" }}>
              <Skeleton variant="text" animation="wave" height={80} />
              <Skeleton
                variant="text"
                animation="wave"
                height={40}
                sx={{ mt: 2 }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                height={160}
                sx={{ mt: 2 }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                height={30}
                sx={{ mt: 5 }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                height={30}
                sx={{ mt: 1 }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                height={30}
                sx={{ mt: 1 }}
              />
              <Box sx={{ mt: 1, display: "flex", flexDirection: "row" }}>
                <Skeleton
                  variant="text"
                  animation="wave"
                  height={100}
                  width={260}
                  sx={{ borderRadius: "40px", p: "6px 16px" }}
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  height={100}
                  sx={{
                    ml: 5,
                    flexGrow: 1,
                    borderRadius: "40px",
                    p: "6px 16px",
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </>
);

export default ProjectDetailsSkeleton;
