import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { TokenWithProject } from "../../../types/token";

type Props = {
  token: TokenWithProject;
};
const TokenTraitList = ({ token }: Props) => {
  return (
    <>
      <Typography variant="h4">Features</Typography>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} lg={12} key={"header"}>
          <Row>
            <Grid container>
              <Grid item xs={5} sm={4} md={4}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Name:{" "}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={5} md={5}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Value
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2} md={2}>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  Rarity Count
                </Typography>
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Rarity Score
                </Typography>
              </Grid>
            </Grid>
          </Row>
        </Grid>

        {(token?.traits || []).map((t) => (
          <Grid item xs={12} lg={12} key={t.name}>
            <Row>
              <Grid container>
                <Grid item xs={5} sm={4} md={4}>
                  <Typography variant="body1">{t.name}</Typography>
                </Grid>
                <Grid item xs={4} sm={5} md={5}>
                  <Typography variant="body2">{t.value}</Typography>
                </Grid>

                <Grid item xs={2}>
                  {t.rarityCount ? (
                    <Typography variant="body2" align="center">
                      {t.rarityCount}/{token?.project.iterations} -{" "}
                      {(
                        (t.rarityCount /
                          ((token &&
                            token?.project &&
                            parseInt(token?.project?.iterations || "1", 10)) ??
                            1)) *
                        100
                      ).toFixed(2)}
                      %
                    </Typography>
                  ) : (
                    <Typography variant="body2" align="center">
                      {" "}
                      -{" "}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={1}>
                  <Typography variant="body2" align="center">
                    {t.rarityScore && t.rarityScore > 0 ? t.rarityScore : "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Row>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const Row = ({ children }: { children: any }) => (
  <Box
    sx={{
      mt: 0,
      mb: 1,
      p: 2,
      borderBottom: (theme) =>
        theme.palette.mode === "light"
          ? "1px solid #1e1e1e60"
          : "1px solid #ffffff60",
    }}
  >
    {children}
  </Box>
);

export default TokenTraitList;
