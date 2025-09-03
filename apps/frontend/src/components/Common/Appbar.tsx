import { AppBar, Box, Toolbar } from "@mui/material";
import { styled } from "@mui/system";
import MetamaskStatus from "./MetamaskStatus";
import { useState } from "react";
import DesktopMenu from "../App/Menu/DesktopMenu";
import MobileMenu from "../App/Menu/MobileMenu";
import MenuDivider from "../App/Menu/MenuDivider";
import MobileMenuButton from "../App/Menu/MobileMenuButton";
import ThemeSwitch from "../Common/ThemeSwitch";
import { Link } from "react-router-dom";
import { Themes, useTheme } from "../../context/ThemeContext";

const AppbarStyled = styled(AppBar)(({ theme }) => ({
  "&&": {
    backgroundColor: "#181818",
    width: "100%",
  },
}));

const Appbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleDrawer = (open: boolean) => setIsDrawerOpen(open);
  const { theme, setTheme } = useTheme();
  const handleThemeChange = (e: any) => {
    const nextTheme = e.target.checked ? Themes.DARK : Themes.LIGHT;
    setTheme(nextTheme);
  };

  const fullscreenChangeHandler = async (event: any) => {
    if (!document.fullscreenElement) {
      setIsFullscreen(false);
    } else {
      setIsFullscreen(true);
    }
  };
  document.addEventListener("fullscreenchange", fullscreenChangeHandler);

  return (
    <Box sx={{ flexGrow: 1, display: isFullscreen ? "none" : "auto" }}>
      <AppbarStyled position="fixed" elevation={0}>
        <Toolbar>
          <Box sx={{ height: "32px", display: "flex", alignItems: "center" }}>
            <Link
              to="/"
              style={{
                color: "#fff",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/images/logo.png"
                alt="Mintoria"
                width={32}
                height={32}
                style={{
                  width: "32px",
                  display: "inline-flex",
                  marginRight: 2,
                }}
              />
              <img
                src="/images/mintoria.io.png"
                alt="Mintoria.io"
                width={125}
                height={20}
                style={{
                  width: "125",
                  display: "inline-flex",
                  marginLeft: 8,
                }}
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>

          <Box
            sx={{
              display: { xs: "none", md: "inline-flex", alignItems: "center" },
            }}
          >
            <DesktopMenu />
            <MenuDivider />
            <ThemeSwitch handleChange={handleThemeChange} theme={theme} />
            <MetamaskStatus />
          </Box>
          <MobileMenuButton toggleDrawer={toggleDrawer} />
        </Toolbar>
      </AppbarStyled>
      <MobileMenu
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        handleThemeChange={handleThemeChange}
        theme={theme}
      />
    </Box>
  );
};

export default Appbar;
