import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import ContractCard from "./ContractCard";
import { Partner } from "../../../types/partner";

type Props = {
  partner: Partner;
};

const PartnerDetailsPresentational = ({ partner }: Props) => {
  return (
    <Box>
      <Typography variant="h5" component="div" sx={{ mt: 8, mb: 3 }}>
        Partner #{partner.id} - {partner.name}
      </Typography>
      <Grid container spacing={4} sx={{ mt: 1.5 }}>
        {partner.contracts &&
          partner.contracts.map((contract) => (
            <Grid item xs={12} sm={12} md={4} key={contract.id}>
              <ContractCard contract={contract} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};
export default PartnerDetailsPresentational;
