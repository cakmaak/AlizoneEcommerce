import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const PrivateRoute = ({ children }) => {
  const { token } = useAppSelector((state) => state.auth);
  return token ? children : <Navigate to="/login" />;
};



export default PrivateRoute;
