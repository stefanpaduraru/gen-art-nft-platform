import React from "react";
import { Grid, Link as StyledLink, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const GroupTitle = ({ title }: { title: string }) => (
  <Typography
    variant="body1"
    fontWeight={"bold"}
    sx={{ display: "flex", mb: 1, color: "#fff" }}
  >
    {title}
  </Typography>
);

const FooterLinks = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={3} lg={3}>
        <GroupTitle title="Galleries" />

        <StyledLink to="/projects/selected" component={Link}>
          <Typography
            variant="body2"
            sx={{ display: "flex", mb: 0.5, color: "#fff" }}
          >
            Selected
          </Typography>
        </StyledLink>
        <StyledLink to="/projects/open-world" component={Link}>
          <Typography
            variant="body2"
            sx={{ display: "flex", mb: 0.5, color: "#fff" }}
          >
            Open World
          </Typography>
        </StyledLink>
      </Grid>

      <Grid item xs={12} sm={12} md={3} lg={3}>
        <GroupTitle title="Community" />

        <StyledLink to="/artists" component={Link}>
          <Typography
            variant="body2"
            sx={{ display: "flex", mb: 0.5, color: "#fff" }}
          >
            Artists
          </Typography>
        </StyledLink>

        <StyledLink to="/community/for-artists" component={Link}>
          <Typography
            variant="body2"
            sx={{ display: "flex", mb: 0.5, color: "#fff" }}
          >
            For Artists
          </Typography>
        </StyledLink>

        <StyledLink to="/community/for-collectors" component={Link}>
          <Typography
            variant="body2"
            sx={{ display: "flex", mb: 0.5, color: "#fff" }}
          >
            For Collectors
          </Typography>
        </StyledLink>

        <StyledLink href="https://docs.mintoria.io" target="_blank">
          <Typography
            variant="body2"
            sx={{ display: "flex", mb: 0.5, color: "#fff" }}
          >
            Docs
          </Typography>
        </StyledLink>
      </Grid>

      <Grid item xs={12} sm={12} md={3} lg={3}>
        <GroupTitle title="About" />
        <StyledLink to="/about" component={Link}>
          <Typography
            variant="body2"
            sx={{ display: "flex", mb: 0.5, color: "#fff" }}
          >
            About
          </Typography>
        </StyledLink>
        <StyledLink to="/terms" component={Link}>
          <Typography
            variant="body2"
            sx={{ display: "flex", mb: 0.5, color: "#fff" }}
          >
            Terms of service
          </Typography>
        </StyledLink>
        {/* <StyledLink to="/privacy" component={Link}>
          <Typography
            variant="body2"
            sx={{ display: "flex", mb: 0.5, color: "#fff" }}
          >
            Privay policy
          </Typography>
        </StyledLink> */}
      </Grid>
    </Grid>
  );
};

export default FooterLinks;
