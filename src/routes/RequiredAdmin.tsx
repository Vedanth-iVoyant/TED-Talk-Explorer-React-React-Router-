import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getStoredUser } from "../utils/storage";

export const RequiredAdmin = ({ children }: { children: ReactNode }) => {
  const loginUser = getStoredUser();
  if (loginUser?.role !== "admin") return <Navigate to="/protected" replace />;
  return children;
};
