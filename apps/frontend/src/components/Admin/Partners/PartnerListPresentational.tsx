import { Typography, Grid } from "@mui/material";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { Partner } from "../../../types/partner";
import DataTable from "../../Common/Data/DataTable";
import DetailsLink from "../common/DetailsLink";

type Props = {
  partners: Partner[];
};

const PartnerListPresentational = ({ partners }: Props) => {
  const rows: GridRowsProp = partners.map((partner) => ({
    id: partner.id,
    name: `${partner.id}|${partner.name}`,
    createdAtt: partner.createdAt,
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
        return <DetailsLink to={`/admin/partners/${id}`} text={name} />;
      },
    },
    { field: "createdAtt", headerName: "Added on", width: 150 },
  ];
  return (
    <>
      <Typography variant="h5" component="div" sx={{ mt: 8, mb: 3 }}>
        Partners
      </Typography>
      <Grid container spacing={4} sx={{ mt: 1.5 }}>
        <DataTable rows={rows} columns={columns} />
      </Grid>
    </>
  );
};
export default PartnerListPresentational;
