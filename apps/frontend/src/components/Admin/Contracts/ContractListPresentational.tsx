import React from "react";
import { Typography, Grid } from "@mui/material";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Contract } from "../../../types/contract";
import DataTable from "../../Common/Data/DataTable";
import DetailsLink from "../common/DetailsLink";

type Props = {
  contracts: Contract[];
};

const ContractListPresentational = ({ contracts }: Props) => {
  const rows: GridRowsProp = contracts.map((contract) => ({
    id: contract.id,
    name: `${contract.id}|${contract.name}`,
    createdAt: contract.createdAt,
    address: contract.address,
    type: contract.type,
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
            <Typography sx={{ mr: 1 }}>{name}</Typography>
            <DetailsLink
              to={`/admin/contracts/${id}/mainnet`}
              text="Mainnet"
              sx={{ mr: 1 }}
            />
            <DetailsLink to={`/admin/contracts/${id}/testnet`} text="Testnet" />
          </>
        );
      },
    },
    { field: "address", width: 150 },
    { field: "type", width: 150 },
    { field: "createdAt", width: 150 },
  ];
  return (
    <>
      <Typography variant="h5" component="div" sx={{ mt: 8, mb: 3 }}>
        Contracts
      </Typography>
      <Grid container spacing={4} sx={{ mt: 1.5 }}>
        <DataTable rows={rows} columns={columns} />
      </Grid>
    </>
  );
};
export default ContractListPresentational;
