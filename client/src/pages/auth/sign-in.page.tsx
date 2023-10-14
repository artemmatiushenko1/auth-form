import { AuthForm } from './lib/components/components.js';
import heroImg from '@/assets/hero-img.png';

const SignInPage = () => {
  return (
    <div className="flex w-full flex-shrink-0 max-h-full h-full">
      <div className="flex-1 flex-shrink-0 bg-primary flex items-center justify-center">
        <div className="w-2/3">
          <img src={heroImg} alt="hero" />
        </div>
      </div>
      <div className="flex-1 flex-shrink-0 max-w-[500px] w-full pb-[40px] p-20 overflow-auto flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-7 self-start">Sign Up</h1>
        <AuthForm />
      </div>
    </div>
  );
};

export { SignInPage };
