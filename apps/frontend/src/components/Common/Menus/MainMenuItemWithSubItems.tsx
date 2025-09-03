import * as React from "react";
import { ListItem } from "@mui/material";

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
export default function MainMenuItemWithSubItems({
  buttonText,
  items = [],
  isAuthenticated = false,
}: Props) {
  const handleCallback = (callback: () => void) => {
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
    <>
      <ListItem>{buttonText}</ListItem>

      {filteredItems.map((item) => (
        <ListItem
          button
          key={item.text}
          onClick={() => handleCallback(item.callback)}
          sx={{ pl: 3 }}
        >
          {item.text}
        </ListItem>
      ))}
    </>
  );
}
