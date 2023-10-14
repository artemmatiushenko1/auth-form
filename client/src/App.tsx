import { Routes, Route, Navigate } from 'react-router-dom';
import { AppRoute } from './lib/enums';
import { HomePage } from './pages/home/home.page.jsx';
import { AuthPage } from './pages/auth/auth.page.jsx';

const App = () => {
  return (
    <div className="w-full min-h-screen h-screen flex">
      <Routes>
        <Route path={AppRoute.Home} element={<HomePage />} />
        <Route
          path={AppRoute.SignIn}
          element={<AuthPage key={AppRoute.SignIn} />}
        />
        <Route
          path={AppRoute.SignUp}
          element={<AuthPage key={AppRoute.SignUp} />}
        />
        <Route path="*" element={<Navigate to={AppRoute.Home} />} />
      </Routes>
    </div>
  );
};

export default App;
