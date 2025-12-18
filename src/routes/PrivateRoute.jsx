import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../redux/auth/authSelectors";

import SpinnerTextLoader from "../shared/components/SpinnerTextLoader/SpinnerTextLoader"

const PrivateRoute = ({ children }) => {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (token && !user) return <SpinnerTextLoader />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  return children || <Outlet />;
};

export default PrivateRoute;
