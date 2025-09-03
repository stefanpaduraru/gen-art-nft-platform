import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { PURCHASE_COMPLETE } from "../../../constants/text";
import TokenFrame from "../../App/Tokens/TokenFrame";
import { Box } from "@mui/system";
import { useHistory } from "react-router";
import { Network } from "../../../types/network";
import { MintoriaGallery } from "../../../types/galleries";
import CTAButton from "../Buttons/CTAButton";

type Params = {
  tokenId: number;
  handleClose: Function;
  tokenHash: string;
  script: string;
  gallery: MintoriaGallery;
  network: Network;
  showFullScreenButton?: boolean;
};

export default function TokenDialog({
  tokenId,
  handleClose,
  tokenHash,
  script,
  gallery,
  network,
  showFullScreenButton = false,
}: Params) {
  const history = useHistory();
  const navigateToToken = (id: number) => {
    const url = `/token/${gallery}/${network}/${id}`;
    history.push(url);
  };
  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="md"
    >
      <Box>
        <DialogTitle
          id="dialog-title"
          sx={{
            display: "flex",
            flexDirection: "row",
            maxWidth: "lg",
            alignContent: "center",
          }}
        >
          <Box>{PURCHASE_COMPLETE}</Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,
              justifyContent: "flex-end",
              alignContent: "right",
            }}
          >
            #{tokenId}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ zIndex: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: "1.5rem",
              mb: "1.5rem",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <TokenFrame
              tokenId={tokenId}
              hash={tokenHash}
              script={script}
              width={850}
              height={520}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              mr: 2,
              mb: 2,
              width: "60%",
              alignSelf: "flex-end",
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            <CTAButton
              text="View"
              callback={() => navigateToToken(tokenId)}
              variant="outlined"
              sx={{
                height: "40px !important",
                borderRadius: "40px !important",
                width: "auto !important",
              }}
              autoFocus
            />

            <CTAButton
              text="Close"
              callback={() => handleClose()}
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
      </Box>
    </Dialog>
  );
}
