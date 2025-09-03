/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import AdminCard from "./AdminCard";
import Routes from "../../constants/routes";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import DescriptionIcon from "@mui/icons-material/Description";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useAuth } from "../../context/UserContext";
import { useHistory } from "react-router-dom";

function AdminDashboard() {
  const iconProps = {
    mr: 1,
    mt: 0.3,
    opacity: 0.8,
  };
  const { user } = useAuth();
  const history = useHistory();

  if (!user.isAdmin && !user.isMintoriaStaff) {
    history.push(Routes.notFoundPage);
  }
  return (
    <Box>
      <Typography variant="h3" component="div" sx={{ mt: 8 }}>
        Admin
      </Typography>
      <Grid container spacing={4} sx={{ mt: 1.5 }}>
        <Grid item xs={12} md={4} lg={4}>
          <AdminCard
            title="Partners"
            route={Routes.adminPartners}
            icon={<ThumbUpIcon sx={iconProps} />}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <AdminCard
            title="Contracts"
            route={Routes.adminContracts}
            icon={<DescriptionIcon sx={iconProps} />}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <AdminCard
            title="Projects"
            route={Routes.adminProjects}
            icon={<SnippetFolderIcon sx={iconProps} />}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <AdminCard
            title="Tokens"
            route={Routes.adminTokens}
            icon={<CategoryIcon sx={iconProps} />}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <AdminCard
            title="Users"
            route={Routes.adminUsers}
            icon={<PeopleAltIcon sx={iconProps} />}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <AdminCard
            title="Status"
            route={Routes.adminStatusPage}
            icon={<DashboardIcon sx={iconProps} />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
