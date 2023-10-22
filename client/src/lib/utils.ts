import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ValueOf } from './types';
import { HttpMethod } from './enums';
import { accessToken } from '@/context/auth/token';
import { toast } from 'react-toastify';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type RequestErrorPayload = {
  message: string;
  error: string;
  statusCode: number;
};

type RequestSuccessPayload<T> = { payload: T };

export const makeRequest = async <T>({
  pathname,
  hasAuth,
  body,
  method,
}: {
  pathname: string;
  hasAuth?: boolean;
  body?: BodyInit | null;
  method: ValueOf<typeof HttpMethod>;
}) => {
  let headers: Record<string, string> = {};

  if (hasAuth) {
    headers = Object.assign(headers, {
      Authorization: `Bearer ${accessToken}`,
    });
  }

  if (
    (
      [HttpMethod.POST, HttpMethod.PATCH] as ValueOf<typeof HttpMethod>[]
    ).includes(method)
  ) {
    headers = Object.assign(headers, { 'Content-Type': 'application/json' });
  }

  try {
    const response = await fetch(`/api/${pathname}`, {
      method,
      body,
      headers,
    });

    const data = (await response.json()) as
      | RequestErrorPayload
      | RequestSuccessPayload<T>;

    if ('error' in data) {
      toast.error(data.message);
      return;
    }

    return data.payload;
  } catch (err) {
    toast.error('Something went wrong');
    return null;
  }
};
