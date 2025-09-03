import React from "react";
import { Divider, Grid, Link, Typography } from "@mui/material";
import { Project, ProjectMetadata, ProjectTypes } from "../../../types/project";
import { TokenWithProject } from "../../../types/token";
import { ethers } from "ethers";
import { formatAddress } from "../../../util/addressFormatter";
import { Link as RouterLink } from "react-router-dom";
import Routes from "../../../constants/routes";
import CallMadeSharpIcon from "@mui/icons-material/CallMadeSharp";
import config from "../../../config/config";
import { Networks } from "../../../types/network";
import { defaultStringMetadata } from "../../../util/project";

type Props = {
  project?: Project;
  token?: TokenWithProject;
};
const TokenDetailsSection = ({ project, token }: Props) => {
  const network =
    project?.type === ProjectTypes.Mainnet
      ? Networks.Mainnet
      : Networks.Testnet;

  const networkName =
    network === Networks.Mainnet
      ? config.WEB3_NETWORK_MAINNET
      : config.WEB3_NETWORK_TESTNET;

  const isTestnet = network === Networks.Testnet;

  const metadata: ProjectMetadata = JSON.parse(
    project?.metadata || defaultStringMetadata
  );

  return (
    <>
      <Divider variant="fullWidth" sx={{ mt: 5, mb: 5 }} />
      <Typography variant="body1" component="div" sx={{ mt: 0 }}>
        {project?.description}
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            Base price:{" "}
            {ethers.utils.formatEther(project?.pricePerTokenInWei || 0)}Ξ
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            Current owner:
            <Link
              component={RouterLink}
              to={Routes.getUserPage(token?.owner || "")}
              sx={{ ml: 1 }}
              underline="hover"
            >
              {formatAddress(token?.owner || "")}
            </Link>
          </Typography>
        </Grid>
      </Grid>

      <Grid container sx={{ mt: 0, mb: 3 }} spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            Graphics Library: {metadata.scriptType}
          </Typography>
        </Grid>
        <Grid item sm={12} md={6}>
          <Typography
            variant="body1"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            License: {token?.project.license}
          </Typography>
        </Grid>
      </Grid>

      <Grid container sx={{ mt: 0, mb: 3 }} spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography
            variant="body1"
            component="div"
            sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
          >
            <Link
              target={"_blank"}
              href={`https://${isTestnet ? "testnets." : ""}opensea.io/assets/${
                isTestnet
                  ? project?.contract?.testnetAddress
                  : project?.contract?.address
              }/${token?.token}`}
              underline="hover"
            >
              OpenSea <CallMadeSharpIcon sx={{ fontSize: 16 }} />
            </Link>

            <Link
              target={"_blank"}
              href={`https://${networkName}.etherscan.io/token/${
                isTestnet
                  ? project?.contract?.testnetAddress
                  : project?.contract?.address
              }/?a=${token?.token}`}
              sx={{ ml: 3 }}
              underline="hover"
            >
              Etherscan <CallMadeSharpIcon sx={{ fontSize: 16 }} />
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default TokenDetailsSection;
