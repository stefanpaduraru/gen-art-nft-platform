import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Web3ProjectDetails } from "../../../types/web3Project";
import { Box, Divider, Grid, TextField } from "@mui/material";
import ReactJson from "react-json-view";

type Props = {
  handleClose: () => void;
  projectDetails?: Web3ProjectDetails;
  fetchDetailsCallback: (projectId: number) => void;
};

const ProjectDetailsDialog = ({
  handleClose,
  projectDetails,
  fetchDetailsCallback,
}: Props) => {
  const [projectId, setProjectId] = React.useState(1);
  const onChange = (e: any) => {
    setProjectId(e.target.value);
  };
  const search = () => {
    fetchDetailsCallback(projectId);
  };
  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Project Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={9}>
            <TextField
              sx={{ ml: 1, flex: 1, p: 0, flexGrow: 1 }}
              placeholder="Project Id"
              onChange={onChange}
              value={projectId}
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Button onClick={search} sx={{ mt: 1 }} variant="outlined">
              Search
            </Button>
          </Grid>
          <Divider />
          <Box sx={{ ml: 6, mr: 6, mt: 3 }}>
            <ReactJson
              src={projectDetails || {}}
              collapsed={1}
              collapseStringsAfterLength={100}
              displayObjectSize={false}
              displayDataTypes={false}
              style={{ fontSize: 13 }}
              name="Project"
            />
          </Box>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDetailsDialog;
