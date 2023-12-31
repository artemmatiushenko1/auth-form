import { signInSchema } from './lib/validation-schemas/validation-schemas.js';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppRoute, HttpMethod } from '@/lib/enums.js';
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
import { makeRequest } from '@/lib/utils.js';
import { setAccessToken } from '@/context/auth/token.js';

type FormValues = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const { getCurrentUser } = useAuthContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
  });

  const handleSubmit = async (values: FormValues) => {
    const payload = await makeRequest<{ accessToken: string }>({
      pathname: '/auth/sign-in',
      method: HttpMethod.POST,
      body: JSON.stringify(values),
    });

    if (!payload) return;

    const { accessToken } = payload;
    getCurrentUser(accessToken);
    setAccessToken(accessToken);
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
        <div className="text-muted-foreground text-center">
          Don't have an account?{' '}
          <Link className="text-primary" to={AppRoute.SignUp}>
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export { SignInForm };
