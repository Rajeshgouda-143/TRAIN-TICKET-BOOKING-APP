import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
  const location = useLocation();
  const savedUser = sessionStorage.getItem("railgoCurrentUser");

  let isLoggedIn = false;

  try {
    const user = JSON.parse(savedUser || "null");
    isLoggedIn = Boolean(user?.email);
  } catch {
    sessionStorage.removeItem("railgoCurrentUser");
  }

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
}

export default RequireAuth;