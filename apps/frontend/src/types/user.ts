import { ExtendedProject, Project } from "./project";
import { TokenWithProject, Token } from "./token";

export type User = {
  id: number;
  address: string;
  name: string;
  bio?: string;
  isAdmin: boolean;
  isOperator: boolean;
  isMintoriaStaff: boolean;
  partner?: {
    id: number;
    name: string;
  };
  projects?: Project[];
  tokens?: Token[];
  createdAt?: Date;
};

export type ExtendedUser = User & { projects: Project[] } & {
  tokens: TokenWithProject[];
  createdAt: Date;
};

export type AdminUser = Omit<User, "projects"> & {
  projects: ExtendedProject[];
};

export type Artist = User & {
  featuredToken?: Token | null;
  projectCount: number;
  createdAt: Date;
};

export type AuthenticatedUser = User & {
  isAuthenticated: Boolean;
  token: string | null;
};
