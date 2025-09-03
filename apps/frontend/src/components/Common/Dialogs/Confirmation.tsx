import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CTAButton from "../Buttons/CTAButton";
import { Box } from "@mui/material";

type Params = {
  confirmCallback: Function;
  cancelCallback: Function;
  title?: string;
  description?: string | JSX.Element | Array<string | JSX.Element>;
};

export default function ConfirmDialog({
  confirmCallback,
  cancelCallback,
  title = "",
  description = "",
}: Params) {
  const handleConfirm = () => {
    if (confirmCallback) confirmCallback();
  };

  const handleCancel = () => {
    if (cancelCallback) cancelCallback();
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              mr: 3,
              mb: 1,
              width: "60%",
              alignSelf: "flex-end",
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            <CTAButton
              text="cancel"
              callback={handleCancel}
              variant="outlined"
              sx={{
                height: "40px !important",
                borderRadius: "40px !important",
                width: "auto !important",
              }}
            />
            <CTAButton
              text="Agree"
              callback={handleConfirm}
              variant="contained"
              sx={{
                height: "40px !important",
                borderRadius: "40px !important",
                width: "auto !important",
                ml: 3,
              }}
              autoFocus
            />
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
