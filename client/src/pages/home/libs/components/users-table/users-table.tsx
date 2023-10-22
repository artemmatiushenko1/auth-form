import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button.jsx';
import { PlusCircle } from 'lucide-react';
import { useEffect } from 'react';
import { columns } from './columns.jsx';
import { useUsersContext } from '@/context/users/users.js';

const UsersTable = () => {
  const { users, getAllUsers } = useUsersContext();

  const table = useReactTable({
    columns,
    data: users,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-col space-y-3">
      <Button className="space-x-2 self-end">
        <PlusCircle size={18} />
        <span>Create</span>
      </Button>
      <div className="space-y-4 max-h-[400px]">
        <div className="rounded-md border">
          <Table className="overflow-auto">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export { UsersTable };
