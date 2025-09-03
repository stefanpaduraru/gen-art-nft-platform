import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import { Field } from "formik";
import { PROJECT_NAME_HELP } from "../../../constants/text";
import FormTooltip from "../../Common/FormTooltip";
import SubmitButton from "../../Common/Buttons/SubmitButton";
import SaveIcon from "@mui/icons-material/Save";
import { TextField, Select } from "formik-mui";
import { useCallback, useEffect, useState } from "react";
import { User } from "../../../types/user";
import { fetchUserList } from "../../../api/admin/user";
import { useNotification } from "../../../context/NotificationContext";
import { useAuth } from "../../../context/UserContext";

const style = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type Props = {
  submitForm: (() => Promise<void>) & (() => Promise<any>);
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  isSubmitting: boolean;
};

const NewProjectForm = ({ submitForm, isSubmitting, handleClose }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuth();
  const {
    setNotificationMessage,
    setIsNotificationOpen,
    setNotificationSeverity,
  } = useNotification();

  const getData = useCallback(async () => {
    try {
      const result = await fetchUserList(user.token);
      setUsers(result);
    } catch (e) {
      setNotificationMessage("Can't fetch data.");
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
    }
  }, [
    setIsNotificationOpen,
    setNotificationMessage,
    setNotificationSeverity,
    user.token,
  ]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Modal
      onClose={handleClose}
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, position: "absolute" }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create New Project
        </Typography>
        <Box id="modal-modal-description" sx={{ mt: 2 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Field
                component={TextField}
                name="name"
                type="text"
                label="Name"
                sx={{ width: "80%", display: "inline-flex" }}
              />

              <FormTooltip
                content={
                  <Typography color="inherit">{PROJECT_NAME_HELP}</Typography>
                }
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControl sx={{ width: "80%" }}>
                <Field
                  component={Select}
                  name="artistAddress"
                  type="select"
                  label={"Artist Address"}
                >
                  {users.map((user) => (
                    <MenuItem value={user.address} key={user.address}>
                      {user.name} - {user.address}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>

              <FormTooltip
                content={
                  <Typography color="inherit">Artist Address</Typography>
                }
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Field
                component={TextField}
                name="pricePerTokenInWei"
                type="number"
                label="Price per token in ETH"
                sx={{ width: "80%", display: "inline-flex" }}
              />

              <FormTooltip
                content={
                  <Typography color="inherit">
                    Price per token in wei
                  </Typography>
                }
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Field
                component={TextField}
                name="feePercentage"
                type="number"
                label="Fee percentage"
                sx={{ width: "80%", display: "inline-flex" }}
              />

              <FormTooltip
                content={
                  <Typography color="inherit">
                    Project fee percentage
                  </Typography>
                }
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography color="body1" sx={{ display: "inline-flex", mr: 1 }}>
                Use storage:
              </Typography>
              <label>
                <Field type="radio" name="useStorage" value="yes" />
                yes
              </label>
              <label style={{ marginLeft: "10px" }}>
                <Field type="radio" name="useStorage" value="no" />
                no
              </label>
            </Grid>

            <Grid
              item
              sx={{ mt: 3, display: "flex", justifyContent: "center" }}
              xs={12}
              lg={12}
            >
              <SubmitButton
                submitCallback={submitForm}
                text="Save"
                disabled={isSubmitting}
                icon={<SaveIcon />}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewProjectForm;
