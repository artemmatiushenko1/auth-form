import { signInSchema } from './lib/validation-schemas/validation-schemas.js';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppRoute } from '@/lib/enums.js';
import { Link } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.js';
import { Input } from '@/components/ui/input.js';
import { Button } from '@/components/ui/button.js';
import { useAuthContext } from '@/context/auth/auth.context.js';
import { ACCESS_TOKEN_KEY } from '@/lib/constants.js';

type FormValues = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const { getCurrentUser } = useAuthContext();
  const form = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });

      const { accessToken } = await response.json();
      getCurrentUser(accessToken);
      window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
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
        <Button className="w-full" type="submit">
          Submit
        </Button>
        <div className="text-gray-400 text-center">
          Don't have an account?{' '}
          <Link className="text-primary" to={AppRoute.SignUp}>
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
};

export { SignInForm };
