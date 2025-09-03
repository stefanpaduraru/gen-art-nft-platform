import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField } from "@mui/material";

type Props = {
  handleClose: () => void;
  mintCallback: (
    fromAddress: string,
    projectId: number,
    toAddress: string
  ) => void;
};

const MintTokenForm = ({ handleClose, mintCallback }: Props) => {
  const [projectId, setProjectId] = React.useState(0);
  const onChangeProjectId = (e: any) => {
    setProjectId(e.target.value);
  };
  const [from, setFrom] = React.useState("");
  const onChangeFrom = (e: any) => {
    setFrom(e.target.value);
  };
  const [to, setTo] = React.useState("");
  const onChangeTo = (e: any) => {
    setTo(e.target.value);
  };
  const mint = () => {
    mintCallback(from, projectId, to);
  };
  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Mint Token</DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              sx={{ ml: 1, flex: 1, p: 0, flexGrow: 1 }}
              placeholder="Project Id"
              onChange={onChangeProjectId}
              value={projectId}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ ml: 1, flex: 1, p: 0, flexGrow: 1 }}
              placeholder="From Address"
              onChange={onChangeFrom}
              value={from}
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ ml: 1, flex: 1, p: 0, flexGrow: 1 }}
              placeholder="To Address"
              onChange={onChangeTo}
              value={to}
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={mint}
              sx={{ mt: 1 }}
              color="warning"
              variant="contained"
            >
              Mint Token
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MintTokenForm;
