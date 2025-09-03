import {
  Box,
  Grid,
  Modal,
  Typography,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Field } from "formik";
import { Select } from "formik-mui";
import { PROJECT_NAME_HELP } from "../../../constants/text";
import FormTooltip from "../../Common/FormTooltip";
import SubmitButton from "../../Common/Buttons/SubmitButton";
import SaveIcon from "@mui/icons-material/Save";
import { TextField } from "formik-mui";
import { MintoriaGalleries } from "../../../types/galleries";
import { useAuth } from "../../../context/UserContext";
import { User } from "../../../types/user";
import { useCallback, useEffect, useState } from "react";
import { useNotification } from "../../../context/NotificationContext";
import { fetchUserList } from "../../../api/admin/user";

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
          New Project Template
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
                component={Select}
                name="gallery"
                type="select"
                label={"Gallery"}
                sx={{ flexGrow: 1, minWidth: 270 }}
                default={MintoriaGalleries.Selected}
              >
                <MenuItem value={MintoriaGalleries.Selected} selected>
                  Mintoria Selected
                </MenuItem>
                <MenuItem value={MintoriaGalleries.OpenWorld}>
                  Mintoria Open World
                </MenuItem>
              </Field>
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
