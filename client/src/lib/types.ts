import { Role } from './enums';

type User = {
  id: number;
  fullName: string;
  email: string;
  group: string;
  variant: number;
  role: ValueOf<typeof Role>;
};

type ValueOf<T> = T[keyof T];

export { type User, type ValueOf };
