import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/helper";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  if (!getToken()) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default PrivateRoute;

