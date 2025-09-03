import { createContext, useContext } from "react";
import { User } from "../types/user";

export interface IAuth {
  address: string;
  name: string;
  isAdmin: boolean;
  isOperator: boolean;
  isMintoriaStaff: boolean;
  partner?: {
    id: number;
    name: string;
  };
  isAuthenticated: boolean;
  token: string | null;
  tokenExpirationTimestamp: number;
}

export type AuthContextType = {
  user: IAuth;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setIsAuthenticated: (authenticated: boolean) => void;
  setTokenExpirationTimestamp: (timestamp: number) => void;
};

export const defaultState = {
  user: {
    address: "",
    name: "",
    isAdmin: false,
    isOperator: false,
    isMintoriaStaff: false,
    partner: {
      id: 0,
      name: "",
    },
    isAuthenticated: false,
    token: null,
    tokenExpirationTimestamp: 0,
  },
  setUser: (user: User) => {},
  setToken: (token: string) => {},
  setIsAuthenticated: (authenticated: boolean) => {},
  setTokenExpirationTimestamp: (timestamp: number) => {},
};

export const AuthContext = createContext<AuthContextType>(defaultState);
export const useAuth = () => useContext(AuthContext);
