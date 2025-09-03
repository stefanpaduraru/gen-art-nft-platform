import { createContext, useContext } from "react";

export type Severity = "error" | "success";

export interface INotification {
  open: boolean;
  message: string;
  severity: Severity;
  timeout: number;
}

export type NotificationContextType = {
  notification: INotification;
  setIsNotificationOpen: (open: boolean) => void;
  setNotificationMessage: (message: string) => void;
  setNotificationSeverity: (severity: Severity) => void;
  setNotificationTimeout: (timeout: number) => void;
};

export const defaultState = {
  notification: {
    open: false,
    message: "",
    severity: "success" as Severity,
    timeout: 5000,
  },
  setIsNotificationOpen: (open: boolean) => {},
  setNotificationMessage: (message: string) => {},
  setNotificationSeverity: (severity: Severity) => {},
  setNotificationTimeout: (timeout: number) => {},
};

export const NotificationContext =
  createContext<NotificationContextType>(defaultState);
export const useNotification = () => useContext(NotificationContext);
