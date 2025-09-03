/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TokenPresentational from "./TokenPresentational";
import { fetchTokenDetails } from "../../../api/app/token";
import { TokenWithProject } from "../../../types/token";
import { Network } from "../../../types/network";
import { MAX_PROJECT_TOKENS } from "../../../constants/default";
import { MintoriaGalleries } from "../../../types/galleries";
import getLogoURL from "../../../util/logo";
import MetaTags from "../../Common/MetaTags";

type Props = {
  presetNetwork?: Network;
};
function TokenDetails({ presetNetwork }: Props) {
  const { id, network, gallery } = useParams<{
    id: string;
    network: Network;
    gallery: MintoriaGalleries;
  }>();
  const [token, setToken] = useState<TokenWithProject>();
  const projectId = parseInt(`${parseInt(id, 10) / MAX_PROJECT_TOKENS}`, 10);
  const currentGallery = gallery ?? MintoriaGalleries.Selected;
  const currentNetwork: Network = presetNetwork ?? network;

  const getTokenDetails = useCallback(async () => {
    const token = await fetchTokenDetails(
      id,
      projectId,
      currentNetwork,
      currentGallery
    );
    setToken(token);
  }, []);

  useEffect(() => {
    getTokenDetails();
  }, []);

  const tokenId = token ? token?.token % MAX_PROJECT_TOKENS : 0;

  return (
    <>
      <MetaTags
        title={`${token?.project.name} #${tokenId}`}
        imageURL={getLogoURL()}
        pageURL={`/token-feed`}
        description={token?.project?.description}
      />
      <TokenPresentational project={token?.project} token={token} />
    </>
  );
}

export default TokenDetails;
