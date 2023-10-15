import { useEffect, useState } from 'react';
import { AuthContext } from './auth.context';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/lib/enums';
import { User } from '@/lib/types';

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const ACCESS_TOKEN_KEY = 'accessToken';

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [hasUnauthorizedError, setSetUnauthorizedError] = useState(false);

  const getCurrentUser = async (token: string) => {
    try {
      const res = await fetch(`/api/auth/current-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        setSetUnauthorizedError(true);
      }

      const data: User = await res.json();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const signOut = () => {
    setUser(null);
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  };

  useEffect(() => {
    const storageToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);

    if (storageToken) {
      getCurrentUser(storageToken);
    }
  }, []);

  useEffect(() => {
    if (hasUnauthorizedError) {
      navigate(AppRoute.SignIn);
      window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  }, [hasUnauthorizedError, navigate]);

  const hasAuth = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        setSetUnauthorizedError,
        user,
        setUser,
        hasAuth,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
