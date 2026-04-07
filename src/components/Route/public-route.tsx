import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/helper";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  if (getToken()) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default PublicRoute;

