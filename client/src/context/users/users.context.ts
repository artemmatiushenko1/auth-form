import { User } from '@/lib/types.js';
import { Dispatch, SetStateAction, createContext, useContext } from 'react';

type TUsersContext = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
  getAllUsers: () => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  updateUser: (
    userId: number,
    payload: Partial<Omit<User, 'id'>>
  ) => Promise<boolean>;
};

export const UsersContext = createContext<TUsersContext>({} as TUsersContext);

export const useUsersContext = () => useContext(UsersContext);
