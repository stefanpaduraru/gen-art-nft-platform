import { Modal, Box, Typography, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { PROJECT_NAME_HELP } from "../../../../constants/text";
import {
  MintoriaGallery,
  MintoriaGalleries,
} from "../../../../types/galleries";
import CTAButton from "../../../Common/Buttons/CTAButton";
import FormTooltip from "../../../Common/FormTooltip";

const style = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "1rem",
};

type Props = {
  gallery: MintoriaGallery;
  handleClose: () => void;
  submitForm: (
    name: string,
    pricePerTokenInETH: number,
    gallery: MintoriaGallery
  ) => void;
};
const NewProjectModal = ({ gallery, handleClose, submitForm }: Props) => {
  const [projectName, setProjectName] = useState("");
  const [pricePerTokenInETH, setPricePerTokenInETH] = useState(0);
  const onSubmit = () => {
    submitForm(projectName, pricePerTokenInETH, gallery);
  };

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
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: "flex" }}>
              <TextField
                value={projectName}
                name="name"
                type="text"
                label="Name"
                sx={{ flexGrow: 1, display: "inline-flex" }}
                onChange={(e: any) => {
                  setProjectName(e.target.value);
                }}
              />

              <FormTooltip
                content={
                  <Typography color="inherit">{PROJECT_NAME_HELP}</Typography>
                }
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: "flex" }}>
              <TextField
                name="pricePerTokenInETH"
                type="number"
                label="Price per token in ETH"
                sx={{ flexGrow: 1, display: "inline-flex" }}
                value={pricePerTokenInETH}
                onChange={(e: any) => {
                  setPricePerTokenInETH(e.target.value);
                }}
              />

              <FormTooltip
                content={
                  <Typography color="inherit">
                    Price per token in ETH
                  </Typography>
                }
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: "flex" }}>
              <TextField
                name="gallery"
                type="text"
                label="Gallery"
                sx={{ flexGrow: 1, display: "inline-flex" }}
                disabled={true}
                value={
                  gallery === MintoriaGalleries.Selected
                    ? "Mintoria Selected"
                    : "Mintoria Open World"
                }
              />

              <FormTooltip
                content={
                  <Typography color="inherit">
                    You have chosen{" "}
                    {gallery === MintoriaGalleries.Selected
                      ? "Mintoria Selected"
                      : "Mintoria Open World"}{" "}
                    as the gallery to publish the project in.
                  </Typography>
                }
              />
            </Grid>

            <Grid
              item
              sx={{ mt: 6, display: "flex", justifyContent: "center" }}
              xs={12}
              lg={12}
            >
              <CTAButton
                callback={onSubmit}
                text="Create Project"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewProjectModal;
