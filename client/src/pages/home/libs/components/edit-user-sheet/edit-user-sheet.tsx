import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useUsersContext } from '@/context/users/users.context';

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
        <div className="grid gap-4 py-4"></div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export { EditUserSheet };
