import { AppError } from '@/global';

export const NotFound = (name: string): AppError => ({
  title: 'Sorry',
  message: `${name} not found`,
  redirection: '/',
  isActive: true,
});

export const LimitExceeded = (): AppError => ({
  title: 'Sorry',
  message: `API requests limit exceeded`,
  redirection: '/',
  isActive: true,
});

export const UnexpectedError = (): AppError => ({
  title: 'Sorry',
  message: `Unexpected error ocurred`,
  redirection: '/',
  isActive: true,
});
