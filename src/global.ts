export enum SearchMode {
  user = 'user',
  repo = 'repository',
}

export interface SearchFilters {
  perPage: number;
  sort: string;
  order: string;
}
