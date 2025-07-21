import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import type { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  return children;
};

export default PrivateRoute;
