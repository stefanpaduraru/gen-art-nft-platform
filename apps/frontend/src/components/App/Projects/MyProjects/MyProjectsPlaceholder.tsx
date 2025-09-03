/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import CTAButton from "../../../Common/Buttons/CTAButton";
import { useMetaMask } from "metamask-react";
import {
  checkNetworkAndSwitch,
  getAddress,
  getJWToken,
} from "../../../../util/web3";
import { authenticate } from "../../../../api/app/user";
import { useNotification } from "../../../../context/NotificationContext";
import { useAuth } from "../../../../context/UserContext";
import { Network, Networks } from "../../../../types/network";

function MyProjectsPlaceholder() {
  const { connect } = useMetaMask();
  const { setUser, setIsAuthenticated, setToken, setTokenExpirationTimestamp } =
    useAuth();
  const {
    setNotificationMessage,
    setIsNotificationOpen,
    setNotificationSeverity,
  } = useNotification();

  const handleNetworkCheck = useCallback(
    async (network: Network) => {
      const validNetwork = await checkNetworkAndSwitch(network);
      if (!validNetwork) {
        setNotificationMessage("Wrong network");
        setNotificationSeverity("error");
        setIsNotificationOpen(true);
      }
      return validNetwork;
    },
    [setIsNotificationOpen, setNotificationMessage, setNotificationSeverity]
  );

  const connectWallet = async () => {
    const validNetwork = await handleNetworkCheck(Networks.Mainnet);
    if (!validNetwork) return;

    await connect();
    const token = await getJWToken();
    const userResponse = await authenticate({ token });
    if (userResponse) {
      const address = await getAddress();
      const userData = {
        ...userResponse,
        address: address,
      };

      setUser(userData);
      setIsAuthenticated(true);
      setToken(token);
      setTokenExpirationTimestamp(Date.now() + 24 * 3600 * 1000);
    }
  };
  return (
    <Grid container sx={{ width: "100%", pl: 16, pr: 16 }}>
      <Grid
        item
        md={6}
        sm={12}
        lg={6}
        sx={{ p: 2, display: "flex", alignItems: "center" }}
      >
        <Typography
          variant="h3"
          fontWeight={"light"}
          sx={{ fontSize: "2.5rem" }}
        >
          Say goodbye to applications, start adding your projects now!
        </Typography>
      </Grid>
      <Grid item md={6} sm={12} lg={6} sx={{ p: 2 }}>
        <Typography
          variant="body1"
          fontWeight={"light"}
          sx={{ fontSize: "15px", lineHeight: "25px" }}
        >
          On Mintoria.io you don't need to wait for applications to open, or for
          our staff to contact you to start building your project.
          <br />
          Our process is designed so that projects move swiftly from your repo
          to the chain. Just connect your wallet to sign in and start adding
          your generative projects.
        </Typography>
      </Grid>

      <Grid
        item
        md={12}
        sm={12}
        lg={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CTAButton
          text="Connect Wallet To Continue"
          callback={connectWallet}
          sx={{ width: "450px !important" }}
        ></CTAButton>
      </Grid>
    </Grid>
  );
}

export default MyProjectsPlaceholder;
