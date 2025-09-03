import { MintoriaGalleries } from "../types/galleries";

export const getGalleryByContractName = (name: string) =>
  name === "Mintoria Selected"
    ? MintoriaGalleries.Selected
    : MintoriaGalleries.OpenWorld;
