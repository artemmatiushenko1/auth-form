import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { editUserSchema } from '../../validation-schemas/validation-schemas.js';
import { z } from 'zod';
import { useUsersContext } from '@/context/users/users.context.js';
import { Button } from '@/components/ui/button.js';
import { SheetClose, SheetFooter } from '@/components/ui/sheet.js';
import { Role } from '@/lib/enums.js';

type FormValues = z.infer<typeof editUserSchema>;

const EditUserForm = () => {
  const { selectedUser, updateUser, setSelectedUser } = useUsersContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: selectedUser ?? {},
  });

  const handleSubmit = async (values: FormValues) => {
    if (!selectedUser) return;

    const hasUpdated = await updateUser(selectedUser?.id, values);

    if (hasUpdated) {
      setSelectedUser(null);
    }
  };

  const groupSelectOptions = ['ІП-01', 'ІП-02', 'ІП-03', 'ІП-04', 'ІП-05'].map(
    (group) => ({ value: group, label: group })
  );

  const roleSelectOptions = [
    { value: Role.Admin.toString(), label: 'Admin' },
    { value: Role.User.toString(), label: 'User' },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 w-full"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email (e.g. example@email.com)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="variant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter your variant"
                  {...{
                    ...field,
                    onChange: (e) => {
                      return field.onChange(e.target.valueAsNumber);
                    },
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your study group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {groupSelectOptions.map((option) => (
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roleSelectOptions.map((option) => (
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-3">
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="secondary">Close</Button>
            </SheetClose>
            <Button type="submit">Save changes</Button>
          </SheetFooter>
        </div>
      </form>
    </Form>
  );
};

export { EditUserForm };
