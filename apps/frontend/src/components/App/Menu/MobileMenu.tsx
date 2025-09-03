/* eslint-disable no-sparse-arrays */
import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  SwipeableDrawer,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { useHistory } from "react-router";
import Routes from "../../../constants/routes";
import { DropDownItem } from "../../Common/Menus/MainMenuItemWithSubItems";
import MetamaskStatus from "../../Common/MetamaskStatus";
import { useAuth } from "../../../context/UserContext";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import { Theme } from "../../../context/ThemeContext";
import ThemeSwitch from "../../Common/ThemeSwitch";

type Props = {
  isDrawerOpen: boolean;
  toggleDrawer: (open: boolean) => void;
  theme: Theme;
  handleThemeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const MobileMenu = ({
  isDrawerOpen,
  toggleDrawer,
  theme,
  handleThemeChange,
}: Props) => {
  const { user } = useAuth();
  const history = useHistory();

  const navigateToForArtistsPage = () => {
    history.push(Routes.forArtists);
  };

  const navigateToArtistsPage = () => {
    history.push(Routes.artistsList);
  };
  const navigateToForCollectorsPage = () => {
    history.push(Routes.forCollectors);
  };

  const navigateToAboutPage = () => {
    history.push(Routes.aboutPage);
  };
  const navigateToMyProjects = () => {
    history.push(Routes.myProjects);
  };
  const navigateToSelectProjects = () => {
    history.push(Routes.mintoriaSelected);
  };

  const navigateToTokenFeed = () => {
    history.push(Routes.tokenFeed);
  };
  const navigateToOpenWorldProjects = () => {
    history.push(Routes.mintoriaOpenWorld);
  };
  /* const navigateToPartnersPage = () => {
    history.push(Routes.partnersPage);
  }; */
  const navigateToAdminPage = () => {
    history.push(Routes.adminPage);
  };

  const projectMenuItems = [
    {
      text: "My projects",
      callback: navigateToMyProjects,
      requireAuthentication: true,
      hasDivider: true,
    },
    {
      text: "Token feed",
      callback: navigateToTokenFeed,
    },
    {
      text: "Mintoria Selected",
      callback: navigateToSelectProjects,
    },
    ,
    {
      text: "Mintoria Open World",
      callback: navigateToOpenWorldProjects,
    },
  ] as DropDownItem[];

  const communitytMenuItems = [
    {
      text: "Artists",
      callback: navigateToArtistsPage,
      hasDivider: true,
    },
    {
      text: "For Artists",
      callback: navigateToForArtistsPage,
    },
    {
      text: "For Collectors",
      callback: navigateToForCollectorsPage,
    },
  ] as DropDownItem[];

  const closeDrawer = () => {
    toggleDrawer(false);
  };

  return (
    <Box role="presentation">
      <SwipeableDrawer
        anchor={"right"}
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
        PaperProps={{
          sx: { width: "100%", pl: "2rem", pr: "2rem" },
        }}
      >
        {
          <Box sx={{ display: "flex", width: "100%", mt: 4 }}>
            <Box
              sx={{
                mt: 2,
                height: "32px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/images/logo.png"
                alt="Mintoria.io"
                style={{ width: "32px", display: "inline-flex" }}
              />
              {<Logo />}
            </Box>
            <CloseButton closeDrawer={closeDrawer} />
          </Box>
        }
        <Box sx={{ pt: 5, pb: 6 }}>
          {<MetamaskStatus mobile={true} closeDrawer={closeDrawer} />}
        </Box>

        <List>
          {user.isAuthenticated && user.isAdmin && (
            <MenuItem
              containerProps={{
                fontWeight: "bold",
              }}
              textProps={{ color: "#cb6d6d !important" }}
              onClick={() => navigateToAdminPage()}
              text={"Admin"}
              closeDrawer={closeDrawer}
              key={"Admin"}
            />
          )}
          <MenuItem
            text="Explore"
            items={projectMenuItems}
            onClick={() => {}}
            closeDrawer={closeDrawer}
            isAuthenticated={user.isAuthenticated}
            key={"Explore"}
          />

          <MenuItem
            text="Community"
            items={communitytMenuItems}
            onClick={() => {}}
            closeDrawer={closeDrawer}
            key={"Community"}
          />

          {/* <MenuItem
            onClick={() => navigateToPartnersPage()}
            text={"Partners"}
            closeDrawer={closeDrawer}
            key={"Partners"}
          /> */}
          <MenuItem
            onClick={() => navigateToAboutPage()}
            text={"About"}
            closeDrawer={closeDrawer}
            key={"About"}
          />
        </List>
        <Box>
          <ThemeSwitch handleChange={handleThemeChange} theme={theme} />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

type MenuItemProps = {
  text: string;
  onClick: () => void;
  containerProps?: any;
  textProps?: any;
  items?: DropDownItem[];
  closeDrawer: (toggle: boolean) => void;
  isAuthenticated?: boolean;
};

const MenuItem = ({
  text,
  onClick,
  containerProps,
  textProps = {},
  items,
  closeDrawer,
  isAuthenticated,
}: MenuItemProps) => {
  const hasItems = items && items?.length;
  const [itemsShown, setItemsShown] = useState(false);
  const toggleShowItems = () => setItemsShown(!itemsShown);
  const callback = hasItems ? toggleShowItems : onClick;
  if (hasItems && itemsShown) {
    textProps.opacity = 0.5;
  }
  const callbackAndClose = (callback: () => void) => {
    callback();
    closeDrawer(true);
  };

  return (
    <ListItem
      key={text}
      sx={{
        padding: 0,
        pt: 2.8,
        pb: 2.8,
        fontWeight: 700,
        borderBottom: "1px solid rgba(243,244,246,1)",
        display: "block",
        ...(containerProps || {}),
      }}
      onClick={() => {
        callback();
        !items?.length && closeDrawer(true);
      }}
    >
      <Box sx={{ width: "100%", display: "flex" }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "24px",
            lineHeight: "25px",
            flexGrow: 1,
            cursor: "pointer",
            fontWeight: 700,
            ...(textProps || {}),
            // color: textProps?.color || "#171717",
          }}
        >
          {text}
        </Typography>
        {hasItems ? (
          itemsShown ? (
            <ExpandLessIcon />
          ) : (
            <ExpandMoreIcon />
          )
        ) : (
          <ChevronRightIcon />
        )}
      </Box>
      {hasItems && (
        <List sx={{ display: itemsShown ? "block" : "none" }}>
          {(items || [])
            .filter(
              (item) =>
                (item.requireAuthentication && isAuthenticated === true) ||
                !item.requireAuthentication
            )
            .map((item) => (
              <MenuItem
                key={item.text}
                text={item.text}
                onClick={() => callbackAndClose(item.callback)}
                closeDrawer={closeDrawer}
                containerProps={{ border: 0, pl: 0, pr: 0, pt: 2, pb: 2 }}
              />
            ))}
        </List>
      )}
    </ListItem>
  );
};

const Logo = () => (
  <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
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
);

const CloseButton = ({ closeDrawer }: { closeDrawer: () => void }) => (
  <Box
    sx={{
      display: "flex",
      flexGrow: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      cursor: "pointer",
    }}
  >
    <MuiLink onClick={closeDrawer}>
      <CloseIcon />
    </MuiLink>
  </Box>
);

export default MobileMenu;
