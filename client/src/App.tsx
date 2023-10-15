import { useAuthContext } from './context/auth/auth.context.js';
import { DataStatus } from './lib/enums.js';
import Router from './router/router.jsx';

const App = () => {
  const { hasAuth, getUserStatus, user } = useAuthContext();

  if (hasAuth && !user && getUserStatus !== DataStatus.FULLFILED) {
    return (
      <div className="w-full flex items-center justify-center h-screen min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen h-screen flex">
      <Router />
    </div>
  );
};

export default App;
