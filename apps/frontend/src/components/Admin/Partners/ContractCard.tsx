import React from "react";
import { Box, Card, Button, CardContent, Typography } from "@mui/material";
import Routes from "../../../constants/routes";
import { Contract } from "../../../types/contract";
import { useHistory } from "react-router-dom";
import { Networks } from "../../../types/network";

const ContractCard = ({ contract }: { contract: Contract }) => {
  const history = useHistory();
  const navigateToContractMainnet = () => {
    history.push(Routes.getAdminContractDetails(contract.id, Networks.Mainnet));
  };
  const navigateToContractTestnet = () => {
    history.push(Routes.getAdminContractDetails(contract.id, Networks.Testnet));
  };
  return (
    <Card elevation={1}>
      <CardContent>
        <Typography variant="h6" component="div">
          {contract.name}
        </Typography>
        <Typography sx={{ mt: 1, mb: 0.5 }} color="text.secondary">
          {contract.type.toUpperCase()}
        </Typography>

        {/*contract.type === ContractType.Core && (
          <>
            <Typography sx={{ mt: 1, mb: 0 }} color="text.secondary">
              Mainnet projects{": "}
              {(contract.projects || []).filter((p) => p.isMainnet).length}
            </Typography>
            <Typography sx={{ mt: 0, mb: 0.5 }} color="text.secondary">
              Testnet projects{": "}
              {
                (contract.projects || []).filter(
                  (p) => !p.isMainnet && p.isTestnet
                ).length
              }
            </Typography>
          </>
            )*/}
        <Box sx={{ display: "flex" }}>
          <Button
            fullWidth
            variant="text"
            sx={{ flexGrow: 0, width: "auto", display: "inline-flex" }}
            onClick={navigateToContractMainnet}
            color="secondary"
          >
            Mainnet
          </Button>
          <Button
            fullWidth
            variant="text"
            sx={{ flexGrow: 0, width: "auto", display: "inline-flex" }}
            onClick={navigateToContractTestnet}
            color="secondary"
          >
            Testnet
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContractCard;
