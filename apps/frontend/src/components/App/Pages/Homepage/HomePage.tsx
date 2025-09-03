import React, { useCallback, useEffect, useState } from "react";
import { fetchMintoriaProjects } from "../../../../api/app/project";
import { MintoriaGalleries } from "../../../../types/galleries";
import { Project } from "../../../../types/project";
import HomePagePresentational from "./HomePagePresentational";
import HomepageHero from "./HomepageHero";

const HomePage = () => {
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  const [openworldProjects, setOpenworldProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getGalleryProjects = useCallback(async () => {
    const selected = await fetchMintoriaProjects(MintoriaGalleries.Selected);
    setSelectedProjects(selected.slice(0, 8));

    const openWorld = await fetchMintoriaProjects(MintoriaGalleries.OpenWorld);
    setOpenworldProjects(openWorld.slice(0, 8));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getGalleryProjects();
  }, [getGalleryProjects]);

  return (
    <>
      <HomepageHero />

      <HomePagePresentational
        selectedProjects={selectedProjects}
        openworldProjects={openworldProjects}
        isLoading={isLoading}
      />
    </>
  );
};

export default HomePage;
