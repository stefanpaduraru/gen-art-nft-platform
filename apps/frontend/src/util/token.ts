import { Project } from "../types/project";

export const getTokenImage = (tokenId: number, project: Project) =>
  project.isDeployed && project.iterations
    ? project.tokenURL.replace(":tokenId", `${tokenId}`)
    : "/images/project-placeholder.png";
