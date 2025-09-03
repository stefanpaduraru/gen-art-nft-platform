import React from "react";
import Grid from "@mui/material/Grid";
import { TokenWithProject } from "../../../types/token";
import Pagination from "@mui/material/Pagination";
import { MintoriaGalleries } from "../../../types/galleries";
import TokenThumbnail from "./TokenThumbnail";
import { DEFAULT_PER_PAGE } from "../../../constants/default";
import { ExtendedProject } from "../../../types/project";

type Props = {
  tokens: TokenWithProject[];
  itemsPerPage?: number;
  refreshRenderCallback: (tokenId: number) => void;
};
const DashTokenGallery = ({
  tokens,
  itemsPerPage,
  refreshRenderCallback,
}: Props) => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const perPage = itemsPerPage || DEFAULT_PER_PAGE;

  const gallery = MintoriaGalleries.Selected;

  return (
    <Grid container spacing={3} direction="row" alignItems="flex-start">
      {tokens
        .sort((t1, t2) => t2.token - t1.token)
        ?.filter((t, i) => i >= (page - 1) * perPage && i < page * perPage)
        .map((token) => {
          return (
            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              lg={3}
              xl={3}
              sx={{ mb: 3 }}
              key={token.token}
            >
              <TokenThumbnail
                token={token}
                project={token.project as ExtendedProject}
                gallery={gallery}
                refreshRenderCallback={refreshRenderCallback}
              />
            </Grid>
          );
        })}
      <Grid item xs={12} lg={12} key="pagination">
        <Pagination
          count={Math.ceil(tokens.length / perPage)}
          page={page}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default DashTokenGallery;
