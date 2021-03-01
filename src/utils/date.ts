export const convertTimeStampToDateTime = (timestamp: number): Date =>
  new Date(timestamp * 1000);
