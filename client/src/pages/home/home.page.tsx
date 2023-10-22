import { UsersTable } from './libs/components/components.js';
import { UsersContextProvider } from '@/context/users/users.js';
import { ProfileCard } from './libs/components/profile-card/profile-card.js';
import { EditUserSheet } from './libs/components/edit-user-sheet/edit-user-sheet.js';

const HomePage = () => {
  return (
    <div className="w-full flex justify-center bg-background pt-6 space-x-6">
      <div className="relative">
        <ProfileCard />
      </div>
      <UsersContextProvider>
        <UsersTable />
        <EditUserSheet />
      </UsersContextProvider>
    </div>
  );
};

export { HomePage };
