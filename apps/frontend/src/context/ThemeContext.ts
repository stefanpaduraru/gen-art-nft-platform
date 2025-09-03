import { createContext, useContext } from "react";

export type Theme = "light" | "dark";
export enum Themes {
  LIGHT = "light",
  DARK = "dark",
}

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const defaultState = {
  theme: Themes.LIGHT as Theme,
  setTheme: (theme: Theme) => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultState);
export const useTheme = () => useContext(ThemeContext);
