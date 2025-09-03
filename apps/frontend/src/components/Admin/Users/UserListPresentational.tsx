import React from "react";
import { Typography, Grid } from "@mui/material";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import DataTable from "../../Common/Data/DataTable";
import DetailsLink from "../common/DetailsLink";
import { User } from "../../../types/user";
import { ProjectTypes } from "../../../types/project";
import { formatDateLong } from "../../../util/dateFormatter";

type Props = {
  users: User[];
};

const UserListPresentational = ({ users }: Props) => {
  const rows: GridRowsProp = users.map((user) => ({
    id: user.id,
    name: `${user.id}|${user.name}`,
    createdAt: user.createdAt,
    projects:
      (user.projects || []).filter(
        (project) => project.type === ProjectTypes.Template
      ).length ?? 0,
    address: user.address,
  }));

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 350,
      renderCell: (params) => {
        const data = params.value.split("|");
        const id: string = data[0];
        const name: string = data[1];
        return (
          <>
            <DetailsLink
              to={`/admin/users/${id}/`}
              text={name}
              sx={{ mr: 1 }}
            />
          </>
        );
      },
    },
    { field: "projects", width: 100, align: "center" },
    { field: "address", width: 375 },
    {
      field: "createdAt",
      width: 150,
      renderCell: (params) => {
        return <>{formatDateLong(new Date(params.value))}</>;
      },
    },
  ];
  return (
    <>
      <Typography variant="h5" component="div" sx={{ mt: 8, mb: 3 }}>
        Users
      </Typography>
      <Grid container spacing={4} sx={{ mt: 1.5 }}>
        <DataTable rows={rows} columns={columns} />
      </Grid>
    </>
  );
};
export default UserListPresentational;
