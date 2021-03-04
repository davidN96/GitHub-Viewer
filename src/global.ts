export enum SearchMode {
  user = 'user',
  repo = 'repository',
}

export interface SearchFilters {
  perPage: number;
  sort: string;
  order: string;
}

export interface SearchFiltersWithOptions extends SearchFilters {
  sortOptions: string[];
  perPageOptions: number[];
  results: number;
  page: number;
  maxPage: number;
}

export interface AppError {
  isActive: boolean;
  title: string;
  message: string;
  redirection: string | null;
}
