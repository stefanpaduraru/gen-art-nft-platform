import React, { useCallback, useEffect, useState } from "react";
import { useNotification } from "../../../context/NotificationContext";
import TokenListPresentational from "./TokenListPresentational";
import { useAuth } from "../../../context/UserContext";
import { useHistory } from "react-router-dom";
import Routes from "../../../constants/routes";
import { TokenWithProject } from "../../../types/token";
import { fetchMainnetTokenList, renderToken } from "../../../api/admin/token";

const TokenList = () => {
  const [tokens, setTokens] = useState<TokenWithProject[]>();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    setNotificationMessage,
    setIsNotificationOpen,
    setNotificationSeverity,
  } = useNotification();
  const { user } = useAuth();
  const history = useHistory();

  if (!user.isAdmin && !user.isMintoriaStaff) {
    history.push(Routes.notFoundPage);
  }

  const getData = useCallback(async () => {
    try {
      const tokens = await fetchMainnetTokenList(user.token, searchQuery);
      setTokens(tokens);
    } catch (e) {
      setNotificationMessage("Can't fetch data.");
      setNotificationSeverity("error");
      setIsNotificationOpen(true);
    }
  }, [
    searchQuery,
    setIsNotificationOpen,
    setNotificationMessage,
    setNotificationSeverity,
    user.token,
  ]);

  const refreshRenderCallback = async (tokenId: number) => {
    const x = await renderToken(user.token, tokenId);
    console.log(tokenId, x);
  };

  useEffect(() => {
    if (searchQuery.length >= 3) {
      setTokens([]);
      getData();
    }
  }, [getData, searchQuery.length]);

  return (
    <>
      {
        <TokenListPresentational
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          tokens={tokens || []}
          refreshRenderCallback={refreshRenderCallback}
        />
      }
    </>
  );
};
export default TokenList;
