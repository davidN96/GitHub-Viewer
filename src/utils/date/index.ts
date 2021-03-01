export const convertTimeStampToDateTime = (timestamp: number): Date =>
  new Date(timestamp * 1000);

export const getDay = (date: Date): string =>
  date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

export const getMonth = (date: Date): string =>
  date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;

export const getYear = (date: Date): string => `${date.getFullYear()}`;

export const getHour = (date: Date): string =>
  date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;

export const getMinutes = (date: Date): string =>
  date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;

export const unifyDate = (date: Date): string =>
  `${getDay(date)}-${getMonth(date)}-${getYear(date)}`;

export const unifyTime = (date: Date): string =>
  `${getHour(date)}:${getMinutes(date)}`;
