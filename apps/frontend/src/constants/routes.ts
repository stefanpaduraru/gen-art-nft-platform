/* eslint-disable no-useless-escape */
import { MintoriaGallery } from "../types/galleries";
import { Network } from "../types/network";

const Routes = {
  homePage: "/",
  aboutPage: "/about",
  communityPage: "/community",
  forArtists: "/community/for-artists",
  forCollectors: "/community/for-collectors",
  partnersPage: "/partners",
  termsPage: "/terms",
  privacyPage: "/privacy",
  notFoundPage: "/404",
  artistsList: "/artists",
  userPage: "/user/:address",
  getUserPage: (address: string) => `/user/${address}`,
  myProjects: "/my-projects",

  myProjectDetails: "/my-projects/:id",
  getMyProjectDetails: (id: number | string, network?: Network) =>
    `/my-projects/${id}`,
  getGalleryProjectDetails: (id: number | string, gallery: MintoriaGallery) =>
    `/projects/${gallery}/${id}`,
  myProjectEdit: "/my-projects/:id/edit",
  getMyProjectEdit: (
    id: number | string,
    network?: Network,
    gallery?: MintoriaGallery
  ) => `/my-projects/${id}/edit`,

  tokenDetails:
    "/token/:gallery(selected|open-world)/:network(testnet|mainnet)/:id(\\d+)",
  tokenMainnetDetails: "/token/:gallery(selected|open-world)/:id(\\d+)",
  tokenLiveView: "/token/:id/liveview",
  mintoriaSelected: "/projects/selected",
  tokenFeed: "/token-feed",
  mintoriaSelectedProject: "/projects/selected/:id(\\d+)",
  mintoriaOpenWorldProject: "/projects/open-world/:id(\\d+)",
  mintoriaOpenWorld: "/projects/open-world",
  adminPage: "/admin",
  adminStatusPage: "/admin/status",
  adminPartners: "/admin/partners",
  adminPartnerDetails: `/admin/partners/:id(\\d+)`,
  adminContracts: "/admin/contracts",
  adminContractDetails: `/admin/contracts/:id(\\d+)/:network(testnet|mainnet)`,
  getAdminContractDetails: (id: number | string, network: Network) =>
    `/admin/contracts/${id}/${network}`,
  adminProjects: "/admin/projects",
  adminProjectDetails: `/admin/projects/:id(\\d+)`,
  getAdminProjectDetails: (id: number | string) => `/admin/projects/${id}`,
  adminTokens: "/admin/tokens",
  getAdminTokenDetails: (id: number | string) => `/admin/tokens/${id}`,
  adminCollections: "/admin/collections",
  adminUsers: "/admin/users",
  adminUserDetails: "/admin/users/:id(\\d+)",
};

export default Routes;
