import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField } from "@mui/material";
import { ExtendedUser } from "../../../types/user";

type Props = {
  handleClose: () => void;
  user: ExtendedUser;
  submitCallback: (user: ExtendedUser, name: string, bio?: string) => void;
};

const EditBio = ({ user, handleClose, submitCallback }: Props) => {
  const [name, setName] = React.useState(user.name);
  const [bio, setBio] = React.useState(user.bio);

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };
  const onChangeBio = (e: any) => {
    setBio(e.target.value);
  };
  const submit = () => {
    submitCallback(user, name, bio);
  };
  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Edit Profile</DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              sx={{ flex: 1, p: 0, flexGrow: 1 }}
              placeholder="Name"
              onChange={onChangeName}
              value={name}
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ flex: 1, p: 0, flexGrow: 1 }}
              placeholder="Bio"
              onChange={onChangeBio}
              value={bio}
              type="text"
              fullWidth
              multiline
              maxRows={5}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ mt: 2, pb: 3 }}>
        <Button onClick={submit} variant="outlined">
          Submit
        </Button>
        <Button onClick={handleClose}>close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBio;
