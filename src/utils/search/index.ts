export const countPages = (results: number, perPage: number): number =>
  Math.ceil(results / perPage);

export const countResults = (results: number, max: number): number =>
  results >= max ? max : results;
