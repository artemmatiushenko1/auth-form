import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppRoute } from './lib/enums';
import { HomePage } from './pages/home/home.page';
import { SignInPage } from './pages/auth/sign-in.page';
import { SignUpPage } from './pages/auth/sign-up.page';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={AppRoute.Home} element={<HomePage />} />
        <Route path={AppRoute.SignIn} element={<SignInPage />} />
        <Route path={AppRoute.SignUp} element={<SignUpPage />} />
        <Route path="*" element={<Navigate to={AppRoute.Home} />} />
      </Routes>
    </div>
  );
};

export default App;
