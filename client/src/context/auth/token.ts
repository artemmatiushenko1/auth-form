import { ACCESS_TOKEN_KEY } from '@/lib/constants';

let accessToken: string | null = null;

const setAccessToken = (token: string | null) => {
  accessToken = token;

  if (token) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};

export { setAccessToken, accessToken };
