import { useEffect, useState } from 'react';
import { AuthContext } from './auth.context';
import { useNavigate } from 'react-router-dom';
import { AppRoute, DataStatus } from '@/lib/enums';
import { User, ValueOf } from '@/lib/types';
import { ACCESS_TOKEN_KEY } from '@/lib/constants';
import { setAccessToken } from './token';

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [hasUnauthorizedError, setHasUnauthorizedError] = useState(false);
  const [getUserStatus, setGetUserStatus] = useState<
    ValueOf<typeof DataStatus>
  >(DataStatus.IDLE);

  const getCurrentUser = async (token: string) => {
    try {
      setGetUserStatus(DataStatus.PENDING);
      const res = await fetch(`/api/auth/current-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        setHasUnauthorizedError(true);
        return;
      }

      const data: { payload: User } = await res.json();
      setUser(data.payload);
      setGetUserStatus(DataStatus.FULLFILED);
    } catch (err) {
      setGetUserStatus(DataStatus.REJECTED);
      navigate(AppRoute.Home);
      setAccessToken(null);
    }
  };

  const signOut = () => {
    setUser(null);
    setAccessToken(null);
  };

  useEffect(() => {
    const storageToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);

    if (storageToken) {
      setAccessToken(storageToken);
      getCurrentUser(storageToken);
    }
  }, []);

  useEffect(() => {
    if (hasUnauthorizedError) {
      navigate(AppRoute.SignIn);
      setAccessToken(null);
    }
  }, [hasUnauthorizedError, navigate]);

  const hasAuth =
    Boolean(user) || Boolean(window.localStorage.getItem(ACCESS_TOKEN_KEY));

  return (
    <AuthContext.Provider
      value={{
        setHasUnauthorizedError,
        user,
        setUser,
        hasAuth,
        signOut,
        getCurrentUser,
        getUserStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
