import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const PrivateRoute = ({ children }) => {
  const { token } = useAppSelector((state) => state.auth);
  const guestId = sessionStorage.getItem("guestId");

  // Token varsa veya guestId varsa geç
  if (token || guestId) return children;

  return <Navigate to="/login" />;
};

export default PrivateRoute;