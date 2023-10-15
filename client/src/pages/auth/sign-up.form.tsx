import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.js';
import { Input } from '@/components/ui/input.js';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { AppRoute } from '@/lib/enums';
import { signUpSchema } from './lib/validation-schemas/validation-schemas.js';
import { ACCESS_TOKEN_KEY } from '@/lib/constants.js';
import { useAuthContext } from '@/context/auth/auth.context.js';

type FormValues = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const { getCurrentUser } = useAuthContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        return;
      }

      const { accessToken } = await response.json();
      getCurrentUser(accessToken);
      window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    } catch (err) {
      console.log({ err });
    }
  };

  const groupSelectOptions = ['ІП-01', 'ІП-02', 'ІП-03', 'ІП-04', 'ІП-05'].map(
    (group) => ({ value: group, label: group })
  );

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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password (min 8 characters)"
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
        <Button className="w-full" type="submit">
          Submit
        </Button>
        <div className="text-muted-foreground text-center">
          Already have an account?{' '}
          <Link className="text-primary" to={AppRoute.SignIn}>
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
};

export { SignUpForm };
