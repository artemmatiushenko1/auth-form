import { useState } from 'react';
import { UsersContext } from './users.context';
import { User } from '@/lib/types.js';
import { makeRequest } from '@/lib/utils';
import { HttpMethod } from '@/lib/enums';

type UsersContextProviderProps = {
  children: React.ReactNode;
};

const UsersContextProvider = ({ children }: UsersContextProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getAllUsers = async () => {
    const payload = await makeRequest<User[]>({
      pathname: '/users',
      method: HttpMethod.GET,
      hasAuth: true,
    });

    if (payload) {
      setUsers(payload);
    }
  };

  const deleteUser = async (userId: number) => {
    const hasDeleted = await makeRequest({
      pathname: `/users/${userId}`,
      hasAuth: true,
      method: HttpMethod.DELETE,
    });

    if (hasDeleted) {
      setUsers((prevUsers) => prevUsers.filter((item) => item.id !== userId));
    }
  };

  const updateUser = async (
    userId: number,
    payload: Partial<Omit<User, 'id'>>
  ) => {
    const updatedUser = await makeRequest<User>({
      pathname: `/users/${userId}`,
      hasAuth: true,
      method: HttpMethod.PATCH,
      body: JSON.stringify(payload),
    });

    if (updatedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((item) => (item.id === userId ? updatedUser : item))
      );

      return true;
    }

    return false;
  };

  return (
    <UsersContext.Provider
      value={{
        deleteUser,
        updateUser,
        getAllUsers,
        users,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContextProvider };
