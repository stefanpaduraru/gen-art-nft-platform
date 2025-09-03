import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import PortalLoader from "../../../Common/PortalLoader";
import generateRandomHex from "../../../../util/randomHex";

type Props = {
  confirmations: number;
};
const TransactionConfirmationDialog = ({ confirmations }: Props) => {
  const [hash] = useState<string>(generateRandomHex(64));

  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title" sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }}>{"Minting in progress"}</Box>
        <Typography>{`confirmations ${confirmations}/3`}</Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "row",
            mt: "0rem",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mt: 1,
              }}
            >
              <PortalLoader width={200} height={200} hash={hash} />
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography sx={{}} variant="body2">
            <i>
              If the operation takes more than a few minutes, head on to your
              profile page to view your newly minted, unique token.
            </i>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionConfirmationDialog;
