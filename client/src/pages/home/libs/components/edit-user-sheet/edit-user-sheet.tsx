import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useUsersContext } from '@/context/users/users.context';
import { EditUserForm } from '../edit-user-form/edit-user-form';

const EditUserSheet = () => {
  const { selectedUser, setSelectedUser } = useUsersContext();

  const handleClose = (open: boolean) => {
    if (!open) {
      setSelectedUser(null);
    }
  };

  return (
    <Sheet open={Boolean(selectedUser)} onOpenChange={handleClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit user</SheetTitle>
          <SheetDescription>
            Make changes to the selected user here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <EditUserForm />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { EditUserSheet };
