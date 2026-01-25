import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const AdminRoute = ({ children }) => {
  const { user, token } = useAppSelector((state) => state.auth);

  
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  
  if (user.role !== "ROLE_ADMIN") {
    return <Navigate to="/" replace />;
  }

  
  return children;
};

export default AdminRoute;
