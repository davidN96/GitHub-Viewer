import * as APITypes from '@/controllers/api/types';

export enum SearchMode {
  user = 'user',
  repo = 'repository',
}

export interface SearchResults {
  results: Array<APITypes.User | APITypes.Repository>;
  resultsCount: number;
  isFetching: boolean;
}

export interface SearchPageControl {
  page: number;
  maxPage: number;
}

export interface SearchFilters {
  perPage: number;
}

export interface ExtendedSearchFilters extends SearchFilters {
  sort: string | null;
  order: string | null;
}

export interface SearchFilterControl {
  perPageOptions: number[];
}

export interface ExtendedSearchFilterControl extends SearchFilterControl {
  sortOptions: string[];
  orderOptions: string[];
}

export interface AppError {
  isActive: boolean;
  title: string;
  message: string;
  redirection?: string;
}

export const perPageOptions: number[] = [10, 20, 30, 40, 50];

export const userSortOptions: string[] = [
  APITypes.UserSortQuery.followers,
  APITypes.UserSortQuery.joined,
  APITypes.UserSortQuery.repositories,
];

export const repoSortOptions: string[] = [
  APITypes.RepositorySortQuery.forks,
  APITypes.RepositorySortQuery.stars,
  APITypes.RepositorySortQuery.updated,
];

export const userRepoSortOptions: string[] = [
  APITypes.UserRepoSortQuery.updated,
  APITypes.UserRepoSortQuery.pushed,
  APITypes.UserRepoSortQuery.full_name,
  APITypes.UserRepoSortQuery.created,
];

export const orderOptions: string[] = [APITypes.Order.asc, APITypes.Order.desc];

export const defaultUserRequestParams: APITypes.FindItemParams = {
  page: 1,
  perPage: perPageOptions[0],
};

export const defaultRepoRequestParams: APITypes.FindItemParams = {
  page: 1,
  perPage: perPageOptions[0],
  sort: userRepoSortOptions[0],
  order: orderOptions[0],
};
