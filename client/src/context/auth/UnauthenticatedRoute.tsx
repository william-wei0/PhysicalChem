import { Navigate } from "react-router";
import { useAuth } from "@/context/auth/useAuth";

export const UnauthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
