import { User, ValueOf } from '@/lib/types.js';
import { ColumnDef } from '@tanstack/react-table';
import { Hash, Users2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';
import { UsersTableRowActions } from './users-table-actions.jsx';
import { Role } from '@/lib/enums.js';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
    cell: ({ row }) => row.getValue('fullName'),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => row.getValue('email'),
  },
  {
    accessorKey: 'group',
    header: 'Group',
    cell: ({ row }) => (
      <Badge variant="secondary" className="space-x-2">
        <Users2 size={16} />
        <span>{row.getValue('group')}</span>
      </Badge>
    ),
  },
  {
    accessorKey: 'variant',
    header: 'Variant',
    cell: ({ row }) => (
      <Badge variant="secondary" className="space-x-2">
        <Hash size={16} />
        <span>{row.getValue('variant')}</span>
      </Badge>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue('role') as ValueOf<typeof Role>;

      const displayText = {
        [Role.Admin]: 'Admin',
        [Role.User]: 'User',
      }[role];

      return (
        <Badge variant={role === Role.Admin ? 'secondary' : 'outline'}>
          {displayText}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <UsersTableRowActions row={row} />,
  },
];
