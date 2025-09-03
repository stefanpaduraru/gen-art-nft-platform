import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "../../Common/TabPanel";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import CategoryIcon from "@mui/icons-material/Category";
import { ExtendedUser } from "../../../types/user";
import UserProjectGallery from "./UserProjectGallery";
import UserTokenGallery from "./UserTokenGallery";

type Props = {
  user: ExtendedUser;
};

export default function UserTabs({ user }: Props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          textColor="primary"
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
          aria-label="user tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            icon={<SnippetFolderIcon />}
            label={"Projects"}
            {...a11yProps(0)}
            sx={{ m: 1 }}
          />
          <Tab
            icon={<CategoryIcon />}
            label={"Tokens"}
            {...a11yProps(1)}
            sx={{ m: 1 }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UserProjectGallery projects={user.projects || []} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserTokenGallery tokens={user.tokens || []} />
      </TabPanel>
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
