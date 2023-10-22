import { User } from '@/lib/types';
import { createContext, useContext } from 'react';

type TUsersContext = {
  users: User[];
  getAllUsers: () => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  updateUser: (
    userId: number,
    payload: Partial<Omit<User, 'id'>>
  ) => Promise<void>;
};

export const UsersContext = createContext<TUsersContext>({} as TUsersContext);

export const useUsersContext = () => useContext(UsersContext);
