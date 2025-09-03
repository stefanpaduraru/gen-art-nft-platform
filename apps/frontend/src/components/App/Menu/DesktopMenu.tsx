/* eslint-disable no-sparse-arrays */
import React from "react";
import { useHistory } from "react-router";
import Routes from "../../../constants/routes";
import MainMenuItemWithDropDown, {
  DropDownItem,
} from "../../Common/Menus/MainMenuItemWithDropDown";
import { useAuth } from "../../../context/UserContext";
import MenuLink from "./MenuLink";

const DesktopMenu = () => {
  const { user } = useAuth();
  const history = useHistory();

  const navigateToAboutPage = () => {
    history.push(Routes.aboutPage);
  };

  const navigateToForArtistsPage = () => {
    history.push(Routes.forArtists);
  };

  const navigateToForCollectorsPage = () => {
    history.push(Routes.forCollectors);
  };

  const navigateToMyProjects = () => {
    history.push(Routes.myProjects);
  };
  const navigateToSelectProjects = () => {
    history.push(Routes.mintoriaSelected);
  };
  const navigateToOpenWorldProjects = () => {
    history.push(Routes.mintoriaOpenWorld);
  };
  const navigateToAdminPage = () => {
    history.push(Routes.adminPage);
  };
  const navigateToArtistsPage = () => {
    history.push(Routes.artistsList);
  };
  const navigateToTokenFeed = () => {
    history.push(Routes.tokenFeed);
  };
  /*  const navigateToPartnersPage = () => {
    history.push(Routes.partnersPage);
  }; */

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

  return (
    <>
      {user.isAuthenticated && user.isAdmin && (
        <MenuLink
          text="Admin"
          callback={navigateToAdminPage}
          sx={{ background: "#a93737 !important" }}
        />
      )}
      <MainMenuItemWithDropDown
        buttonText="Explore"
        items={projectMenuItems}
        isAuthenticated={user.isAuthenticated}
      />

      <MainMenuItemWithDropDown
        buttonText="Community"
        items={communitytMenuItems}
      />
      {/* <MenuLink text="Partners" callback={navigateToPartnersPage} /> */}
      <MenuLink text="About" callback={navigateToAboutPage} />
    </>
  );
};

export default DesktopMenu;
