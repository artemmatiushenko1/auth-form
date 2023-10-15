import { User } from '@/lib/types';
import { Dispatch, createContext, useContext } from 'react';

type TAuthContext = {
  hasAuth: boolean;
  user: User | null;
  setUser: Dispatch<User>;
  setSetUnauthorizedError: Dispatch<boolean>;
  signOut: () => void;
};

export const AuthContext = createContext<TAuthContext>({
  hasAuth: false,
  user: null,
  setUser: () => {},
  setSetUnauthorizedError: () => {},
  signOut: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
