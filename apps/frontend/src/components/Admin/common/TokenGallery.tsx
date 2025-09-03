import React from "react";
import Grid from "@mui/material/Grid";
import { Token } from "../../../types/token";
import Pagination from "@mui/material/Pagination";
import { ExtendedProject } from "../../../types/project";
import { MintoriaGallery } from "../../../types/galleries";
import TokenThumbnail from "./TokenThumbnail";
import { DEFAULT_PER_PAGE } from "../../../constants/default";

type Props = {
  tokens: Token[];
  itemsPerPage?: number;
  project: ExtendedProject;
  gallery: MintoriaGallery;
};
const TokenGallery = ({ tokens, itemsPerPage, project, gallery }: Props) => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const perPage = itemsPerPage || DEFAULT_PER_PAGE;

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
                project={project}
                gallery={gallery}
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

export default TokenGallery;
