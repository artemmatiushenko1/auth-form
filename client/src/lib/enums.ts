const AppRoute = {
  Home: '/',
  SignIn: '/auth/sign-in',
  SignUp: '/auth/sign-up',
} as const;

const Role = {
  User: 1,
  Admin: 2,
} as const;

const DataStatus = {
  IDLE: 1,
  PENDING: 2,
  FULLFILED: 3,
  REJECTED: 4,
} as const;

export { AppRoute, Role, DataStatus };
