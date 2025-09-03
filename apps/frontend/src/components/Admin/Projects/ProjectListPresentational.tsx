import React from "react";
import { Typography, Grid, Button, Badge } from "@mui/material";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ethers } from "ethers";
import { Networks } from "../../../types/network";
import { ExtendedProject } from "../../../types/project";
import { TransferStateTypes } from "../../../types/transferRequest";
import DataTable from "../../Common/Data/DataTable";
import DetailsLink from "../common/DetailsLink";
import { formatDateLong } from "../../../util/dateFormatter";

type Props = {
  projects: ExtendedProject[];
  toggleShowNewProjectForm: Function;
};

const ProjectListPresentational = ({
  projects,
  toggleShowNewProjectForm,
}: Props) => {
  const rows: GridRowsProp = projects.map((project) => {
    const network = !project.isDeployed
      ? Networks.Template
      : project.isMainnet
      ? Networks.Mainnet
      : Networks.Testnet;
    const projectId = project.id;

    const chainProject =
      project?.mainnetProject || project?.testnetProject || project;

    const requests = (project.transferRequests || []).filter(
      (request) => request.state === TransferStateTypes.Created
    );
    return {
      id: project.id,
      name: `${projectId}|${chainProject.name}|${requests.length}`,
      user: `${project.user?.id}|${project.user?.name}`,
      network: `${network}`,
      contract: `${project.contract?.id}|${project.contract?.name}`,
      tokens: `${chainProject.iterations}/${
        chainProject.maxIterations
      } @ ${ethers.utils.formatEther(chainProject.pricePerTokenInWei || 0)}`,
      active: chainProject.active,
      paused: chainProject.paused,
      locked: chainProject.locked,
      createdAt: chainProject.createdAt,
    };
  });

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 350,
      renderCell: (params) => {
        const data = params.value.split("|");
        const id: string = data[0];
        const name: string = data[1];
        const requests: number = data[2];

        return (
          <>
            <DetailsLink
              to={`/admin/projects/${id}/`}
              text={name}
              sx={{ mr: 1 }}
              icon={
                requests > 0 && (
                  <Badge
                    sx={{ ml: 4 }}
                    badgeContent={requests}
                    color="secondary"
                  ></Badge>
                )
              }
            />
          </>
        );
      },
    },
    { field: "network", width: 100, headerName: "Network" },
    {
      field: "contract",
      headerName: "Contract",
      width: 200,
      renderCell: (params) => {
        const data = params.value.split("|");
        const id: string = data[0];
        const name: string = data[1];
        return <DetailsLink to={`/admin/contracts/${id}`} text={name} />;
      },
    },
    {
      field: "user",
      headerName: "Artist",
      width: 150,
      renderCell: (params) => {
        const data = params.value.split("|");
        const id: string = data[0];
        const name: string = data[1];
        return <DetailsLink to={`/admin/users/${id}`} text={name} />;
      },
    },
    {
      field: "tokens",
      headerName: "Tokenomics",
      width: 150,
    },
    {
      field: "active",
      headerName: "Active",
      width: 100,
    },
    { field: "paused", width: 100, headerName: "Paused" },
    { field: "locked", width: 100, headerName: "Locked" },
    {
      field: "createdAt",
      width: 150,
      headerName: "Created At",
      renderCell: (params) => {
        return <>{formatDateLong(new Date(params.value))}</>;
      },
    },
  ];
  return (
    <>
      <Typography variant="h5" component="div" sx={{ mt: 8, mb: 3 }}>
        Projects
      </Typography>
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            pt: "0 !important",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            sx={{ flexGrow: 0, width: "auto" }}
            onClick={() => toggleShowNewProjectForm(true)}
          >
            Create Project Template
          </Button>
        </Grid>

        <Grid item xs={12} sm={12} md={6}></Grid>
        <Grid container spacing={4} sx={{ mt: 1.5 }}>
          <DataTable rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </>
  );
};
export default ProjectListPresentational;
