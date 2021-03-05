import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as Types from './types';

const API: AxiosInstance = axios.create({
  baseURL: 'http://api.github.com',
  timeout: 2000,
});

API.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response)
);

export default class GithubAPI {
  static async getUser(name: string): Promise<Types.ExtendedUser> {
    const username: string = encodeURIComponent(name);
    const response: AxiosResponse<Types.ExtendedUser> = await API.get(
      `/users/${username}`
    );
    return response.data;
  }

  static async findUser(
    params: Types.FindItemFullParams
  ): Promise<Types.FindItemResponse> {
    params.q = encodeURIComponent(params.q);

    const searchResponse: AxiosResponse<Types.FindItemResponse> = await API.get(
      `/search/users`,
      { params: { ...params, per_page: params.perPage } }
    );

    return searchResponse.data;
  }

  static async getRepository(
    owner: string,
    name: string
  ): Promise<Types.ExtendedRepository> {
    owner = encodeURIComponent(owner);
    name = encodeURIComponent(name);

    const response: AxiosResponse<Types.ExtendedRepository> = await API.get(
      `/repos/${owner}/${name}`
    );

    return response.data;
  }

  static async findRepository(
    params: Types.FindItemFullParams
  ): Promise<Types.FindItemResponse> {
    params.q = encodeURIComponent(params.q);

    const searchReponse: AxiosResponse<Types.FindItemResponse> = await API.get(
      '/search/repositories',
      { params }
    );

    return searchReponse.data;
  }

  static async getUserRepositories(
    username: string,
    params: Types.FindItemParams
  ): Promise<Types.Repository[]> {
    username = encodeURIComponent(username);

    const response: AxiosResponse<Types.Repository[]> = await API.get(
      `/users/${username}/repos`,
      {
        params: {
          ...params,
          per_page: params.perPage,
          direction: params.order,
        },
      }
    );

    return response.data;
  }

  static async getRepositoryContributors(
    owner: string,
    repository: string,
    params: Types.FindItemParams
  ): Promise<Types.User[]> {
    owner = encodeURIComponent(owner);
    repository = encodeURIComponent(repository);

    const response: AxiosResponse<Types.User[]> = await API.get(
      `/repos/${owner}/${repository}/contributors`,
      { params: { ...params, per_page: params.perPage } }
    );

    return response.data;
  }

  static async getUserStarredProjects(
    username: string
  ): Promise<Types.Repository[]> {
    username = encodeURIComponent(username);

    const response: AxiosResponse<Types.Repository[]> = await API.get(
      `/users/${username}/starred`
    );

    return response.data;
  }

  static async getUserFollowers(
    username: string,
    params: Types.FindItemParams
  ): Promise<Types.User[]> {
    username = encodeURIComponent(username);

    const response: AxiosResponse<Types.User[]> = await API.get(
      `/users/${username}/followers`,
      { params: { ...params, per_page: params.perPage } }
    );

    return response.data;
  }

  static async getFollowedByUser(
    username: string,
    params: Types.FindItemParams
  ): Promise<Types.User[]> {
    username = encodeURIComponent(username);

    const response: AxiosResponse<Types.User[]> = await API.get(
      `/users/${username}/following`,
      { params: { ...params, per_page: params.perPage } }
    );

    return response.data;
  }

  static async getRepositoryCommits(
    username: string,
    repository: string,
    params: Types.FindItemParams
  ): Promise<Types.Commit[]> {
    username = encodeURIComponent(username);
    repository = encodeURIComponent(repository);

    const response: AxiosResponse<Types.Commit[]> = await API.get(
      `/repos/${username}/${repository}/commits`,
      { params: { ...params, per_page: params.perPage } }
    );

    return response.data;
  }

  static async getRateLimit(): Promise<Types.RateLimitResponse> {
    const response: AxiosResponse<Types.RateLimitResponse> = await API.get(
      '/rate_limit'
    );

    return response.data;
  }
}
