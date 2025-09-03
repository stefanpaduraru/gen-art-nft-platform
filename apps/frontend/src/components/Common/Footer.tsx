import React from "react";
import {
  Box,
  Container,
  Grid,
  Link as StyledLink,
  Typography,
} from "@mui/material";
import SocialIcon from "../Common/SocialIcon";
import { Link } from "react-router-dom";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#181818" : "#181818",
        color: "#fff",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 6,
          borderTop: "1px solid rgba(68,68,68, 1)",
          borderBottom: "1px solid rgba(68,68,68, 1)",
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
            md: "row",
            lg: "row",
          },
        }}
      >
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            sx={{ alignItems: "center" }}
          >
            <StyledLink to="/" component={Link}>
              <img
                src="/images/mintoria.io.png"
                alt="Mintoria.io"
                width={125}
                height={20}
                style={{
                  width: "125",
                  display: "inline-flex",
                  marginBottom: "10px",
                }}
              />
            </StyledLink>
            <Box>
              <Typography
                variant="body1"
                fontWeight={"light"}
                sx={{ fontSize: "14px" }}
              >
                Mintoria is a generative art community hosted on the Ethereum
                blockchain that enables artists to publish their art
                professionally.
              </Typography>
              <Typography
                variant="body1"
                fontWeight={"light"}
                sx={{ fontSize: "14px", mt: 1 }}
              >
                Berlin, DE
              </Typography>
            </Box>
            <Box
              sx={{
                width: "auto",
                display: "flex",
                flexDirection: "row",
                mt: 3,
              }}
            >
              <SocialIcon icon="discord" />
              <Separator />
              <SocialIcon icon="instagram" />
              <Separator />
              <SocialIcon icon="twitter" />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={8}
            sx={{
              pt: { xs: 6, sm: 6, md: 0, lg: 0 },
              pl: { xs: 6, sm: 6, md: 0, lg: 0 },
            }}
          >
            <FooterLinks />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
const Separator = () => <Box sx={{ width: "18px" }}></Box>;
export default Footer;
