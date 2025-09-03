import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import MenuLink from "../../App/Menu/MenuLink";
import { Themes } from "../../../context/ThemeContext";

type Props = {
  buttonText: string;
  items: DropDownItem[];
  isAuthenticated?: boolean;
};

export type DropDownItem = {
  text: string;
  callback: () => void;
  requireAuthentication?: boolean;
  hasDivider?: boolean;
};
export default function MainMenuItemWithDropDown({
  buttonText,
  items = [],
  isAuthenticated = false,
}: Props) {
  const [anchorElement, setAnchorElement] = React.useState(null);
  const open = Boolean(anchorElement);
  const handleClick = (event: any) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };
  const handleCallback = (callback: () => void) => {
    setAnchorElement(null);
    callback();
  };
  const filteredItems: DropDownItem[] = [];
  items.forEach((item) => {
    if (
      !item.requireAuthentication ||
      (item.requireAuthentication && isAuthenticated === true)
    ) {
      filteredItems.push(item);
    }
  });

  return (
    <Box>
      <MenuLink text={buttonText} callback={handleClick} />
      <Menu
        id="basic-menu"
        anchorEl={anchorElement}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          sx: {
            borderRadius: ".75rem",
            mt: 1.7,
            boxShadow: (theme) =>
              theme.palette.mode === Themes.LIGHT
                ? "0 10px 15px -3px rgb(0 0 0 / 5%), 0 4px 6px -2px rgb(0 0 0 / 5%) !important"
                : "0 10px 15px -3px rgb(255 255 255 / 0%), 0 4px 6px -2px rgb(255 255 255 / 0%) !important",
            minWidth: "320px !important",
            p: "1.25rem .75rem",
          },
        }}
        sx={{
          minWidth: "320px !important",
        }}
      >
        {filteredItems.map((item) => (
          <Box key={item.text}>
            <MenuItem
              onClick={() => handleCallback(item.callback)}
              sx={{ p: ".75rem .625rem", borderRadius: ".5rem" }}
              key={item.text}
            >
              {item.text}
            </MenuItem>
            {/*<MenuItem sx={{ backgroundColor: "transparent !important" }}>
              {item.hasDivider && (
                <Divider sx={{ width: "100%", display: "block" }} />
              )}
              </MenuItem>*/}
          </Box>
        ))}
      </Menu>
    </Box>
  );
}
