import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TokenThumbnail from "./TokenThumbnail";
import TokenGallerySort from "./TokenGallerySort";
import { Token } from "../../../types/token";
import Pagination from "@mui/material/Pagination";
import { Box, SelectChangeEvent, Typography } from "@mui/material";
import { DEFAULT_PER_PAGE } from "../../../constants/default";
import { Project } from "../../../types/project";

type Props = {
  tokens: Token[];
  tokenURL: string;
  project: Project;
};

type SortingType = "newest" | "oldest" | "rarity";

const TokenGallery = ({ tokens, tokenURL, project }: Props) => {
  const scrollableRef = React.createRef<any>();
  const [page, setPage] = React.useState(1);
  const [sorting, setSorting] = useState<SortingType>("newest");

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);

    if (scrollableRef && scrollableRef.current) {
      scrollableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSortingChange = (event: SelectChangeEvent) => {
    setSorting(event.target.value as SortingType);
  };

  const sortByDateDesc = (t1: Token, t2: Token) => {
    return t2.token - t1.token;
  };
  const sortByDateAsc = (t1: Token, t2: Token) => {
    return t1.token - t2.token;
  };

  const sortByRarityDesc = (t1: Token, t2: Token) => {
    return t2.rarityScore - t1.rarityScore;
  };

  const sortFunction = (t1: Token, t2: Token) => {
    switch (sorting) {
      case "newest":
        return sortByDateDesc(t1, t2);
      case "oldest":
        return sortByDateAsc(t1, t2);
      case "rarity":
        return sortByRarityDesc(t1, t2);
      default:
        return sortByDateDesc(t1, t2);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Typography
          variant="h4"
          sx={{ mb: 5, flexGrow: 1 }}
          ref={scrollableRef}
        >
          Tokens
        </Typography>
        <Box>
          <TokenGallerySort
            value={sorting}
            handleChange={handleSortingChange}
            project={project}
          />
        </Box>
      </Box>
      <Grid container spacing={4} direction="row" alignItems="center">
        {tokens
          .sort(sortFunction)
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
                key={token.token}
              >
                <TokenThumbnail
                  tokenId={token.token}
                  tokenURL={`${tokenURL}/${token.token}`}
                  imageURL={token.rendered ? token.imageURL : undefined}
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
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TokenGallery;
