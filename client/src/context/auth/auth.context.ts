import { DataStatus } from '@/lib/enums';
import { User, ValueOf } from '@/lib/types';
import { Dispatch, createContext, useContext } from 'react';

type TAuthContext = {
  hasAuth: boolean;
  user: User | null;
  setUser: Dispatch<User>;
  setSetUnauthorizedError: Dispatch<boolean>;
  signOut: () => void;
  getCurrentUser: (token: string) => Promise<void>;
  getUserStatus: ValueOf<typeof DataStatus>;
};

export const AuthContext = createContext<TAuthContext>({
  hasAuth: false,
  user: null,
  setUser: () => {},
  setSetUnauthorizedError: () => {},
  signOut: () => {},
  getCurrentUser: () => Promise.resolve(),
  getUserStatus: DataStatus.IDLE,
});

export const useAuthContext = () => useContext(AuthContext);
