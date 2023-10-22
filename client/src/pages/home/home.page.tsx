import { UsersTable } from './libs/components/components.js';
import { UsersContextProvider } from '@/context/users/users.js';
import { ProfileCard } from './libs/components/profile-card/profile-card.js';

const HomePage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-background flex-col">
      <ProfileCard />
      <UsersContextProvider>
        <UsersTable />
      </UsersContextProvider>
    </div>
  );
};

export { HomePage };
