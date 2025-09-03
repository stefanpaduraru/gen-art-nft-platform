import { Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { fetchTokenFeed } from "../../../api/app/token";
import { TokenWithProject } from "../../../types/token";
import getLogoURL from "../../../util/logo";
import MetaTags from "../../Common/MetaTags";
import TokenFeedPresentational from "./TokenFeedPresentational";

const DEFAULT_TIMEOUT = 10_000;
const TokenFeed = () => {
  const [token, setToken] = useState<TokenWithProject>();
  const [tokenIndex, setTokenIndex] = useState<number>(-1);
  const [tokens, setTokens] = useState<TokenWithProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTokens = useCallback(async (reset: boolean = false) => {
    setIsLoading(true);
    const tokens = await fetchTokenFeed();
    setIsLoading(false);
    setTokens(tokens);

    if (reset) {
      setTokenIndex(0);
      setNextToken(0, tokens.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getTokens();
  }, [getTokens]);

  const setNextToken = useCallback(
    (ti: number, tl: number) => {
      if (ti <= tl - 1) {
        setTokenIndex(ti);
        window.setTimeout(() => setNextToken(ti + 1, tl), DEFAULT_TIMEOUT);
      } else {
        getTokens(true);
      }
    },
    [getTokens]
  );

  useEffect(() => {
    setToken(tokens[tokenIndex]);
  }, [tokenIndex, tokens]);

  useEffect(() => {
    if (tokens.length && tokenIndex < 0) {
      setNextToken(tokenIndex + 1, tokens.length);
    }
  }, [tokens, tokenIndex, setNextToken]);

  return (
    <>
      {
        <MetaTags
          title={"Token Feed"}
          imageURL={getLogoURL()}
          pageURL={`/token-feed`}
          description={
            "The token feed page takes you on a journey through our mints. Enjoy random tokens in a fullscreen gallery"
          }
        />
      }

      <Typography variant="h3" component="div" sx={{ mt: 8 }}>
        {"Token Feed"}
      </Typography>

      {!!tokens.length && token && (
        <TokenFeedPresentational isLoading={isLoading} token={token} />
      )}
    </>
  );
};
export default TokenFeed;
