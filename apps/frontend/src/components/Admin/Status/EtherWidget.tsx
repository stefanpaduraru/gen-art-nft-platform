import React from "react";
import { Box, Typography } from "@mui/material";
import { EtherData } from "../../../types/status";
import WarningIcon from "@mui/icons-material/Warning";

function EtherWidget({ etherData }: { etherData: EtherData }) {
  return (
    <>
      <Box
        sx={{
          paddingTop: 1,
          paddingBottom: 1,
          mb: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" component={"span"} sx={{ mr: 2 }}>
            Low: {etherData.gasPrice.safe}
          </Typography>
          {etherData.gasPrice.safe <= 11 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexGrow: 0,
                backgroundColor: "#2e7d32",
                borderRadius: "5px",
                p: 0.5,
              }}
            >
              <WarningIcon
                sx={{
                  fontSize: "14px !important",
                  margin: "0px !important",
                  color: "#fff !important",
                }}
              />
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            Mid: {etherData.gasPrice.proposed}
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            High: {etherData.gasPrice.fast}
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            Balance: {etherData.balanceInETH}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default EtherWidget;
