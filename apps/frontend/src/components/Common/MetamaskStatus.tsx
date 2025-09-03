import { Box, Button, Grid, Link, Tooltip, Typography } from "@mui/material";
import { useMetaMask } from "metamask-react";
import { useHistory } from "react-router-dom";
import {
  checkNetworkAndSwitch,
  getAddress,
  getJWToken,
  getNetwork,
} from "../../util/web3";
import { authenticate } from "../../api/app/user";
import { IAuth, useAuth } from "../../context/UserContext";
import ConnectButton from "../Common/Buttons/ConnectButton";
import ConnectButtonMobile from "../Common/Buttons/ConnectButtonMobile";
import { useNotification } from "../../context/NotificationContext";
import MainMenuItemWithDropDown, {
  DropDownItem,
} from "../Common/Menus/MainMenuItemWithDropDown";
import Routes from "../../constants/routes";
import { formatAddress } from "../../util/addressFormatter";
import { Link as RouterLink } from "react-router-dom";
import { Network, Networks } from "../../types/network";
import { useCallback, useEffect, useState } from "react";

type Props = {
  mobile?: boolean;
  closeDrawer?: () => void;
};

const MetamaskStatus = ({ mobile = false, closeDrawer }: Props) => {
  const { status, connect, account } = useMetaMask();
  const [networkName, setNetworkName] = useState("");
  const {
    user,
    setUser,
    setIsAuthenticated,
    setToken,
    setTokenExpirationTimestamp,
  } = useAuth();
  const {
    setNotificationMessage,
    setIsNotificationOpen,
    setNotificationSeverity,
  } = useNotification();
  const history = useHistory();

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

  const disconnect = useCallback(() => {
    setIsAuthenticated(false);
    setUser({
      id: -1,
      address: "",
      name: "",
      isAdmin: false,
      isOperator: false,
      isMintoriaStaff: false,
      bio: "",
    });
    setToken("");
    setTokenExpirationTimestamp(0);
  }, [setIsAuthenticated, setToken, setTokenExpirationTimestamp, setUser]);

  const getNetworkName = useCallback(async () => {
    const network = await getNetwork();
    setNetworkName(network);
  }, []);

  const addChainChangeListener = useCallback(() => {
    if (!window.ethereum) return;
    window.ethereum.on("chainChanged", () => getNetworkName());
  }, [getNetworkName]);

  const addAccountsChangedListener = useCallback(() => {
    if (!window.ethereum) return;
    window.ethereum.on("accountsChanged", (accounts: any) => {
      if (accounts.length && accounts[0] !== user.address) {
        disconnect();
      }
    });
  }, [disconnect, user.address]);

  useEffect(() => {
    getNetworkName();
    addAccountsChangedListener();
    addChainChangeListener();
  }, [addAccountsChangedListener, addChainChangeListener, getNetworkName]);

  useEffect(() => {
    if (
      user.tokenExpirationTimestamp > 0 &&
      user.tokenExpirationTimestamp < Date.now()
    ) {
      disconnect();
    }
  }, [disconnect, getNetworkName, user.tokenExpirationTimestamp]);

  const getNetworkColor = () => {
    if (networkName === "main") {
      return "#2AB6AF";
    }

    if (networkName === "rinkeby") {
      return "#F6C344";
    }

    if (networkName === "ropsten") {
      return "#FF4A8C";
    }

    if (networkName === "private") {
      return "#616e6e";
    }
    return "#fff";
  };

  let statusText;
  if (status === "initializing")
    statusText = <Typography variant="body1">Syncing ...</Typography>;

  if (status === "unavailable")
    statusText = <Typography variant="body1">Unavailable</Typography>;

  if (status === "notConnected")
    statusText = <ConnectButton callback={connectWallet} loading={false} />;

  if (status === "connecting")
    statusText = (
      <Typography variant="body1" color="secondary">
        Connecting ...
      </Typography>
    );

  if (user) {
    if (!mobile) {
      statusText = <ConnectButton callback={connectWallet} loading={false} />;
    } else {
      statusText = (
        <ConnectButtonMobile callback={connectWallet} loading={false} />
      );
    }
  }
  if (user.isAuthenticated && account) {
    const navigateToProfilePage = () => {
      history.push(Routes.getUserPage(account));
    };
    const userMenuItems = [
      {
        text: "My profile",
        callback: navigateToProfilePage,
      },
      {
        text: "Disconnect",
        callback: disconnect,
      },
    ] as DropDownItem[];

    statusText = (
      <MainMenuItemWithDropDown
        buttonText={(account || "").substring(0, 9)}
        items={userMenuItems}
      />
    );
    if (mobile) {
      statusText = (
        <MobileMetamaskStatus
          status={status}
          disconnect={disconnect}
          user={user}
          closeDrawer={closeDrawer}
          networkName={networkName}
          statusColor={getNetworkColor()}
        />
      );
    }
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {!mobile && (
        <NetworkStatus
          networkName={networkName}
          statusColor={getNetworkColor()}
        />
      )}
      {statusText}
    </Box>
  );
};

type NetworkStatusProps = {
  networkName: string;
  statusColor: string;
};
const NetworkStatus = ({ networkName, statusColor }: NetworkStatusProps) => (
  <Tooltip title={`Connected to ${networkName}`}>
    <Box
      sx={{
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: statusColor,
      }}
    />
  </Tooltip>
);

type MobileMetamaskStatusProps = {
  status: string;
  disconnect?: () => void;
  user: IAuth;
  closeDrawer?: () => void;
  networkName: string;
  statusColor: string;
};

const MobileMetamaskStatus = ({
  status,
  disconnect,
  user,
  closeDrawer,
  networkName,
  statusColor,
}: MobileMetamaskStatusProps) => {
  let statusText;
  if (status === "initializing") statusText = "Syncing ...";
  if (status === "unavailable") statusText = "Unavailable";
  if (status === "notConnected") statusText = "Not connected";
  if (status === "connecting") statusText = "Connecting ...";
  if (status === "connected") statusText = "Wallet connected: Metamask";

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#F5F2F2",
        borderRadius: "0.75rem",
        pl: "1rem",
        pr: "1rem",
        display: "flex",
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <NetworkStatus
                networkName={networkName}
                statusColor={statusColor}
              />
              <Typography
                sx={{ ml: 0.5, pt: "0.75rem", pb: "0.75rem", color: "#8e8e8e" }}
              >
                {statusText}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="text"
                onClick={() => disconnect && disconnect()}
                sx={{
                  backgroundColor: "transparent !important",
                  border: "1px solid #8e8e8e",
                  color: "#8e8e8e !important",
                }}
              >
                Disconnect
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Link
            component={RouterLink}
            to={Routes.getUserPage(user?.address || "")}
            sx={{ color: "#8e8e8e" }}
            onClick={closeDrawer}
          >
            <Typography sx={{ pt: "0.75rem", pb: "0.75rem", color: "#8e8e8e" }}>
              {formatAddress(user.address)}
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MetamaskStatus;
