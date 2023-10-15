import { Role } from './enums';

type User = {
  id: number;
  fullName: string;
  password: string;
  email: string;
  group: string;
  variant: number;
  role: typeof Role;
};

type ValueOf<T> = T[keyof T];

export { type User, type ValueOf };
