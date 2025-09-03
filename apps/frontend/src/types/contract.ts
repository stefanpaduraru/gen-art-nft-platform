import { Partner } from "./partner";
import { ExtendedProject, Project } from "./project";

export enum ContractType {
  Core = "core",
  Main = "main",
  Randomizer = "randomizer",
}
export type Contract = {
  id: number;
  name: string;
  createdAt: Date;
  address: string;
  testnetAddress: string;
  type: "core" | "main" | "randomizer";
  partner: Partner;
  projects: Project[];
};

export type AdminContract = {
  id: number;
  name: string;
  createdAt: Date;
  address: string;
  testnetAddress: string;
  type: "core" | "main" | "randomizer";
  partner: Partner;
  projects: ExtendedProject[];
};
