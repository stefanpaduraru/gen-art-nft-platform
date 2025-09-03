import React, { useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { MetaMaskProvider } from "metamask-react";
import { Alert, CssBaseline, Snackbar } from "@mui/material";
import { LocalizationProvider } from "@mui/lab";
import Appbar from "./components/Common/Appbar";
import Footer from "./components/Common/Footer";
import PageRoutes from "./components/Routes/PageRoutes";
import AdminRoutes from "./components/Routes/AdminRoutes";
import GalleryRoutes from "./components/Routes/GalleryRoutes";
import UserRoutes from "./components/Routes/UserRoutes";
import TokenRoutes from "./components/Routes/TokenRoutes";
import Main from "./components/App/Main";
import { AuthContext } from "./context/UserContext";
import {
  NotificationContext,
  INotification,
  Severity,
} from "./context/NotificationContext";
import useLocalStorage from "./util/localStorage";
import usePageTracking from "./util/usePageTracking";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import config from "./config/config";
import { ThemeContext, Themes } from "./context/ThemeContext";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import AutoScrollToTop from "./components/Common/ScrollToTop";
import ScrollToTop from "react-scroll-to-top";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#101010",
    },
    background: {
      default: "#fefefe",
    },
  },
  typography: {
    fontWeightLight: 100,
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#cecece",
    },
    background: {
      default: "#181818",
    },
  },
  typography: {
    fontWeightLight: 100,
  },
});

function App() {
  const [user, setUser] = useLocalStorage("user");
  const [token, setToken] = useLocalStorage("token");
  const [theme, setTheme] = useLocalStorage("theme");
  const [tokenExpirationTimestamp, setTokenExpirationTimestamp] =
    useLocalStorage("tokenExpirationTimestamp");
  const [isAuthenticated, setIsAuthenticated] =
    useLocalStorage("isAuthenticated");

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] =
    useState<Severity>("success");
  const [notificationTimeout, setNotificationTimeout] = useState(5000);

  const onNotificationClose = (
    event: React.SyntheticEvent<any>,
    reason: string
  ) => {
    setIsNotificationOpen(false);
  };

  const disconnect = () => {
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
  };

  if (user.isAuthenticated && Date.now() >= tokenExpirationTimestamp) {
    disconnect();
  }
  const Track = () => {
    usePageTracking();
    return <></>;
  };

  return (
    <Router>
      <Track />
      <AutoScrollToTop />

      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={theme === Themes.DARK ? darkTheme : lightTheme}>
          <AuthContext.Provider
            value={{
              user: {
                ...user,
                isAuthenticated,
                token,
                tokenExpirationTimestamp,
              },
              setUser,
              setToken,
              setIsAuthenticated,
              setTokenExpirationTimestamp,
            }}
          >
            <NotificationContext.Provider
              value={{
                notification: {
                  open: isNotificationOpen,
                  message: notificationMessage,
                  severity: notificationSeverity,
                  timeout: notificationTimeout,
                } as INotification,
                setIsNotificationOpen,
                setNotificationMessage,
                setNotificationSeverity,
                setNotificationTimeout,
              }}
            >
              <MetaMaskProvider>
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <CssBaseline />
                  <Appbar />

                  <GoogleReCaptchaProvider reCaptchaKey={config.RECAPTCHA_KEY}>
                    <Main>
                      <ScrollToTop
                        smooth
                        component={
                          <ArrowUpwardIcon
                            sx={{
                              color:
                                theme === Themes.DARK
                                  ? lightTheme.palette.primary.main
                                  : darkTheme.palette.primary.main,
                            }}
                          />
                        }
                        style={{
                          backgroundColor:
                            theme === Themes.DARK
                              ? lightTheme.palette.background.default
                              : darkTheme.palette.background.default,
                        }}
                        color={
                          theme === Themes.DARK
                            ? lightTheme.palette.primary.main
                            : darkTheme.palette.primary.main
                        }
                      />
                      <Container maxWidth="lg" component="main" sx={{ mb: 20 }}>
                        <ErrorBoundary>
                          {/** Routes */}
                          <Switch>
                            <PageRoutes />
                          </Switch>
                          <Switch>
                            <AdminRoutes />
                          </Switch>
                          <Switch>
                            <GalleryRoutes />
                          </Switch>
                          <Switch>
                            <UserRoutes />
                          </Switch>
                          <Switch>
                            <TokenRoutes />
                          </Switch>
                        </ErrorBoundary>
                      </Container>

                      <Footer />
                    </Main>
                  </GoogleReCaptchaProvider>

                  {isNotificationOpen && (
                    <Snackbar
                      open={isNotificationOpen}
                      autoHideDuration={notificationTimeout}
                      onClose={onNotificationClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Alert severity={notificationSeverity}>
                        {notificationMessage}
                      </Alert>
                    </Snackbar>
                  )}
                </LocalizationProvider>
              </MetaMaskProvider>
            </NotificationContext.Provider>
          </AuthContext.Provider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;
