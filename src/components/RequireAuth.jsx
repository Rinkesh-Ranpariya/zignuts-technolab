import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./Layout";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isUserAuthenticated = useSelector(
    (state) => state.userInfo.isAuthenticated
  );
  const token = localStorage.getItem("userToken");

  if (!isUserAuthenticated || !token) {
    return (
      <Navigate
        to="/login"
        replace={true}
        state={{ currentPath: location.pathname }}
      />
    );
  }

  return <Layout>{children}</Layout>;
};

export default RequireAuth;
