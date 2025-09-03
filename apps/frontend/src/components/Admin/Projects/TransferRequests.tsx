import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ExtendedProject } from "../../../types/project";
import {
  TransferRequest,
  TransferStateTypes,
} from "../../../types/transferRequest";
import { formatDateLong } from "../../../util/dateFormatter";

type Props = {
  project: ExtendedProject;
  updateRequestCallback: (
    id: number,
    state: TransferStateTypes,
    comments: string
  ) => void;
};
const TransferRequests = ({ project, updateRequestCallback }: Props) => {
  return !!project.transferRequests?.length ? (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      {project.transferRequests.map((request) => (
        <Grid item xs={12}>
          <Request
            request={request}
            updateRequestCallback={updateRequestCallback}
          />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography>There are no transfer requests for this project.</Typography>
  );
};

const Request = ({
  request,
  updateRequestCallback,
}: {
  request: TransferRequest;
  updateRequestCallback: (
    id: number,
    state: TransferStateTypes,
    comments: string
  ) => void;
}) => {
  const [comments, setComments] = useState("");
  const onChangeComments = (e: any) => {
    setComments(e.target.value);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        borderBottom: "1px solid #00000040",
        display: "flex",
        alignItems: "center",
        pb: 2,
      }}
    >
      <Grid item sm={4} md={3} lg={1}>
        <Typography>{request.type}</Typography>
      </Grid>
      <Grid item sm={4} md={4} lg={2}>
        <Typography>{request.state}</Typography>
      </Grid>
      <Grid item sm={4} md={4} lg={2}>
        <Typography>{formatDateLong(new Date(request.createdAt))}</Typography>
      </Grid>
      <Grid item sm={4} md={4} lg={2}>
        <Typography>{request.comments}</Typography>
      </Grid>
      <Grid
        item
        sm={4}
        md={4}
        lg={5}
        sx={{ display: "flex", alignItems: "center" }}
      >
        {request.state === TransferStateTypes.Created && (
          <>
            <Button
              color="success"
              variant="contained"
              sx={{ display: "inline-flex" }}
              onClick={() => {
                updateRequestCallback(
                  request.id,
                  TransferStateTypes.Approved,
                  comments
                );
              }}
            >
              Approve
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={{ display: "inline-flex", ml: 2 }}
              onClick={() =>
                updateRequestCallback(
                  request.id,
                  TransferStateTypes.Denied,
                  comments
                )
              }
            >
              Deny
            </Button>
            <TextField
              sx={{ ml: 1, display: "inline-flex" }}
              placeholder={"Comments"}
              onChange={onChangeComments}
              value={comments}
              type={"text"}
            />
          </>
        )}
      </Grid>
    </Grid>
  );
};

const Header = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ borderBottom: "1px solid #00000040", pb: 1 }}
    >
      <Grid item sm={4} md={3} lg={1}>
        <Typography sx={{ fontWeight: "bold" }}>Type</Typography>
      </Grid>
      <Grid item sm={4} md={4} lg={2}>
        <Typography sx={{ fontWeight: "bold" }}>State</Typography>
      </Grid>
      <Grid item sm={4} md={4} lg={2}>
        <Typography sx={{ fontWeight: "bold" }}>Created At</Typography>
      </Grid>
      <Grid item sm={4} md={4} lg={2}>
        <Typography sx={{ fontWeight: "bold" }}>Comments</Typography>
      </Grid>
      <Grid item sm={4} md={4} lg={5} sx={{ fontWeight: "bold" }}>
        Actions
      </Grid>
    </Grid>
  );
};

export default TransferRequests;
