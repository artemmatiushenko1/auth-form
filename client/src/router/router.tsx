import { Routes, Route, Navigate } from 'react-router-dom';
import { AppRoute } from '@/lib/enums';
import { HomePage } from '@/pages/home/home.page';
import { AuthPage } from '@/pages/auth/auth.page';
import { PrivateRoute } from './private-route';
import { PublicRoute } from './public-route';

const Router = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path={AppRoute.Home} element={<HomePage />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route
          path={AppRoute.SignIn}
          element={<AuthPage key={AppRoute.SignIn} />}
        />
        <Route
          path={AppRoute.SignUp}
          element={<AuthPage key={AppRoute.SignUp} />}
        />
      </Route>
      <Route path="*" element={<Navigate to={AppRoute.Home} />} />
    </Routes>
  );
};

export default Router;
