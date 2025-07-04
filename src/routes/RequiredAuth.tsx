import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const RequiredAuth = ({ children }: { children: ReactNode }) => {
  const loginUser = localStorage.getItem("LoginUser");
  if (!loginUser) return <Navigate to="/login" replace />;
  return children;
};
