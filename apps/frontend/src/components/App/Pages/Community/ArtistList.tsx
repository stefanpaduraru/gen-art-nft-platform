/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import ArtistListPresentational from "./ArtistListPresentational";
import { fetchMintoriaArtists } from "../../../../api/app/user";
import { Artist } from "../../../../types/user";

function ArtistList() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getArtists = useCallback(async () => {
    const users = await fetchMintoriaArtists();
    setArtists(users);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getArtists();
  }, []);

  return <ArtistListPresentational artists={artists} isLoading={isLoading} />;
}

export default ArtistList;
