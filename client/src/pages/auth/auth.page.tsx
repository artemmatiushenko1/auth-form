import { AppRoute } from '@/lib/enums.js';
import { useLocation } from 'react-router-dom';
import { SignInForm } from './sign-in-form.jsx';
import { SignUpForm } from './sign-up.form.jsx';
import heroImg from '@/assets/hero-img.png';

const AuthPage = () => {
  const { pathname } = useLocation();

  const getForm = () => {
    if (pathname === AppRoute.SignIn) {
      return <SignInForm />;
    }

    return <SignUpForm />;
  };

  return (
    <div className="flex w-full flex-shrink-0 max-h-full h-full">
      <div className="flex-1 flex-shrink-0 bg-primary flex items-center justify-center">
        <div className="w-2/3">
          <img src={heroImg} alt="hero" />
        </div>
      </div>
      <div className="flex-1 flex-shrink-0 max-w-[500px] w-full p-20 pb-[40px] pt-30  overflow-auto flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-7 self-start">Sign Up</h1>
        {getForm()}
      </div>
    </div>
  );
};
export { AuthPage };
