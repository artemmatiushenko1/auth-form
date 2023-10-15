import { useAuthContext } from '@/context/auth/auth.js';
import { AppRoute } from '@/lib/enums';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoute = () => {
  const { hasAuth } = useAuthContext();
  const location = useLocation();

  const from = location.state?.from?.pathname || AppRoute.Home;

  return hasAuth ? <Navigate to={from} replace /> : <Outlet />;
};

export { PublicRoute };
