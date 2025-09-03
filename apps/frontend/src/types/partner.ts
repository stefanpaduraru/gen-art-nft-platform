import { Contract } from "./contract";
import { Project } from "./project";

export type Partner = {
  id: number;
  name: string;
  createdAt: Date;
  contracts?: Contract[];
  projects?: Project[];
};
