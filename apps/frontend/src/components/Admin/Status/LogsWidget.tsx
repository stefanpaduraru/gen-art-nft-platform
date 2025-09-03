/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Chip, Grid, Typography } from "@mui/material";

import { LogItem } from "../../../types/status";
import { formatDateShort } from "../../../util/dateFormatter";
import { Themes } from "../../../context/ThemeContext";

function LogsWidget({ logs }: { logs: LogItem[] }) {
  return (
    <>
      {logs.map((log) => (
        <LogRow logItem={log} key={log["@id"]} />
      ))}
    </>
  );
}

const formatAppName = (name: string) => {
  switch (name) {
    case "backend.mintoria.io":
      return "backend";

    case "sync.mintoria.io":
      return "sync";

    case "renderer.mintoria.io":
      return "renderer";

    case "api.mintoria.io":
      return "api";
  }
  return name;
};

const LogRow = ({ logItem }: { logItem: LogItem }) => {
  if (logItem["metadata.method"]) {
    return <LogHTTPRow logItem={logItem} />;
  }
  if (!logItem["metadata.method"]) {
    return <LogInfoRow logItem={logItem} />;
  }
  return <></>;
};

const LogHTTPRow = ({ logItem }: { logItem: LogItem }) => (
  <Box
    sx={{
      paddingTop: 1,
      paddingBottom: 1,
      borderBottom: (theme) =>
        theme.palette.mode === Themes.LIGHT
          ? "1px solid #101010"
          : "1px solid #fefefe",
    }}
  >
    <Grid container spacing={0}>
      <Grid
        item
        xs={4}
        sm={4}
        md={2}
        lg={2}
        alignItems="center"
        sx={{ display: "flex" }}
      >
        <Typography variant="body2">
          {formatDateShort(new Date(logItem["@timestamp"]))}
        </Typography>
      </Grid>
      <Grid
        item
        xs={1}
        sm={1}
        md={1}
        lg={1}
        alignItems="center"
        sx={{ display: "flex" }}
      >
        <Chip color="success" label="http" size={"small"} sx={{ ml: 0.5 }} />
      </Grid>
      <Grid
        item
        xs={3}
        sm={2}
        md={2}
        lg={1}
        alignItems="center"
        sx={{ display: "flex" }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography variant="body2">
            {formatAppName(logItem["#application"])}
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={4}
        sm={4}
        md={5}
        lg={5}
        alignItems="flex-start"
        justifyContent={"flex-start"}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Typography variant="body2">{logItem["metadata.url"]}</Typography>
        {
          <Typography variant="body2" fontWeight={"light"} fontStyle="italic">
            {logItem["metadata.headers.host"] && (
              <>Host: {logItem["metadata.headers.host"]}</>
            )}
            {logItem["metadata.headers.x-forwarded-for"] && (
              <>, from: {logItem["metadata.headers.x-forwarded-for"]}</>
            )}
          </Typography>
        }

        {!!logItem["metadata.headers.user-agent"] && (
          <Typography variant="body2" fontWeight={"light"} fontStyle="italic">
            UA: {logItem["metadata.headers.user-agent"]}
          </Typography>
        )}
      </Grid>
    </Grid>
  </Box>
);

const LogInfoRow = ({ logItem }: { logItem: LogItem }) => {
  let chipColor: ChipColor = "info";
  let metadata = "";
  if (logItem["level"] === "error") chipColor = "error";
  switch (logItem["message"]) {
    case "project update":
      metadata = `${logItem["metadata.project"]} (${logItem["metadata.id"]})`;
      break;
    case "token insert":
      metadata = `${logItem["metadata.token"]} (${logItem["metadata.projectId"]} - ${logItem["metadata.network"]})`;
      break;
    case "token render":
      metadata = `${logItem["metadata.token"]} (${logItem["metadata.tokenId"]} - ${logItem["metadata.gallery"]} - ${logItem["metadata.network"]})`;
      break;
    case "token upload":
      metadata = `${logItem["metadata.token"]} (${logItem["metadata.tokenId"]} - ${logItem["metadata.gallery"]} - ${logItem["metadata.network"]})`;
      break;
    case "token rendered":
      metadata = `${logItem["metadata.token"]} (${logItem["metadata.tokenId"]} - ${logItem["metadata.gallery"]} - ${logItem["metadata.network"]})`;
      break;
    default:
      break;
  }

  return (
    <Box
      sx={{
        paddingTop: 1,
        paddingBottom: 1,
        borderBottom: (theme) =>
          theme.palette.mode === Themes.LIGHT
            ? "1px solid #101010"
            : "1px solid #fefefe",
      }}
    >
      <Grid container spacing={0}>
        <Grid
          item
          xs={4}
          sm={4}
          md={2}
          lg={2}
          alignItems="center"
          sx={{ display: "flex" }}
        >
          <Typography variant="body2">
            {formatDateShort(new Date(logItem["@timestamp"]))}
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          alignItems="center"
          sx={{ display: "flex" }}
        >
          <Chip
            label={logItem.level}
            color={chipColor}
            size={"small"}
            sx={{ ml: 0.5 }}
          />
        </Grid>
        <Grid
          item
          xs={3}
          sm={2}
          md={2}
          lg={1}
          alignItems="center"
          sx={{ display: "flex" }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="body2">
              {formatAppName(logItem["#application"])}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sm={4}
          md={5}
          lg={5}
          alignItems="center"
          sx={{ display: "flex" }}
        >
          <Typography variant="body2" fontWeight={700}>
            {logItem["message"]}
          </Typography>
          <Typography variant="body2" fontWeight={"light"} sx={{ ml: 1 }}>
            {metadata}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

type ChipColor =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | undefined;

export default LogsWidget;
