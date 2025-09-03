import React from "react";
import { Typography, Box } from "@mui/material";
import { TokenWithProject } from "../../../types/token";
import SearchInput from "./SearchInput";
import TokenGallery from "./DashTokenGallery";

type Props = {
  tokens: TokenWithProject[];
  searchQuery: string;
  setSearchQuery: Function;
  refreshRenderCallback: (tokenId: number) => void;
};

const TokenListPresentational = ({
  tokens,
  searchQuery,
  setSearchQuery,
  refreshRenderCallback,
}: Props) => {
  return (
    <>
      <Typography variant="h5" component="div" sx={{ mt: 8, mb: 3 }}>
        Tokens
      </Typography>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Box sx={{ mt: 5 }}>
        <TokenGallery
          tokens={tokens}
          itemsPerPage={50}
          refreshRenderCallback={refreshRenderCallback}
        />
      </Box>
    </>
  );
};
export default TokenListPresentational;
