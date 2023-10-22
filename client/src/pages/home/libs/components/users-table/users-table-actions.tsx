import { Row } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button.jsx';
import { MoreVertical } from 'lucide-react';
import { User } from '@/lib/types.js';
import { useUsersContext } from '@/context/users/users.js';

interface UsersTableRowActionsProps {
  row: Row<User>;
}

export const UsersTableRowActions = ({ row }: UsersTableRowActionsProps) => {
  const { deleteUser } = useUsersContext();
  const user = row.original;

  const handleEdit = () => {};

  const handleDelete = async () => {
    deleteUser(user.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
