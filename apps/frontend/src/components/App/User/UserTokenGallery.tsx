import React from "react";
import Grid from "@mui/material/Grid";
import TokenThumbnail from "../Tokens/TokenThumbnail";
import { Token, TokenWithProject } from "../../../types/token";
import Pagination from "@mui/material/Pagination";
import { getGalleryByContractName } from "../../../util/gallery";
import { DEFAULT_PER_PAGE } from "../../../constants/default";

type Props = {
  tokens: TokenWithProject[];
  imageURL?: string;
};
const TokenGallery = ({ tokens, imageURL }: Props) => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getCoverImage = (token: Token) =>
    token.imageURL ?? "/images/project-placeholder.png";

  const getTokenURL = (token: Token) => {
    const gallery = getGalleryByContractName(
      token.project?.contract?.name || ""
    );
    return `/token/${gallery}/${token.token}`;
  };
  return (
    <Grid container spacing={4} direction="row" alignItems="flex-start">
      {tokens
        .sort((t1, t2) => t2.token - t1.token)
        ?.filter(
          (t, i) =>
            i >= (page - 1) * DEFAULT_PER_PAGE && i < page * DEFAULT_PER_PAGE
        )
        .map((token) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={4}
              sx={{ mb: 3 }}
              key={`${token.token}-${token.id}`}
            >
              <TokenThumbnail
                tokenId={token.token}
                imageURL={getCoverImage(token)}
                tokenURL={getTokenURL(token)}
              />
            </Grid>
          );
        })}
      <Grid item xs={12} lg={12} key="pagination" sx={{ mb: 5 }}>
        <Pagination
          count={Math.ceil(tokens.length / DEFAULT_PER_PAGE)}
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
