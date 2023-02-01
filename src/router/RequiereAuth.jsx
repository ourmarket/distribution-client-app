import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const RequireAuth = ({ children }) => {
  const {token} = useSelector(store => store.authDelivery);
  const location = useLocation();
  console.log(token)

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;