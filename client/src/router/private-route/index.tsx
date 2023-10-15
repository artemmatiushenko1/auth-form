import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '@/lib/enums';
import { useAuthContext } from '@/context/auth/auth.js';

const PrivateRoute = () => {
  const { hasAuth } = useAuthContext();

  const location = useLocation();

  return hasAuth ? (
    <Outlet />
  ) : (
    <Navigate to={AppRoute.SignIn} state={{ from: location }} replace />
  );
};

export { PrivateRoute };
