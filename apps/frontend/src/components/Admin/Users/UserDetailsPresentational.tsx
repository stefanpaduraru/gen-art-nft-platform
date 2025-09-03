import React from "react";
import { Typography, Grid, Divider } from "@mui/material";
import ProjectCard from "./ProjectCard";
import InfoRow from "../common/InfoRow";
import { formatAddress } from "../../../util/addressFormatter";
import { MintoriaGalleries } from "../../../types/galleries";
import { AdminUser } from "../../../types/user";

type Props = {
  user: AdminUser;
};

const UserDetailsPresentational = ({ user }: Props) => {
  const formatedMainAddress = formatAddress(user.address);

  return (
    <>
      <Typography variant="h5" component="div" sx={{ mt: 8, mb: 3 }}>
        User #{user.id} - {user.name}
      </Typography>
      <Grid container spacing={4} sx={{ mt: 1.5 }}>
        <Grid item xs={12} sm={12} md={6}>
          <Grid container spacing={2}>
            <InfoRow
              title="Mainnet Address"
              value={formatedMainAddress}
              tooltip={user.address}
            />

            <InfoRow title="Partner" value={user.partner?.name} />
            <InfoRow title="# of projects" value={user.projects.length} />
            <InfoRow
              title="Created at"
              value={
                user.createdAt && new Date(user.createdAt).toLocaleDateString()
              }
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {user.projects.map((project) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                <ProjectCard
                  project={project}
                  projectId={project.id}
                  contract={project.contract}
                  gallery={
                    project.contract.name === "Mintoria Selected"
                      ? MintoriaGalleries.Selected
                      : MintoriaGalleries.OpenWorld
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default UserDetailsPresentational;
