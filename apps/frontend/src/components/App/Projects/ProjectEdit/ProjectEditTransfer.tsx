import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ExtendedProject } from "../../../../types/project";
import { formatDateLong } from "../../../../util/dateFormatter";

type Props = {
  project: ExtendedProject;
};
const ProjectTransfers = ({ project }: Props) => {
  return (
    <Grid container spacing={2} sx={{ mt: 1, p: 1 }}>
      <Grid item xs={12} lg={12} key="header">
        <Box sx={{ borderBottom: "1px solid #1e1e1e60", pb: 2, pl: 2 }}>
          <Grid container>
            <Grid sm={3} md={2}>
              <Typography variant="body2">
                <b>Type</b>
              </Typography>
            </Grid>
            <Grid item sm={3} md={2}>
              <Typography variant="body2">
                <b>Status</b>
              </Typography>
            </Grid>
            <Grid item sm={3} md={2}>
              <Typography variant="body2">
                <b>Submitted At</b>
              </Typography>
            </Grid>
            <Grid item sm={3} md={2}>
              <Typography variant="body2">
                <b>Comments</b>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {!!project.transferRequests?.length &&
        project.transferRequests.map((t) => (
          <Grid item xs={12} lg={12} key={t.id} sx={{ pt: "1em !important" }}>
            <Box sx={{ pb: 1, pl: 2, borderBottom: "1px solid #1e1e1e60" }}>
              <Grid container sx={{ display: "flex", alignItems: "center" }}>
                <Grid sm={3} md={2}>
                  <Typography variant="body1">{t.type}</Typography>
                </Grid>
                <Grid item sm={3} md={2}>
                  <Typography variant="body1">{t.state}</Typography>
                </Grid>
                <Grid item sm={3} md={2}>
                  <Typography variant="body1">
                    {formatDateLong(new Date(t.createdAt))}
                  </Typography>
                </Grid>
                <Grid item sm={3} md={6}>
                  <Typography variant="body1">{t.comments}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      {!project.transferRequests?.length && (
        <Box
          sx={{
            p: 0,
            pb: 1,
            width: "100%",
          }}
        >
          <Typography
            variant="body1"
            sx={{ width: "100%", textAlign: "center", p: 1, pt: 4 }}
          >
            There are no transfer requests submitted for this project.
          </Typography>
        </Box>
      )}
    </Grid>
  );
};

export default ProjectTransfers;
