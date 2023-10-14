import { AuthForm } from './lib/components/components.js';

const SignInPage = () => {
  return (
    <div className="flex w-full flex-shrink-0 max-h-full h-full">
      <div className="flex-1 flex-shrink-0 bg-primary">&nbsp;</div>
      <div className="flex-1 flex-shrink-0 max-w-[500px] w-full pb-[40px] p-20 overflow-auto">
        <h1 className="text-3xl font-bold mb-7">Sign Up</h1>
        <AuthForm />
      </div>
    </div>
  );
};

export { SignInPage };
