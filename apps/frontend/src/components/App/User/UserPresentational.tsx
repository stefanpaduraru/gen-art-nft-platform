import React from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { ExtendedUser } from "../../../types/user";
import UserTabs from "./UserTabs";
import { useAuth } from "../../../context/UserContext";

interface Props {
  user: ExtendedUser;
  editCalllback: () => void;
}

const UserPresentational = ({ user, editCalllback }: Props) => {
  const { user: authenticatedUser } = useAuth();
  const displayEditButton = user.address === authenticatedUser.address;
  const memberSince = new Date(user.createdAt).toLocaleDateString();
  return (
    <>
      <Grid container spacing={0} sx={{ mt: 5 }}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h3" component="div" sx={{ mt: 3 }}>
            {user?.name}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              mt: 2,
              mb: 2,
            }}
          >
            {user.bio}
          </Typography>

          <Typography variant="body2" component="div" sx={{ mt: 4, mb: 1 }}>
            Member since {memberSince}
          </Typography>
          {displayEditButton && (
            <Button variant="outlined" onClick={editCalllback} sx={{ mt: 3 }}>
              Edit Profile
            </Button>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <UserTabs user={user} />
        </Grid>
      </Grid>
    </>
  );
};
export default UserPresentational;
