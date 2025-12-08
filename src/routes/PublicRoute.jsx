import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectToken,
  selectUser,
} from "../redux/auth/authSelectors";

const PublicRoute = () => {
  const isToken = useSelector(selectToken);
  const user = useSelector(selectUser);

  if (isToken && !user) return <p>Loading...</p>;
  if (user) return <Navigate to="/" />;

  return <Outlet />;
};

export default PublicRoute;
