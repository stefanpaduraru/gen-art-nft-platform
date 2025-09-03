/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import GalleryProjectListPresentational from "./GalleryProjectListPresentational";
import { Project } from "../../../../types/project";
import { fetchMintoriaProjects } from "../../../../api/app/project";
import {
  MintoriaGalleries,
  MintoriaGallery,
} from "../../../../types/galleries";
import MetaTags from "../../../Common/MetaTags";
import getLogoURL from "../../../../util/logo";
import { ABOUT_SHORT_TEXT } from "../../../../constants/text";

type Props = {
  gallery: MintoriaGallery;
};
function GalleryProjectList({ gallery }: Props) {
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProjects = useCallback(async (gallery) => {
    const projects = await fetchMintoriaProjects(gallery);
    setProjects(projects);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getProjects(gallery);
  }, [gallery]);

  const PAGE_TITLE =
    gallery === MintoriaGalleries.Selected
      ? "Mintoria Selected"
      : "Mintoria Open World";

  return (
    <>
      {
        <MetaTags
          title={PAGE_TITLE}
          imageURL={getLogoURL()}
          pageURL={`/projects/${gallery}`}
          description={ABOUT_SHORT_TEXT}
        />
      }
      <GalleryProjectListPresentational
        title={PAGE_TITLE}
        projects={projects}
        isLoading={isLoading}
        gallery={gallery}
      />
    </>
  );
}

export default GalleryProjectList;
