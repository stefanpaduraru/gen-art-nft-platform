import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const ConfirmMetamaskTransactionDialog = () => {
  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title" sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }}>{"Confirm Transaction"}</Box>
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
            <Typography variant="body1">
              Please confirm the Metamask transaction to proceed.
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmMetamaskTransactionDialog;
